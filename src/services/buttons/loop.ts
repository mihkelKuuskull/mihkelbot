import { QueueRepeatMode } from 'discord-player';

export const loopButton = {
    name: 'loop',
    command: async ({ inter, queue }) => {
        if (!queue || !queue.isPlaying())
            return inter.editReply({ content: `No music currently playing... try again ? ❌`, ephemeral: true });

        const repeatMode: QueueRepeatMode = queue.repeatMode;

        queue.setRepeatMode(repeatMode);

        return inter.editReply({
            content: `loop made has been set to **${Object.keys(QueueRepeatMode)[repeatMode].toLowerCase()}**.✅`,
        });
    },
};
