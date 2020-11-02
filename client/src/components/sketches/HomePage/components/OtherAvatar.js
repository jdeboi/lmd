import React from 'react';
import {getOtherUserLocation, showWine, getDisToUser} from './Helpers';
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
    const {otherUser, userName, user, avatarW} = this.props;
    const {userHover} = this.state;
    const loc = getOtherUserLocation(user, otherUser, avatarW);
    const sty = {top: loc.y, left: loc.x};
    const hidden = (otherUser.room !== "home-page");
    // console.log(otherUser, hidden);
    const showWineEmoji = showWine(otherUser);
    const showChatBubble = getDisToUser(user, otherUser)<150?true:false;
    // console.log(showWine);
    return (
      <div className={"otherAvatar avatar" + (hidden?" hidden":"")} onMouseEnter={this.setUserHover} onMouseLeave={this.setUserHoverLeave} onClick={() => this.props.userSetActiveChat(otherUser)} style={sty}>
        <div className={"emoji"}>{otherUser.avatar}</div>
        <div className="emoji-addons">
          <div className={"emoji-wine" + (showWineEmoji?"":" hidden")} >🍷</div>
          <div className={"emoji-chat" + (showChatBubble?"":" hidden")} >💬</div>
        </div>
        <ToolTip userName={otherUser.userName} userHover={userHover} />
      </div>
    )

  }

}

export default OtherAvatar;
