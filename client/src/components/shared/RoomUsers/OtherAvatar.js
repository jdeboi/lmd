import React from 'react';
import { getOtherUserLocation, showWine, showCheese, showCocktail, getDisToUser } from '../../sketches/Gallery/MiniMap/Helpers';
// import ToolTip from './ToolTip';

// store
import { connect } from 'react-redux';
import { setOneMenu, showChat } from '../../../store/actions/menuItems';
import { setUserActiveChat } from '../../../store/actions/userActiveChat';

class OtherAvatar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userHover: false
    }
  }


  setUserHover = () => {
    this.setState({ userHover: true })
  }

  setUserHoverLeave = () => {
    this.setState({ userHover: false })
  }

  userClick = (otherUser) => {
    this.props.setUserActiveChat(otherUser);
    this.props.showChat();
    // this.props.setOneMenu("chat");
  }

  render() {
    const { otherUser, userName, user, avatarW } = this.props;
    const { userHover } = this.state;

    const loc = user.room === "gallery"? getOtherUserLocation(user, otherUser, avatarW): {x: user.roomX, y: user.roomY};
    const sty = { top: loc.y, left: loc.x };
    const hidden = (otherUser.room !== user.room);

    const showWineEmoji = showWine(otherUser);
    const showCheeseEmoji = showCheese(otherUser);
    const showCocktailEmoji = showCocktail(otherUser);
    const showChatBubble = getDisToUser(user, otherUser) < 150 ? true : false;

    return (
      <div className={"otherAvatar avatar" + (hidden ? " hidden" : "")} onMouseEnter={this.setUserHover} onMouseLeave={this.setUserHoverLeave} onClick={() => this.userClick(otherUser)} style={sty}>
        <div className={"emoji"}>{otherUser.avatar}</div>
        <div className="emoji-addons">
          <div className={"emoji-item emoji-wine" + (showWineEmoji ? "" : " hidden")} >🍷</div>
          <div className={"emoji-item emoji-cocktail" + (showCocktailEmoji ? "" : " hidden")}>🍸</div>
          <div className={"emoji-item emoji-bread" + (showCheeseEmoji ? "" : " hidden")}>🥖</div>
          <div className={"emoji-item emoji-cheese" + (showCheeseEmoji ? "" : " hidden")}>🧀</div>
          <div className={"emoji-chat" + (showChatBubble ? "" : " hidden")} >💬</div>
        </div>
        {/* <ToolTip userName={otherUser.userName} userHover={userHover} /> */}
      </div>
    )

  }

}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = () => {
  return {
    setUserActiveChat,
    showChat,
    setOneMenu
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(OtherAvatar);
