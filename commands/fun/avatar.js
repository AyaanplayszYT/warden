const { EmbedBuilder } = require('discord.js');
const colors = require('../../config/colors.json');

module.exports = {
    data: {
        name: 'avatar',
        description: 'Displays the avatar of a user.',
        aliases: ['av', 'pfp'],
        cooldown: 3,
    },
    async execute(message, args) {
        const user = message.mentions.users.first() || message.author;

        const avatarEmbed = new EmbedBuilder()
            .setColor(colors.primary)
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setFooter({ text: `Requested by ${message.author.username}` });

        message.channel.send({ embeds: [avatarEmbed] });
    },
};
