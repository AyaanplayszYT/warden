const { Events, EmbedBuilder } = require('discord.js');
const logger = require('../utils/logger');
const modLogs = require('../utils/modLogs');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: Events.MessageDelete,
    async execute(message, client) {
        if (!message.partial && message.guild) {
            const logEntry = {
                type: 'delete',
                user: message.author ? message.author.tag : 'Unknown',
                userId: message.author ? message.author.id : 'Unknown',
                content: message.content,
                channel: message.channel.name,
                time: new Date().toISOString(),
            };
            modLogs.add(logEntry);
            logger.info(`Message deleted by ${logEntry.user} in #${logEntry.channel}: ${logEntry.content}`);
            // Send to spam logs channel from persistent file
            let spamLogsChannelId = '';
            try {
                const logChannels = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/logChannels.json'), 'utf8'));
                spamLogsChannelId = logChannels.spamLog;
            } catch (e) {}
            if (spamLogsChannelId) {
                const spamChannel = message.guild.channels.cache.get(spamLogsChannelId);
                const embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle('Message Deleted')
                    .addFields(
                        { name: 'User', value: `${logEntry.user} (${logEntry.userId})`, inline: true },
                        { name: 'Channel', value: `#${logEntry.channel}`, inline: true },
                        { name: 'Content', value: logEntry.content ? logEntry.content.substring(0, 1024) : 'None' }
                    )
                    .setTimestamp();
                // Add attachment info if present
                if (message.attachments && message.attachments.size > 0) {
                    const attachmentLinks = message.attachments.map(att => `[${att.name}](${att.url})`).join('\n');
                    embed.addFields({ name: 'Attachments', value: attachmentLinks });
                }
                if (spamChannel) {
                    spamChannel.send({ embeds: [embed] });
                }
            }
        }
    },
};
