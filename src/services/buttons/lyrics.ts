import { EmbedBuilder } from 'discord.js';
import { getLyrics } from '../lyrics.service';

export const lyricsButton = {
    name: 'lyrics',
    command: async ({ inter, queue }) => {
        if (!queue?.isPlaying()) {
            return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });
        }

        try {
            const search = await getLyrics(queue.currentTrack.title);

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
            return inter.editReply({ embeds: embeds, ephemeral: true });
        } catch (error) {
            inter.editReply({ content: `Error! Please contact Developers! | ❌`, ephemeral: true });
        }
    },
};
