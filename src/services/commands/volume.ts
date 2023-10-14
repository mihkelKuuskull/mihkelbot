import { useQueue } from 'discord-player';
import { ApplicationCommandOptionType } from 'discord.js';
import { config } from '../../config';

const maxVol = config.opt.maxVol;

export const volumeCommand = {
    name: 'volume',
    description: 'adjust',
    options: [
        {
            name: 'volume',
            description: 'the amount volume',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol,
        },
    ],

    execute: async ({ inter }) => {
        const queue = useQueue(inter.guild);

        if (!queue) {
            return inter.editReply({
                content: `No music currently playing ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }
        const vol = inter.options.getNumber('volume');

        if (queue.node.volume === vol) {
            return inter.editReply({
                content: `The volume you want to change is already the current one ${inter.member}... try again ? ❌`,
                ephemeral: true,
            });
        }

        const success = queue.node.setVolume(vol);

        return inter.editReply({
            content: success
                ? `The volume has been modified to ${vol}/${maxVol}% 🔊`
                : `Something went wrong ${inter.member}... try again ? ❌`,
        });
    },
};
