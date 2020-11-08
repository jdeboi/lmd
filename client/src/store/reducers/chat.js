import { SHOWCHAT, HIDECHAT, TOGGLECHAT } from '../actions/';

// reducer (check what to do with action)
const chatReducer = (state=true, action) => {
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

export default chatReducer;
