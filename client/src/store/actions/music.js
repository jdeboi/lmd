export const UNMUTEVOLUME = 'UNMUTEVOLUME';
export const MUTEVOLUME = 'MUTEVOLUME';
export const TOGGLEVOLUME = 'TOGGLEVOLUME';
export const SETVOLUME = 'SETVOLUME';

export const INCREMENTSONG = 'INCREMENTSONG';
export const DECREMENTSONG = 'DECREMENTSONG';
export const SETSONG = 'SETSONG';


//////////////// volume
export const unmuteVolume = () => {
    return { type: UNMUTEVOLUME};
}

export const toggleVolume = () => {
    return { type: TOGGLEVOLUME};
}

export const muteVolume = () => {
    return { type: MUTEVOLUME};
}

export const setVolume = (vol) => {
    return { type: SETVOLUME, payload: {volume: vol}};
}

//////////////// current song
export const incrementSong = () => {
    return { type: INCREMENTSONG };
}


export const decrementSong = () => {
    return { type: DECREMENTSONG };
}

export const setSong = (num) => {
    return { type: SETSONG, payload: { song: num } }
}