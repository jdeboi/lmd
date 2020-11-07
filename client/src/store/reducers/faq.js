import { SHOWFAQ, HIDEFAQ, TOGGLEFAQ } from '../actions/';

// reducer (check what to do with action)
const faqReducer = (state=true, action) => {
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

export default faqReducer;
