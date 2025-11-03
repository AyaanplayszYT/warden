const { EmbedBuilder } = require('discord.js');
const colors = require('../../config/colors.json');
const logger = require('../../utils/logger');

module.exports = {
    data: {
        name: 'joke',
        description: 'Tells a random joke.',
        aliases: [],
        cooldown: 5,
        options: [],
    },
    async execute(context, args) {
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const jokeData = await response.json();
                const jokeEmbed = new EmbedBuilder()
                    .setColor(colors.info || '#5865F2')
                    .setTitle('😂 Joke')
                    .addFields(
                        { name: 'Setup', value: jokeData.setup },
                        { name: 'Punchline', value: jokeData.punchline }
                    )
                    .setFooter({ text: 'Powered by Warden' })
                    .setTimestamp();
            if (context.channel?.send) {
                await context.channel.send({ embeds: [jokeEmbed] });
            } else if (context.isChatInputCommand) {
                await context.reply({ embeds: [jokeEmbed] });
            }
            logger.info(`Joke command used by ${(context.author?.tag || context.user?.tag)}`);
        } catch (error) {
            logger.error('Joke API failed:', error);
            if (context.reply) return context.reply('Sorry, I couldn\'t think of a joke right now.');
            if (context.isChatInputCommand) return context.reply({ content: 'Sorry, I couldn\'t think of a joke right now.', ephemeral: true });
        }
    },
};
