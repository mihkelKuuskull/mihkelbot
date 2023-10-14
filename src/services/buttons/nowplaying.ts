import { Colors, EmbedBuilder } from 'discord.js';

export const nowPlayingButton = {
    name: 'nowplaying',
    command: async ({ client, inter, queue }) => {
        if (!queue?.isPlaying()) {
            return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });
        }

        const track = queue.currentTrack;

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = track.duration;

        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        const progress = queue.node.createProgressBar();

        const embed = new EmbedBuilder()
            .setAuthor({ name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
            .setThumbnail(track.thumbnail)
            .setDescription(
                `Volume **${queue.node.volume}**%\nDuration **${trackDuration}**\nProgress ${progress}\nLoop mode **${
                    methods[queue.repeatMode]
                }**\nRequested by ${track.requestedBy}`,
            )
            .setFooter({
                text: 'Sick beats by Challenger coach ❤️',
                iconURL: inter.member.avatarURL({ dynamic: true }),
            })
            .setColor(Colors.White)
            .setTimestamp();

        inter.editReply({ embeds: [embed], ephemeral: true });
    },
};
