const {MoleculerClientError} = require("moleculer").Errors;
// const mongoose = require("mongoose");

const DbService = require("../mixins/db.mixin");
const bcrypt = require("bcrypt");
const { encrypt, decrypt} = require("../utils/common")

console.log(DbService);
module.exports = {
	name: "users",
	mixins: [
		DbService("users"),
	],
	settings: {
		/** Secret for JWT */
		JWT_SECRET: process.env.JWT_SECRET || "jwt-secret",
		BASE_URL: process.env.BASE_URL || "http://localhost:3000",

		fields: [
			"_id",
			"email",
			"password",
			"full_name",
			"status",
			"user_type",
		],

		entityValidator: {
			email: {type: "email"},
			email_verified: {type: "boolean", default: false, optional: true},
			password: {type: "string"},
			full_name: {type: "string", optional: true},
		}
	},

	hooks: {
		after: {
			create : [
				async(ctx, res) => {
                    console.log(res);
					return {
						data : res,
						message : "OK",
						code : 200
					};
				}
			],
		}
	},

	/**
	 * Actions
	 */
	actions: {
		/**
		 * Register a new User
		 *
		 * @actions
		 * @param {Object} user - User entity
		 *
		 * @returns {Object} Created entity & token
		 */
		signup : {
			rest: "POST /signup",
			params: {
				email: {type: "email"},
				full_name: {type: "string"},
				password: {type: "string"},
			},
			async handler(ctx) {
				console.log("Input", ctx.params);
				let email = ctx.params.email;
				let full_name = ctx.params.full_name;
				let password = ctx.params.password;

				if (email) {
					const found = await this.adapter.findOne({
						email
					});
					if (found) {
						throw new MoleculerClientError("User with this email id already exists.", 409, "LOGICAL_ERROR", [{
							field: "email",
							message: "Tutor with this email id already exists."
						}]);
					}
				}

				const doc = await this.adapter.insert({
					email,
					full_name,
					password: bcrypt.hashSync(password, 10),
					user_type: 2, //TODO : Use Constants
					created_at: Date.now(),
				});

				// Generate Encryption Key
				const encryptedKey = encrypt(doc._id.toString());
				const response = {
					data: {},
					message: "OK",
					code: 200
				};
				return this.entityChanged(
					"created",
					response,
					ctx
				).then(() => response);
			},
		},

		login : {
			rest: "POST /login",
			params: {
				email: {type: "email"},
				password: {type: "string"},
			},
			async handler(ctx) {
				let email = ctx.params.email;
				let password = ctx.params.password;

				let user = await this.adapter.findOne({
					email,
				});
				if(user) {
					if (!(await bcrypt.compare(password, user.password))) {
						throw new MoleculerClientError("Password is incorrect.", 422, "LOGICAL_ERROR", [{
							field: "password",
							message: "Password is incorrect."
						}]);
					}
				} else {
					throw new MoleculerClientError("User not found.", 404, "LOGICAL_ERROR", [{
						field: "email",
						message: "User not found."
					}]);
				}
				const response = {
					data: user,
					message: "Welcome back!",
					code: 200
				};
				return this.entityChanged(
					"created",
					response,
					ctx
				).then(() => response);
			},
		}
	},

	/**
	 * Methods
	 */
	methods: {
	}
};
