const ApiGateway = require("moleculer-web");
let IO = require("socket.io");
const DbMixin = require("../mixins/db.mixin");

module.exports = {
	name: "chat",
	mixins: [ApiGateway],
	actions: {
		add(ctx) {
			return Number(ctx.params.a) + Number(ctx.params.b);
		},
		async newMessage(ctx) {
			if (this.io) {


			}
			// return true;
		},
		async accept(ctx) {
			if (this.io) {
			}
			// return true;
		},
	},
	settings: {
		port: process.env.SOCKETPORT || 3003,
	},

	events: {
		"**"(payload, sender, event) {
			if (this.io)
				this.io.emit("event", {
					sender,
					event,
					payload
				});
		}
	},

	started() {
		// Create a Socket.IO instance, passing it our server
		this.io = IO(this.server);

		// Add a connect listener
		this.io.on("connection", client => {
			this.logger.info("Client connected via websocket!");
			this.client = client;

		});

	}
};
