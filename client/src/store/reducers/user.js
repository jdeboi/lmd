import { SETUSERROOM,SETUSER,MOVEUSER,REGISTERUSER, SETWINE, RESETWINE, ADDWINE  } from '../actions/user';

import Cookies from 'js-cookie';
import socket from "../../components/shared/Socket/Socket";

// reducer (check what to do with action)
const initState = { avatar:"😀", userName:"", room:"home-page", x: 0, y: 0, hasWine: null, needsWine: false};

const userReducer = (state=initState, action) => {
  const user =  {...state };

  switch(action.type) {

    case SETUSERROOM:
    const prevRoom = user.room;
    const nextRoom = action.payload.room;
    user.room = nextRoom;
    socket.emit("leaveRoom", prevRoom);
    socket.emit("joinRoom", nextRoom);
    socket.emit("setUser", user);
    return user;

    case SETUSER:
    user.avatar = action.payload.avatar;
    user.userName = action.payload.userName;
    Cookies.set("hasAvatar", true);
    Cookies.set("avatar", user.avatar);
    Cookies.set("userName", user.userName);
    socket.emit("setUser", user);
    return user;

    case MOVEUSER:
    user.x = action.payload.x;
    user.y = action.payload.y;
    var wineLocation = action.payload.wineLocation;
    if ((userNearWine(user, wineLocation[0]) || userNearWine(user, wineLocation[1])) && user.needsWine) {
      user.needsWine = false;
      user.hasWine = new Date();
    }
    socket.emit("setUser", user);
    return user;

    case ADDWINE:
    user.needsWine = true;
    var wineLocation = action.payload.wineLocation;
    console.log("WINE", wineLocation);
    if (userNearWine(user, wineLocation[0]) || userNearWine(user, wineLocation[1])) {
      user.needsWine = false;
      user.hasWine = new Date();
    }
    socket.emit("setUser", user);
    return user;

    case SETWINE:
    user.needsWine = action.payload.needsWine;
    user.hasWine = action.payload.hasWine;
    socket.emit("setUser", user);
    return user;

    case RESETWINE:
    user.hasWine = false;
    user.needsWine = false;
    socket.emit("setUser", user);
    return user;

    default:
    return state;
  }
}


function userNearWine (user, wineLocation) {
  var dx = user.x - (wineLocation.x+wineLocation.w/2);
  var dy = user.y - (wineLocation.y+wineLocation.h/2);
  var dis = Math.sqrt(dx*dx + dy*dy);
  // console.log("DIS", dis < 200);
  return dis < 200;
}


export default userReducer;
