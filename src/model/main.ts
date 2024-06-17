import pkg from 'pg';
const { Pool } = pkg;

export default new Pool({
	host: process.env.DB_HOST,
	port: 5432,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});
