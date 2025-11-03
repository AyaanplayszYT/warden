const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const colors = require('../../config/colors.json');

module.exports = {
    data: {
        name: 'ban',
        description: 'Bans a user from the server.',
        aliases: ['b'],
        cooldown: 5,
        userPermissions: [PermissionFlagsBits.BanMembers],
        botPermissions: [PermissionFlagsBits.BanMembers],
    },
    async execute(message, args) {
        const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);

        if (!member) {
            return message.reply('You need to mention a user or provide a user ID to ban.');
        }

        if (member.id === message.author.id) {
            return message.reply('You cannot ban yourself.');
        }
        
        if (member.id === message.client.user.id) {
            return message.reply('You cannot ban me.');
        }

        if (!member.bannable) {
            return message.reply('I cannot ban this user. They might have a higher role than me.');
        }

        if (message.member.roles.highest.position <= member.roles.highest.position) {
            return message.reply('You cannot ban a user with an equal or higher role than you.');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided.';

        try {
            await member.ban({ reason: `Banned by ${message.author.tag}. Reason: ${reason}` });
            
            const banEmbed = new EmbedBuilder()
                .setColor(colors.success)
                .setTitle('User Banned')
                .addFields(
                    { name: 'User', value: `${member.user.tag} (${member.id})`, inline: true },
                    { name: 'Moderator', value: `${message.author.tag}`, inline: true },
                    { name: 'Reason', value: reason }
                )
                .setTimestamp();
            
            await message.channel.send({ embeds: [banEmbed] });

        } catch (error) {
            console.error(error);
            message.reply('An error occurred while trying to ban this user.');
        }
    },
};
