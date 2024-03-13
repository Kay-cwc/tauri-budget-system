use sqlx::SqlitePool;

pub struct DbPoolWrapper {
    pub pool: SqlitePool,
}