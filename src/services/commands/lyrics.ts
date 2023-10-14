import { EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';
import { lyricsClient } from '../lyrics.service';

export const lyricsCommand = {
    name: 'lyrics',
    description: 'get lyrics for the current track',
    execute: async ({ inter }) => {
        const queue = useQueue(inter.guild);

        if (!queue || !queue.isPlaying()) {
            return inter.editReply({
                content: `No music currently playing ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        try {
            const search = await lyricsClient.songs.search(queue.currentTrack.title);

            const song = search.find(
                (song) => song.artist.name.toLowerCase() === queue.currentTrack.author.toLowerCase(),
            );
            if (!song) {
                return inter.editReply({
                    content: `No lyrics found for ${queue.currentTrack.title}... try again ? ❌`,
                    ephemeral: true,
                });
            }
            const lyrics = await song.lyrics();
            const embeds = [];
            for (let i = 0; i < lyrics.length; i += 4096) {
                const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 4096));
                embeds.push(
                    new EmbedBuilder()
                        .setTitle(`Lyrics for ${queue.currentTrack.title}`)
                        .setDescription(toSend)
                        .setColor('#2f3136')
                        .setTimestamp()
                        .setFooter({
                            text: 'Sick beats by Challenger coach ❤️',
                            iconURL: inter.member.avatarURL({ dynamic: true }),
                        }),
                );
            }
            return inter.editReply({ embeds: embeds });
        } catch (error) {
            inter.editReply({ content: `Error! Please contact Developers! | ❌`, ephemeral: true });
        }
    },
};
