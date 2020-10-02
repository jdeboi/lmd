import React from 'react';
import ComboBox from './ComboBox';
import Messages from './Messages';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';


import './Chat.css';

import TextField from '@material-ui/core/TextField';

import socket from "../../../Socket/Socket";



const styles = theme => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  textField: {
    backgroundColor: 'yellow',

    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // width: '25ch',
  },
});

class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      textBox: "",
      // currentRecipient: null,
      userHover: null,
      buttonDisabled: true
    }
  }

  handleTextBoxChange = (event) => {
    const textBox = event.target.value;
    // const recip = this.state.currentRecipient;
    const {userActiveChat} = this.props;
    if (userActiveChat && textBox !== "") {
      this.setState({textBox, buttonDisabled: false});
    }
    else {
      this.setState({textBox, buttonDisabled: true});
    }
  };

  setRecipient = (user) => {
    const textBox = this.state.textBox;
    if (user && textBox !== "") {
      // this.setState({currentRecipient: user, buttonDisabled: false});
      this.setState({buttonDisabled: false});
      this.props.userSetActiveChat(user);
    }
    else {
      this.setState({buttonDisabled: true});
      this.props.userSetActiveChat(user);
    }
  }

  sendToOne = (txt, socketId) => {
    console.log("send to one", socketId, "msg:", txt);
    const message = {socketId: socketId, message: txt, time: new Date(), avatar:this.props.user.avatar};
    if (socket.connected) socket.emit('messageUser', message); //sending to individual socketid
    this.props.addUserMessage({from: "me", to: this.props.user.userName, message: txt, time: new Date()});
  }

  sendToRoom = (txt) => {
    console.log("send to room ", this.props.room)
    const message = {room: this.props.room, message: txt, time: new Date(), avatar:this.props.user.avatar};
    if (socket.connected) socket.emit('messageRoom', message);
    this.props.addUserMessage({to: "room", from: "me", message: txt, time: new Date()});
  }

  sendToAll = (txt) => {
    console.log("send to all");
    const message = {message: txt, room: this.props.room, time: new Date(), avatar:this.props.user.avatar};
    if (socket.connected) socket.emit('messageAll', message);
    this.props.addUserMessage({to: "all", from: "me", message: txt, time: new Date()});
  }

  onSubmit = () => {
    const {userActiveChat} = this.props;
    if (userActiveChat && this.state.textBox !== "") {
      this.sendMessage(this.state.textBox);
      this.setState({textBox: "", buttonDisabled: true});
    }
  }


  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }


  sendMessage = (message) => {
    // const {currentRecipient} = this.state;
    const {userActiveChat} = this.props;
    if (message && userActiveChat) {
      if (userActiveChat.userName === "Everyone") {
        this.sendToAll(message);
      }
      else if (userActiveChat.userName === "Room") {
        this.sendToRoom(message);
      }
      else {
        // const user = this.getUserObjectByListID(newValue);
        // const id = "ID_testing123"
        this.sendToOne(message, userActiveChat.id);
      }
    }
  }

  setUserHover = (user) => {
    this.setState({userHover: user})
  }

  setUserHoverLeave = () => {
    this.setState({userHover: null})
  }

  render() {
    var users = this.props.users;
    if (!users) users = [];
    const {userHover} = this.state;

    const { classes } = this.props;

    return (
      <div className="Chat Panel">

          <div className="Chat-messages">
            <div className="Chat-title">
              <div className="Panel-title">chat</div>
            </div>
            <Messages messages={this.props.messages} addUserMessage={this.props.addUserMessage} />
            <div className="Chat-form">
              <div className="to-form">
                <div className="to-div">To: </div>
                <ComboBox {...this.props} setRecipient={this.setRecipient}  />
              </div>
              <div className="Chat-send">
                <div className="Chat-send-item">
                  <input
                  label=""
                  id="margin-dense"
                  className={"form-item blueOutline"}
                  placeholder="message"
                  value={this.state.textBox}
                  onChange={this.handleTextBoxChange}
                  onKeyDown={this.handleKeyDown}
                  />
                </div>
                <button className="form-item blueOutline" disabled={this.state.buttonDisabled} onClick={this.onSubmit}><SendIcon disabled={this.state.buttonDisabled} /></button>
              </div>
            </div>

          </div>
      </div>
    );
  }

}

export default withStyles(styles, { withTheme: true })(Chat);
