import { SHOWMAP, HIDEMAP, TOGGLEMAP, SHOWCHAT, HIDECHAT, TOGGLECHAT, SHOWUSERICONS, HIDEUSERICONS, TOGGLEUSERICONS, SHOWFAQ, HIDEFAQ, TOGGLEFAQ } from '../actions/';

// reducer (check what to do with action)
export const mapReducer = (state=false, action) => {
  switch(action.type) {
    case SHOWMAP:
      return false;
    case HIDEMAP:
      return true;
    case TOGGLEMAP:
      return !state;
    default:
      return state;
  }
}

export const faqReducer = (state=true, action) => {
  switch(action.type) {
    case SHOWFAQ:
      return false;
    case HIDEFAQ:
      return true;
    case TOGGLEFAQ:
      return !state;
    default:
      return state;
  }
}

export const userIconsReducer = (state=true, action) => {
  switch(action.type) {
    case SHOWUSERICONS:
      return false;
    case HIDEUSERICONS:
      return true;
    case TOGGLEUSERICONS:
      return !state;
    default:
      return state;
  }
}


export const chatReducer = (state=true, action) => {
  switch(action.type) {
    case SHOWCHAT:
      return false;
    case HIDECHAT:
      return true;
    case TOGGLECHAT:
      return !state;
    default:
      return state;
  }
}

