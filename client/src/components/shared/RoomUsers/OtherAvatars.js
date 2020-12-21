import React from 'react';
import OtherAvatar from './OtherAvatar';

export default function (props) {

  const { users, avatarW } = props;
  if (users) {
    return (
      <div className="otherAvatars">
        {users.map((otherUser, i) => {
          return (
            <OtherAvatar key={i} otherUser={otherUser} userName={otherUser.userName} avatarW={avatarW} />
          )
        })}
      </div>
    );
  }
  return <div className="otherAvatars"></div>
}



