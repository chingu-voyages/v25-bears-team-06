const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	password: 'Wuperson1!',
	host: 'localhost',
	port: 5432,
	database: 'bookshare',
});

module.exports = pool;
