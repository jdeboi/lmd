/*
Reducers modify state, and set default state
store is created from reducers; it's what holds state
*/

import { combineReducers } from 'redux';
import { messagesReducer, messageNotificationReducer } from './messages';
import { mapReducer, faqReducer, chatReducer, userIconsReducer } from './menuItems';
import { userReducer, userActiveChatReducer, userHoverChatReducer, userOutsideReducer } from './user';
import { musicReducer } from './music';

const allReducers = combineReducers({
  user: userReducer,
  messages: messagesReducer,
  mapIsHidden: mapReducer,
  faqIsHidden: faqReducer,
  chatIsHidden: chatReducer,
  userIconsIsHidden: userIconsReducer,
  userActiveChat: userActiveChatReducer,
  userHoverChat: userHoverChatReducer,
  chatNotifications: messageNotificationReducer,
  currentSong: musicReducer,
  outside: userOutsideReducer
})

export default allReducers;
