import { SETUSERACTIVECHAT  } from '../actions/userActiveChat';

const userActiveChatReducer = (state=null, action) => {
  switch(action.type) {
    case SETUSERACTIVECHAT:
    const user = {...action.payload.user};
    return user;
    default:
    return state;
  }
}

export default userActiveChatReducer;
