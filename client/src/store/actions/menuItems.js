// action types
export const HIDEMENUS = 'HIDEMENUS';
export const SETONEMENU = 'SETONEMENU';

export const SHOWMAP = 'SHOWMAP';
export const HIDEMAP = 'HIDEMAP';
export const TOGGLEMAP = 'TOGGLEMAP';

export const SHOWFAQ = 'SHOWFAQ';
export const HIDEFAQ = 'HIDEFAQ';
export const TOGGLEFAQ = 'TOGGLEFAQ';

export const SHOWCHAT = 'SHOWCHAT';
export const HIDECHAT = 'HIDECHAT';
export const TOGGLECHAT = 'TOGGLECHAT';

export const SHOWUSERICONS = 'SHOWUSERICONS';
export const HIDEUSERICONS = 'HIDEUSERICONS';
export const TOGGLEUSERICONS = 'TOGGLEUSERICONS';

export const SHOWVOLUME = 'SHOWVOLUME';
export const HIDEVOLUME = 'HIDEVOLUME';
export const TOGGLEVOLUMEMENU = 'TOGGLEVOLUMEMENU';

export const hideMenus = () => {
  return {
    type: HIDEMENUS
  }
}

export const setOneMenu = (menu) => {
  return {
    type: SETONEMENU,
    payload: {menu}
  }
} 

///////////// MAP
export const toggleMap = () => {
  return {
    type: TOGGLEMAP
  }
}

export const showMap = () => {
  return {
    type: SHOWMAP
  }
}

export const hideMap = () => {
  return {
    type: HIDEMAP
  }
}

///////////// FAQ
export const toggleFaq = () => {
  return {
    type: TOGGLEFAQ
  }
}

export const showFaq = () => {
  return {
    type: SHOWFAQ
  }
}

export const hideFaq = () => {
  return {
    type: HIDEFAQ
  }
}

///////////// Chat
export const toggleChat = () => {
  return {
    type: TOGGLECHAT
  }
}

export const showChat = () => {
  return {
    type: SHOWCHAT
  }
}

export const hideChat = () => {
  return {
    type: HIDECHAT
  }
}


///////////// MAP
export const toggleUserIcons = () => {
  return {
    type: TOGGLEUSERICONS
  }
}

export const showUserIcons = () => {
  return {
    type: SHOWUSERICONS
  }
}

export const hideUserIcons = () => {
  return {
    type: HIDEUSERICONS
  }
}

////////////// VOLUME


export const showVolume = () => {
  return {
    type: SHOWVOLUME
  }
}

export const hideVolume = () => {
  return {
    type: HIDEVOLUME
  }
}

export const toggleVolumeMenu = () => {
  return {
    type: TOGGLEVOLUMEMENU
  }
}