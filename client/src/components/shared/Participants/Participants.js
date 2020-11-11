import React from 'react';
import './Participants.css';
import Frame from '../Frame/Frame';

import { connect } from 'react-redux';
import { hideUserIcons, toggleUserIcons, showChat } from '../../../store/actions/';
import { setUserActiveChat, userHoverChatLeave, setUserHoverChat }  from '../../../store/actions/userActiveChat';

class Participants extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }

  }

  componentDidUpdate(prevProps) {

  }

  render() {

    return (
      <Frame title="users" bounded={true} isHidden={this.props.userIconsIsHidden} onHide={this.props.hideUserIcons} className="Participants" windowStyle={{background: "rgba(0, 0, 0, .8)"}} content={
        this.getUsers()
      }
      width={300} height={120} x={window.innerWidth-330} y={34+30}
      />
    );


  }

  userClick = (user) => {
    this.props.setUserActiveChat(user);
    this.props.showChat();
  }


  getUsers = () => {
    const {users} = this.props;
    if (users) {
      return users.map((user, i) => {
        if (i == 0) return null;
        return (
          <span
            key={i}
            onMouseEnter={() => this.props.setUserHoverChat(user)}
            onMouseLeave={() => this.props.userHoverChatLeave()}
            onClick={() => this.userClick(user)}>
            {user.avatar}
          </span>
        )
      })
    }
    return <div></div>;

  }
}


const mapStateToProps = (state) => {
 return {
   userIconsIsHidden: state.userIconsIsHidden
 }
}

const mapDispatchToProps = () => {
 return {
   hideUserIcons,
   toggleUserIcons,
   setUserActiveChat,
   setUserHoverChat,
   userHoverChatLeave,
   showChat
 }
}


export default connect(mapStateToProps, mapDispatchToProps())(Participants);
