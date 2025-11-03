const { EmbedBuilder } = require('discord.js');
const colors = require('../../config/colors.json');

module.exports = {
    data: {
        name: 'serverinfo',
        description: 'Displays information about the current server.',
        aliases: ['si', 'server'],
        cooldown: 10,
    },
    async execute(message, args) {
        const guild = message.guild;

        const infoEmbed = new EmbedBuilder()
            .setColor(colors.primary)
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Created On', value: `<t:${parseInt(guild.createdTimestamp / 1000)}:D>`, inline: true },
                { name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'Channels', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'Server ID', value: guild.id, inline: true }
            )
            .setTimestamp();
            
        message.channel.send({ embeds: [infoEmbed] });
    },
};
