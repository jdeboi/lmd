import React from 'react';
import {getOtherUserLocation} from './Helpers';
import ToolTip from './ToolTip';

class OtherAvatar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userHover: false
    }
  }


  setUserHover = () => {
    this.setState({userHover: true})
  }

  setUserHoverLeave = () => {
    this.setState({userHover: false})
  }

  render() {
    const {otherUser, user, avatarW} = this.props;
    const {userHover} = this.state;
    const loc = getOtherUserLocation(user, otherUser, avatarW);
    const sty = {top: loc.y, left: loc.x};

    return (
      <div className="otherAvatar" onMouseEnter={this.setUserHover} onMouseLeave={this.setUserHoverLeave} onClick={() => this.props.userSetActiveChat(otherUser)} style={sty}>
        <div className="emoji">{otherUser.avatar}</div>
        <ToolTip userName={otherUser.userName} userHover={userHover} />
      </div>
    )

  }

}

export default OtherAvatar;
