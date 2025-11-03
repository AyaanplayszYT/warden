const { EmbedBuilder } = require('discord.js');
const colors = require('../../config/colors.json');

module.exports = {
    data: {
        name: 'userinfo',
        description: 'Displays information about a user.',
        aliases: ['ui', 'whois'],
        cooldown: 5,
    },
    async execute(message, args) {
        const member = message.mentions.members.first() || await message.guild.members.fetch(message.author.id);

        const infoEmbed = new EmbedBuilder()
            .setColor(colors.primary)
            .setTitle(member.user.tag)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Username', value: member.user.username, inline: true },
                { name: 'ID', value: member.id, inline: true },
                { name: 'Joined Server', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: 'Joined Discord', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: 'Roles', value: `${member.roles.cache.map(r => r).join(' ').substring(0, 1024) || 'None'}` }
            )
            .setTimestamp();

        message.channel.send({ embeds: [infoEmbed] });
    },
};
