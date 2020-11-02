
import React from 'react';
import {showWine} from './Helpers';

function Avatar(props) {
  const {user, avatarW} = props;
  const showWineEmoji = showWine(user);
  return (
    <div className="userAvatar avatar" style={{top: window.innerHeight/2-avatarW/2, left: window.innerWidth/2-avatarW/2, zIndex: 10}}>
      <div>{user.avatar}</div>
      <div className="emoji-addons"><div className={"emoji-wine" + (showWineEmoji?"":" hidden")}>🍷</div></div>
    </div>
  )
}

export default Avatar;
