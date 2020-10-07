export function userNearWine (user, wineLocation) {
  var dx = user.x - (wineLocation.x+wineLocation.w/2);
  var dy = user.y - (wineLocation.y+wineLocation.h/2);
  var dis = Math.sqrt(dx*dx + dy*dy);
  // console.log("DIS", dis < 200);
  return dis < 200;
}
