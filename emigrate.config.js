import { createPostgresStorage } from '@emigrate/postgres';
import dotenv from 'dotenv';
dotenv.config()

export default {
    directory: 'migrations',
    storage: createPostgresStorage({
        table: 'migrations',
        connection: {
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_HOST,
            database: process.env.DB_NAME
        },
    }),
};
