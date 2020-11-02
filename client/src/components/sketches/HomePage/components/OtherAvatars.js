import React from 'react';
import OtherAvatar from './OtherAvatar';

class OtherAvatars extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {users, user, userSetActiveChat, avatarW} = this.props;
    if (users) {
      return (
        <div className="otherAvatars">
          {users.map((otherUser, i) => {
            return (
              <OtherAvatar key={i} user={user} otherUser={otherUser} userName={otherUser.userName} avatarW={avatarW} userSetActiveChat={userSetActiveChat} />
            )
          })}
        </div>
      );
    }
    return <div className="otherAvatars"></div>
  }

}

export default OtherAvatars;
