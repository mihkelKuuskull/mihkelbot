import { skipToCommand } from './commands/SkipTo';
import { backCommand } from './commands/back';
import { clearCommand } from './commands/clear';
import { controllerCommand } from './commands/controller';
import { filterCommand } from './commands/filter';
import { historyCommand } from './commands/history';
import { jumpCommand } from './commands/jump';
import { loopCommand } from './commands/loop';
import { lyricsCommand } from './commands/lyrics';
import { nowPlayingCommand } from './commands/nowplaying';
import { pauseCommand } from './commands/pause';
import { playCommand } from './commands/play';
import { queueCommand } from './commands/queue';
import { removeCommand } from './commands/remove';
import { resumeCommand } from './commands/resume';
import { saveCommand } from './commands/save';
import { searchCommand } from './commands/search';
import { seekCommand } from './commands/seek';
import { shuffleCommand } from './commands/shuffle';
import { skipCommand } from './commands/skip';
import { stopCommand } from './commands/stop';
import { volumeCommand } from './commands/volume';
import { MyCommand } from './types';

export const commands: MyCommand[] = [
    backCommand,
    clearCommand,
    controllerCommand,
    filterCommand,
    historyCommand,
    jumpCommand,
    loopCommand,
    lyricsCommand,
    nowPlayingCommand,
    pauseCommand,
    playCommand,
    queueCommand,
    removeCommand,
    resumeCommand,
    saveCommand,
    searchCommand,
    seekCommand,
    shuffleCommand,
    skipCommand,
    skipToCommand,
    stopCommand,
    volumeCommand,
];
