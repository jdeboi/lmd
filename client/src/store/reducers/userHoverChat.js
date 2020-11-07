import { SETUSERHOVERCHAT,  USERHOVERCHATLEAVE } from '../actions/userActiveChat';

const userActiveChatReducer = (state=null, action) => {
  switch(action.type) {
    case SETUSERHOVERCHAT:
    const user = {...action.payload.user};
    return user;

    case USERHOVERCHATLEAVE:
    return null;

    default:
    return state;
  }
}

export default userActiveChatReducer;
