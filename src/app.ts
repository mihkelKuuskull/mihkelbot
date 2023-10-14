import { config } from './config';
import { client, loadDiscordEvents, loadPlayerEvents } from './services/client.service';
import './services/lyrics.service';

loadDiscordEvents();
loadPlayerEvents();
client.login(config.app.token);
