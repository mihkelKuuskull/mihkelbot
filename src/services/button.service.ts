import { backButton } from './buttons/back';
import { loopButton } from './buttons/loop';
import { lyricsButton } from './buttons/lyrics';
import { nowPlayingButton } from './buttons/nowplaying';
import { queueButton } from './buttons/queue';
import { resumePauseButton } from './buttons/resume&pause';
import { saveTrackButton } from './buttons/savetrack';
import { shuffleButton } from './buttons/shuffle';
import { skipButton } from './buttons/skip';
import { stopButton } from './buttons/stop';
import { volumeDownButton } from './buttons/volumedown';
import { volumeUpButton } from './buttons/volumeup';
import { ButtonArgs } from './types';

export const buttons: { name: string; command: (args: ButtonArgs) => void }[] = [
    backButton,
    loopButton,
    lyricsButton,
    nowPlayingButton,
    queueButton,
    resumePauseButton,
    saveTrackButton,
    shuffleButton,
    skipButton,
    stopButton,
    volumeDownButton,
    volumeUpButton,
];
