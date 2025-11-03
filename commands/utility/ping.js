module.exports = {
    data: {
        name: 'ping',
        description: 'Checks the bot\'s latency.',
        aliases: ['latency'],
        cooldown: 5,
    },
    async execute(message, args) {
        const sent = await message.reply('Pinging...');
        const latency = sent.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(message.client.ws.ping);
        sent.edit(`Pong! Latency is ${latency}ms. API Latency is ${apiLatency}ms.`);
    },
};
