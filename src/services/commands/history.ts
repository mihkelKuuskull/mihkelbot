import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

export const historyCommand = {
    name: 'history',
    description: 'See the history of the queue',

    execute: async ({ inter }) => {
        const queue = useQueue(inter.guild);

        if (queue?.history.tracks.toArray().length == 0) {
            return inter.editReply({ content: `No music has been played yet`, ephemeral: true });
        }

        const tracks = queue.history.tracks.toArray();
        const description = tracks
            .slice(0, 20)
            .map((track, index) => {
                return `**${index + 1}.** [${track.title}](${track.url}) by ${track.author}`;
            })
            .join('\r\n\r\n');

        const HistoryEmbed = new EmbedBuilder()
            .setTitle(`History`)
            .setDescription(description)
            .setColor('#2f3136')
            .setTimestamp()
            .setFooter({
                text: 'Sick beats by Challenger coach ❤️',
                iconURL: inter.member.avatarURL({ dynamic: true }),
            });

        inter.editReply({ embeds: [HistoryEmbed] });
    },
};
