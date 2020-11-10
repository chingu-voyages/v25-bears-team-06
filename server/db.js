const Pool = require('pg').Pool;
require('dotenv').config();

//connection information for the elephansql db
const devConfig = {
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	database: process.env.PG_DATABASE,
};

//connection information for the heroku db
const proConfig = {
	//generated by the heroku add on
	connectionString: process.env.DATABASE_URL,
};

//connection to the database
const pool = new Pool(
	process.env.Node_ENV === 'production' ? proConfig : devConfig
);

module.exports = pool;
