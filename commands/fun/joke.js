const { EmbedBuilder } = require('discord.js');
const colors = require('../../config/colors.json');

module.exports = {
    data: {
        name: 'joke',
        description: 'Tells a random joke.',
        aliases: [],
        cooldown: 5,
    },
    async execute(message, args) {
        try {
            // Using a free, no-key-required API for jokes
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const jokeData = await response.json();

            const jokeEmbed = new EmbedBuilder()
                .setColor(colors.info)
                .setTitle(jokeData.setup)
                .setDescription(jokeData.punchline);
            
            message.channel.send({ embeds: [jokeEmbed] });

        } catch (error) {
            console.error('Joke API failed:', error);
            message.reply('Sorry, I couldn\'t think of a joke right now.');
        }
    },
};
