module.exports = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	server: process.env.DB_SERVER,
	port: +process.env.DB_PORT,
	options: {
		enableArithAbort: true,
		trustServerCertificate: true,
	},
	api: {
		externalResolver: true,
	},
};
