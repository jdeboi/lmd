export const SETUSERROOM = 'SETUSERROOM';
export const SETUSER = 'SETUSER';
export const MOVEUSER = 'MOVEUSER';
export const REGISTERUSER = 'REGISTERUSER';
export const ADDWINE = 'ADDWINE';
export const SETWINE = 'SETWINE';
export const RESETWINE = 'RESETWINE';
//setUserRoom, setUser,moveUser,registerUser


export const addWine = (wineLocation) => {
  return {
    type: ADDWINE,
    payload: {wineLocation}
  }
}

export const setWine = (needsWine, hasWine) => {
  return {
    type: SETWINE,
    payload: {needsWine, hasWine}
  }
}

export const resetWine = () => {
  return {
    type: RESETWINE
  }
}


export const setUser = (userName, avatar) => {
  return {
    type: SETUSER,
    payload: {avatar, userName}
  }
}

export const setUserRoom = (room) => {
  return {
    type: SETUSERROOM,
    payload: {room}
  }
}

export const moveUser = (x, y, wineLocation) => {
  return {
    type: MOVEUSER,
    payload: {x, y, wineLocation}
  }
}

export const registerUser = (userName, avatar) => {
  return {
    type: REGISTERUSER,
    payload: {userName, avatar}
  }
}
