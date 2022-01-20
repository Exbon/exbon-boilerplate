import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sha256 } from 'js-sha256';

const mssql = require('mssql');
const sqlConfig = require('../../../lib/sqlConfig');

export default NextAuth({
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				console.log(process.env.SECRET_KEY);
				const { username, password } = credentials;
				const hashedPassword = '0x' + sha256(password).toUpperCase();
				const client = await mssql.connect(sqlConfig);
				const request = new mssql.Request();
				const result = await request.query(`EXEC [Hammer].[dbo].[Dashboard_Signin] "${username}", ${hashedPassword}`);

				if (result.recordset.length > 0) {
					const query2 = `SELECT UserName, Exbon FROM Exbon.dbo.[User] WHERE EmployeeID = '${result.recordset[0].EmployeeID}'`;
					const result2 = await request.query(query2);
					const user = {
						EmployeeID: result.recordset[0].EmployeeID,
						FullName: result.recordset[0].FullName,
						Role: result2.recordset[0].Exbon == 1 ? 'admin' : 'user',
						UserName: result2.recordset[0].UserName,
					};
					client.close();
					return user;
				} else {
					client.close();
					throw new Error('Could not log you in!');
				}
			},
		}),
	],
	callbacks: {
		// called after sucessful signin
		jwt: async ({ token, user }) => {
			user && (token.user = user);
			return token;
		}, // called whenever session is checked
		session: async ({ session, token }) => {
			session.user = token.user;
			return session;
		},
	},
	secret: process.env.SECRET_KEY,
	session: {
		strategy: 'jwt',
		maxAge: 1 * 24 * 60 * 60, // 1d
	},
	jwt: {
		secret: process.env.SECRET_KEY,
		encryption: true,
	},
	pages: {
		signIn: 'auth/sigin',
	},
});
