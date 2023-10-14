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
        const NoResultsEmbed = new EmbedBuilder()
            .setAuthor({ name: `No results found... try again ? ❌` })
            .setColor('#2f3136');

        if (!res || !res.tracks.length) {
            return inter.editReply({ embeds: [NoResultsEmbed] });
        }

        const queue = await player.nodes.create(inter.guild, {
            metadata: inter.channel,
            // spotifyBridge: client.config.opt.spotifyBridge,
            volume: config.opt.volume,
            leaveOnEmpty: config.opt.leaveOnEmpty,
            leaveOnEmptyCooldown: config.opt.leaveOnEmptyCooldown,
            leaveOnEnd: config.opt.leaveOnEnd,
            leaveOnEndCooldown: config.opt.leaveOnEndCooldown,
        });

        try {
            if (!queue.connection) {
                await queue.connect(inter.member.voice.channel);
            }
        } catch {
            await (player as any)?.deleteQueue(inter.guildId);

            const NoVoiceEmbed = new EmbedBuilder()
                .setAuthor({ name: `I can't join the voice channel... try again ? ❌` })
                .setColor('#2f3136');

            return inter.editReply({ embeds: [NoVoiceEmbed] });
        }

        const playEmbed = new EmbedBuilder()
            .setAuthor({ name: `Loading your ${res.playlist ? 'playlist' : 'track'} to the queue... ✅` })
            .setColor('#2f3136');

        await inter.editReply({ embeds: [playEmbed] });

        res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.isPlaying()) {
            await queue.node.play();
        }
    },
};
