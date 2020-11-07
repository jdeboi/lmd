import React from 'react';
import OtherAvatar from './OtherAvatar';

class OtherAvatars extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {users, avatarW} = this.props;
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

}

export default OtherAvatars;
