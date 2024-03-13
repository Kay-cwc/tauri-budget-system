use dotenv::dotenv;
use std::{path, env, fs::create_dir};
use sqlx::{sqlite::SqlitePoolOptions, SqlitePool, migrate::{MigrateDatabase, MigrateError}, Sqlite};

fn get_db_url() -> String {
    dotenv().ok();
    let env = env::var("DATABASE_URL");

    match env {
        Ok(env) => {
            println!("using env");
            env
        },
        Err(_) => {
            let base_path = path::Path::new(&tauri::api::path::home_dir().unwrap())
                .join(".budget-system");

            // check if base dir exist
            if !base_path.exists() {
                create_dir(base_path.clone()).unwrap();
            }

            let database_url = base_path
                .join("budget-system.db")
                .to_str()
                .unwrap()
                .to_string();
            println!("using {}", database_url);

            database_url
        }
    }
}

async fn create_db_if_not_exists()  {
    let database_url = get_db_url();
    if !Sqlite::database_exists(&database_url).await.unwrap_or(false) {
        match Sqlite::create_database(&database_url).await {
            Ok(_) => println!("database initialised"),
            Err(error) => panic!("error: {}", error),
        }
    } else {
        println!("database exists");
    }
}

async fn run_migrations(pool: &SqlitePool) -> Result<(), MigrateError> {
    println!("running database migrations");
    sqlx::migrate!()
        .run(pool)
        .await
}

pub async fn establish_connection() -> SqlitePool {
    create_db_if_not_exists().await;

    let pool = SqlitePoolOptions::new()
        .max_connections(10)
        .connect(&get_db_url())
        .await
        .expect("Unable to connect to Sqlite");

    run_migrations(&pool).await.unwrap();

    pool
}
