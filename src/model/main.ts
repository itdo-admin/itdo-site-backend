import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	host: process.env.DB_APP,
	port: 5432,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
});

const argDoc = process.argv[2];

argDoc !== 'docs' &&
	pool.connect()
		.catch(e => {
			console.error(e.message);
			process.exit(1);
		})

export default pool;
