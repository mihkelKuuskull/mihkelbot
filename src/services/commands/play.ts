import { QueryType, useMainPlayer } from 'discord-player';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { config } from '../../config';

export const playCommand = {
    name: 'play',
    description: 'play a song!',
    options: [
        {
            name: 'song',
            description: 'the song you want to play',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    execute: async ({ inter }: { inter }) => {
        const player = useMainPlayer();
        const res = await player.search(inter.options._hoistedOptions[0].value, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO,
        });
        const Embed = new EmbedBuilder().setColor('#2f3136');

        if (!res?.tracks.length) {
            Embed.setAuthor({ name: `No results found... try again ? ❌` });
            return inter.editReply({ embeds: [Embed] });
        }

        await playTrack(Embed, inter, player, inter.options._hoistedOptions[0].value);
    },
};

async function playTrack(Embed: EmbedBuilder, inter, player, song: string) {
    try {
        const { track } = await player.play(inter.member.voice.channel, song, {
            nodeOptions: {
                metadata: {
                    channel: inter.channel,
                },
                volume: config.opt.volume,
                leaveOnEmpty: config.opt.leaveOnEmpty,
                leaveOnEmptyCooldown: config.opt.leaveOnEmptyCooldown,
                leaveOnEnd: config.opt.leaveOnEnd,
                leaveOnEndCooldown: config.opt.leaveOnEndCooldown,
            },
        });
        Embed.setAuthor({ name: `Loading ${track.title} to the queue... <✅>` });
    } catch (error) {
        Embed.setAuthor({ name: `I can't join the voice channel... try again ? <❌>` });
    }
    await inter.editReply({ embeds: [Embed] });
}
