
export function getOtherUserLocation(user, otherUser, avatarW) {
  const y = otherUser.y+window.innerHeight/2-user.y-avatarW/2;
  const x = otherUser.x+window.innerWidth/2-user.x-avatarW/2;
  return {x: x, y: y};
}
