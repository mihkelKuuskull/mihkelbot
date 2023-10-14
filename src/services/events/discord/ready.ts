import { config } from '../../../config';

export const readyEvent = {
    name: 'ready',
    event: async (client) => {
        console.log(`Logged to the client ${client.user.username}\nlets play some music!`);
        client.user.setActivity(config.app.playing);
    },
};
