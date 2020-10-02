
import React from 'react';

function Avatar(props) {
  const {user, avatarW} = props;

  return (
    <div style={{top: window.innerHeight/2-avatarW/2, left: window.innerWidth/2-avatarW/2}} className="userAvatar">{user.avatar}</div>
  )
}

export default Avatar;
