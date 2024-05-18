import pkg from 'pg';
const { Pool } = pkg;

export default new Pool({
	host: 'localhost',
	port: 5432,
	database: 'itdo_site',
	user: 'itdo',
	password: 'goo3fe2s',
});
