import { QueryType } from 'discord-player';
import { BaseCommandInteraction, GuildMember } from 'discord.js';
import { isUserInChannel } from '../validation';

export const play = {
    name: 'play',
    description: 'Play a song in your channel!',
    options: [
        {
            name: 'query',
            type: 3, // 'STRING' Type
            description: 'The song you want to play',
            required: true,
        },
    ],
    async execute(interaction: BaseCommandInteraction, player) {
        try {
            if (!isUserInChannel(interaction)) {
                return void interaction.reply({
                    content: 'You are not in a voice channel!',
                    ephemeral: true,
                });
            }

            await interaction.deferReply();

            const query = interaction.options.get('query').value;
            const searchResult = await player
                .search(query, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO,
                })
                .catch(() => {});
            if (!searchResult || !searchResult.tracks.length)
                return void interaction.followUp({ content: 'No results were found!' });

            const queue = await player.createQueue(interaction.guild, {
                ytdlOptions: {
                    quality: 'highest',
                    filter: 'audioonly',
                    highWaterMark: 1 << 25,
                    dlChunkSize: 0,
                },
                metadata: interaction.channel,
            });

            try {
                if (!queue.connection) await queue.connect((interaction.member as GuildMember).voice.channel);
            } catch {
                void player.deleteQueue(interaction.guildId);
                return void interaction.followUp({
                    content: 'Could not join your voice channel!',
                });
            }

            await interaction.followUp({
                content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...`,
            });
            searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
            if (!queue.playing) await queue.play();
        } catch (error) {
            console.log(error);
            interaction.followUp({
                content: 'There was an error trying to execute that command: ' + error.message,
            });
        }
    },
};
