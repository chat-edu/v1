import { Pool } from 'pg';

let pool: Pool;

export const getPool = () => {
    if (!pool) {
        pool = new Pool({
            max: 300,
            connectionTimeoutMillis: 5000,
            host: process.env.COSMOS_POSTGRES_HOST as string,
            port: 5432,
            user: 'citus',
            password: process.env.COSMOS_POSTGRES_PASSWORD as string,
            database: 'citus',
            ssl: true,
        });
    }
    return pool;
}
