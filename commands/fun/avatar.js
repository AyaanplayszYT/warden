const { EmbedBuilder } = require('discord.js');
const colors = require('../../config/colors.json');

const logger = require('../../utils/logger');
module.exports = {
    data: {
        name: 'avatar',
        description: 'Displays the avatar of a user.',
        aliases: ['av', 'pfp'],
        cooldown: 3,
        options: [
            {
                name: 'user',
                description: 'The user to get avatar of',
                type: 6, // USER
                required: false,
            },
        ],
    },
    async execute(context, args) {
        let user;
        if (context.isChatInputCommand) {
            user = context.options.getUser('user') || context.user;
            logger.info(`Avatar command used by ${context.user.tag} for ${user.tag}`);
        } else {
            user = context.mentions?.users?.first() || context.author;
            logger.info(`Avatar command used by ${context.author.tag} for ${user.tag}`);
        }
        const avatarEmbed = new EmbedBuilder()
                .setColor(colors.info || '#5865F2')
                .setTitle(`🖼️ Avatar: ${user.tag}`)
                .setImage(user.displayAvatarURL({ size: 512 }))
                .setFooter({ text: 'Powered by Warden' })
                .setTimestamp();
        if (context.channel?.send) {
            await context.channel.send({ embeds: [avatarEmbed] });
        } else if (context.isChatInputCommand) {
            await context.reply({ embeds: [avatarEmbed] });
        }
    },
};
