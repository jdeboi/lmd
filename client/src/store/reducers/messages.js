import { ADDMESSAGE } from '../actions/messages';

// reducer (check what to do with action)
const messagesReducer = (state=[], action) => {
  switch(action.type) {
    case ADDMESSAGE:
      const messages = [...state, action.payload.message];
      return messages;
    default:
      return state;
  }
}

export default messagesReducer;
