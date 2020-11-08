import { SHOWUSERICONS, HIDEUSERICONS, TOGGLEUSERICONS } from '../actions/';

// reducer (check what to do with action)
const userIconsReducer = (state=true, action) => {
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

export default userIconsReducer;
