const { Events } = require('discord.js');
const logger = require('../utils/logger');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		logger.info(`Ready! Logged in as ${client.user.tag}`);
		client.user.setPresence({
			status: 'idle',
			activities: [{ name: 'be a good boy or else tung tung will come to ur door', type: 0 }]
		});
	},
};
