// action types
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

export const SETUSERROOM = 'SETUSERROOM';



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
