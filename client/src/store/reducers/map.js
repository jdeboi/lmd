import { SHOWMAP, HIDEMAP, TOGGLEMAP } from '../actions/';

// reducer (check what to do with action)
const mapReducer = (state=false, action) => {
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

export default mapReducer;
