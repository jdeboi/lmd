/*
Reducers modify state, and set default state
store is created from reducers; it's what holds state
*/

import {combineReducers} from 'redux';
import userReducer from './user';
import messagesReducer from './messages';
import mapReducer from './map';
import faqReducer from './faq';
import chatReducer from './chat';
import userIconsReducer from './userIcons';
import userActiveChatReducer from './userActiveChat';
import userHoverChatReducer from './userHoverChat';

const allReducers = combineReducers({
  user: userReducer,
  messages: messagesReducer,
  mapIsHidden: mapReducer,
  faqIsHidden: faqReducer,
  chatIsHidden: chatReducer,
  userIconsIsHidden: userIconsReducer,
  userActiveChat: userActiveChatReducer,
  userHoverChat: userHoverChatReducer
})

export default allReducers;
