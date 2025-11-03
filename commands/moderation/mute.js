const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const ms = require('ms');
const colors = require('../../config/colors.json');

module.exports = {
    data: {
        name: 'mute',
        description: 'Mutes (timeouts) a user for a specified duration.',
        aliases: ['timeout', 'silence'],
        cooldown: 5,
        userPermissions: [PermissionFlagsBits.ModerateMembers],
        botPermissions: [PermissionFlagsBits.ModerateMembers],
    },
    async execute(message, args) {
        const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
        const time = args[1];
        const reason = args.slice(2).join(' ') || 'No reason provided.';

        if (!member) {
            return message.reply('You need to mention a user to mute.');
        }
        if (!time) {
            return message.reply('You need to specify a duration for the mute (e.g., 10m, 1h, 1d).');
        }

        const duration = ms(time);
        if (isNaN(duration)) {
            return message.reply('Invalid time format. Use formats like `10m`, `1h`, `7d`.');
        }
        if (duration > ms('28d')) {
             return message.reply('You cannot timeout a member for more than 28 days.');
        }
        
        if (member.isCommunicationDisabled()) {
            return message.reply('This user is already muted.');
        }

        try {
            await member.timeout(duration, `Muted by ${message.author.tag}. Reason: ${reason}`);

            const muteEmbed = new EmbedBuilder()
                .setColor(colors.success)
                .setTitle('User Muted')
                .addFields(
                    { name: 'User', value: `${member.user.tag}`, inline: true },
                    { name: 'Duration', value: time, inline: true },
                    { name: 'Moderator', value: `${message.author.tag}`, inline: true },
                    { name: 'Reason', value: reason }
                )
                .setTimestamp();
            
            await message.channel.send({ embeds: [muteEmbed] });

        } catch (error) {
            console.error(error);
            message.reply('An error occurred while trying to mute this user.');
        }
    },
};
