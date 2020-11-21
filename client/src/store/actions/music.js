export const INCREMENTSONG = 'INCREMENTSONG';
export const DECREMENTSONG = 'DECREMENTSONG';
export const SETSONG = 'SETSONG';


export const incrementSong = () => {
    return { type: INCREMENTSONG };
}


export const decrementSong = () => {
    return { type: DECREMENTSONG };
}

export const setSong = (num) => {
    return { type: SETSONG, payload: { song: num } }
}