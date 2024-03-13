// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use database::establish_connection;
use serde::Serialize;
use sqlx::FromRow;
use state::DbPoolWrapper;
use tauri::State;
use tokio::runtime::Runtime;
use chrono::{DateTime, Utc};

mod database;
mod state;

#[tauri::command]
async fn create_client(state: State<'_, DbPoolWrapper>, company_name: String) -> Result<bool, String> {
    sqlx::query("INSERT INTO company (company_name) VALUES (?)")
        .bind(company_name)
        .execute(&state.pool)
        .await
        .unwrap();

    Ok(true)
}

#[derive(Clone, FromRow, Debug, Serialize)]
struct Company {
    id: u32,
    company_name: String,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
}

#[tauri::command]
async fn list_client(state: State<'_, DbPoolWrapper>) -> Result<Vec<Company>, String> {
    let company_list = sqlx::query_as::<_, Company>("SELECT * FROM company")
        .fetch_all(&state.pool)
        .await
        .unwrap();

    Ok(company_list)
}

fn main() {
    let pool = Runtime::new().unwrap().block_on(establish_connection());

    tauri::Builder::default()
        .manage(DbPoolWrapper { pool })
        .invoke_handler(tauri::generate_handler![
            create_client,
            list_client,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
