const { Events, EmbedBuilder } = require('discord.js');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: Events.MessageUpdate,
    async execute(oldMessage, newMessage, client) {
        if (!oldMessage.partial && oldMessage.guild && oldMessage.content !== newMessage.content) {
            let spamLogsChannelId = '';
            try {
                const logChannels = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/logChannels.json'), 'utf8'));
                spamLogsChannelId = logChannels.spamLog;
            } catch (e) {}
            if (spamLogsChannelId) {
                const spamChannel = oldMessage.guild.channels.cache.get(spamLogsChannelId);
                const embed = new EmbedBuilder()
                    .setColor('#FFA500')
                    .setTitle('Message Edited')
                    .addFields(
                        { name: 'User', value: `${oldMessage.author?.tag || 'Unknown'} (${oldMessage.author?.id || 'Unknown'})`, inline: true },
                        { name: 'Channel', value: `#${oldMessage.channel.name}`, inline: true },
                        { name: 'Before', value: oldMessage.content ? oldMessage.content.substring(0, 1024) : 'None' },
                        { name: 'After', value: newMessage.content ? newMessage.content.substring(0, 1024) : 'None' }
                    )
                    .setTimestamp();
                // Add attachment info if present (old or new)
                const allAttachments = [];
                if (oldMessage.attachments && oldMessage.attachments.size > 0) {
                    allAttachments.push(...oldMessage.attachments.map(att => `[${att.name}](${att.url})`));
                }
                if (newMessage.attachments && newMessage.attachments.size > 0) {
                    allAttachments.push(...newMessage.attachments.map(att => `[${att.name}](${att.url})`));
                }
                if (allAttachments.length > 0) {
                    embed.addFields({ name: 'Attachments', value: allAttachments.join('\n') });
                }
                if (spamChannel) {
                    spamChannel.send({ embeds: [embed] });
                }
            }
            logger.info(`Message edited by ${oldMessage.author?.tag || 'Unknown'} in #${oldMessage.channel.name}: ${oldMessage.content} -> ${newMessage.content}`);
        }
    },
};
