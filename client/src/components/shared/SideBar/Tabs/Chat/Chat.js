import React from 'react';
import ComboBox from './ComboBox';
import Messages from './Messages';

class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   const messagesChange = nextProps.user.messages.length !== this.props.user.messages.length;
  //   const usersChange = nextProps.usersChange;
  //   const change = messagesChange | usersChange;
  //   console.log(change, "msgs:"+messagesChange, "users:"+usersChange);
  //   return change;
  // }

  render() {
    return (
      <div>
        Chat
        <ComboBox {...this.props} />
        <Messages messages={this.props.user.messages} />
      </div>
    );
  }

}

export default Chat;
