import React from 'react';
import ComboBox from './ComboBox';
import Messages from './Messages';
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import SendIcon from '@material-ui/icons/Send';
import Frame from '../Frame/Frame';

import './Chat.css';

import socket from "../Socket/Socket";

import { connect } from 'react-redux';
import { hideChat, toggleChat } from '../../../store/actions/';
import { addMessage, resetMessgeNotification} from '../../../store/actions/messages';
import { addWine, addCocktail, addCheese } from '../../../store/actions/user';
import { setUserActiveChat } from '../../../store/actions/userActiveChat';
import { setSong } from '../../../store/actions/music';

import { wineLocation } from '../../sketches/HomePage/constants';

class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      textBox: "",
      // currentRecipient: null,
      userHover: null,
      buttonDisabled: true,
      wineBotJustAsked: false,
      cheeseBotJustAsked: false,
      cocktailBotJustAsked: false,
      djJustAsked : 0
    }
  }

  handleTextBoxChange = (event) => {
    const textBox = event.target.value;
    // const recip = this.state.currentRecipient;
    const { userActiveChat } = this.props;
    if (userActiveChat && textBox !== "") {
      this.setState({ textBox, buttonDisabled: false });
    }
    else {
      this.setState({ textBox, buttonDisabled: true });
    }
  };

  setRecipient = (user) => {
    const textBox = this.state.textBox;
    if (user && textBox !== "") {
      // this.setState({currentRecipient: user, buttonDisabled: false});
      this.setState({ buttonDisabled: false });
      this.props.setUserActiveChat(user);
    }
    else {
      this.setState({ buttonDisabled: true });
      this.props.setUserActiveChat(user);
    }
  }

  sendToOne = (txt, socketId) => {
    console.log("send to one", socketId, "msg:", txt);
    const { userActiveChat } = this.props;
    const message = { socketId: socketId, message: txt, time: new Date(), avatar: this.props.user.avatar };
    if (socket.connected) socket.emit('messageUser', message); //sending to individual socketid
    this.props.addMessage({ from: "me", to: userActiveChat.userName, message: txt, time: new Date() });
  }

  sendToRoom = (txt) => {
    console.log("send to room ", this.props.room)
    const message = { room: this.props.room, message: txt, time: new Date(), avatar: this.props.user.avatar };
    if (socket.connected) socket.emit('messageRoom', message);
    this.props.addMessage({ to: "room", from: "me", message: txt, time: new Date() });
  }

  sendToAll = (txt) => {
    console.log("send to all");
    const message = { message: txt, room: this.props.room, time: new Date(), avatar: this.props.user.avatar };
    if (socket.connected) socket.emit('messageAll', message);
    this.props.addMessage({ to: "all", from: "me", message: txt, time: new Date() });
  }

  // u: "hello?"
  // wb: "hi, would you like some wine? Y/N."
  // u: "yes"
  // wb: "enjoy!"
  // u: "what are you?"
  // wb: "hi, would you like some wine? I only understand yes and no."

  sendToHostBot = (txt) => {

  }

  sendToCocktailBot = (txt) => {
    const message = { to: "cocktailBot", from: "me", message: txt, time: new Date() };
    // console.log("MESSAGE", message);
    this.props.addMessage(message);
    setTimeout(() => this.cocktailBotRespond(txt), 1000);
  }

  sendToCheeseBot = (txt) => {
    const message = { to: "cheeseBot", from: "me", message: txt, time: new Date() };
    // console.log("MESSAGE", message);
    this.props.addMessage(message);
    setTimeout(() => this.cheeseBotRespond(txt), 1000);
  }

  sendToWineBot = (txt) => {
    const message = { to: "wineBot", from: "me", message: txt, time: new Date() };
    // console.log("MESSAGE", message);
    this.props.addMessage(message);
    setTimeout(() => this.wineBotRespond(txt), 1000);
  }

  sendToDJ = (txt) => {
    const message = { to: "DJ", from: "me", message: txt, time: new Date() };
    this.props.addMessage(message);
    setTimeout(() => this.djRespond(txt), 1000);
  }

  wineBotRespond = (txt) => {
    // console.log("winebot responding!");
    const wineBotJustAsked = this.state.wineBotJustAsked;
    const { userActiveChat } = this.props;
    if (!wineBotJustAsked) {
      const phrase = "hi, would you like some wine? Y/N.";
      this.props.addMessage({ to: "me", from: "wineBot", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
      this.setState({ wineBotJustAsked: true });
    }
    else {
      const lc = txt.toLowerCase();
      let phrase = "";
      if (lc === "y" || lc.indexOf("yes") > -1) {  
        phrase = "Stop by the bar to pick up your glass.";
        this.props.addWine(wineLocation[1]);
      }
      else {
        phrase = "Cool, I don't drink either.";
      }
      this.props.addMessage({ to: "me", from: "wineBot", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
      this.setState({ wineBotJustAsked: false });
    }
  }

  cocktailBotRespond = (txt) => {
    // console.log("winebot responding!");
    const cocktailBotJustAsked = this.state.cocktailBotJustAsked;
    const { userActiveChat } = this.props;
    if (!cocktailBotJustAsked) {
      const phrase = "hi, would you like a martini? Y/N.";
      this.props.addMessage({ to: "me", from: "cocktailBot", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
      this.setState({ cocktailBotJustAsked: true });
    }
    else {
      const lc = txt.toLowerCase();
      let phrase = "";
      if (lc === "y" || lc.indexOf("yes") > -1) {
        phrase = "Stop by the bar to pick up your glass.";
        this.props.addCocktail(wineLocation[2]);
      }
      else {
        phrase = "Cool, I don't drink either.";
      }
      this.props.addMessage({ to: "me", from: "cocktailBot", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
      this.setState({ cocktailBotJustAsked: false });
    }
  }

  cheeseBotRespond = (txt) => {
    const cheeseBotJustAsked = this.state.cheeseBotJustAsked;
    const { userActiveChat } = this.props;
    if (!cheeseBotJustAsked) {
      const phrase = "hi, would you like some cheese and bread? Y/N.";
      this.props.addMessage({ to: "me", from: "cheeseBot", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
      this.setState({ cheeseBotJustAsked: true });
    }
    else {
      const lc = txt.toLowerCase();
      let phrase = "";
      if (lc === "y" || lc.indexOf("yes") > -1) {
        phrase = "Come by the cheese bar to pick up your snack! And please don't feed the ducks!";
        this.props.addCheese(wineLocation[0]);
      }
      else {
        phrase = "ok";
      }
      this.props.addMessage({ to: "me", from: "cheeseBot", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
      this.setState({ cheeseBotJustAsked: false });
    }
  }

  djRespond = (txt) => {
    const djJustAsked = this.state.djJustAsked;
    const { userActiveChat } = this.props;
    let phrase = "";
    if (djJustAsked === 0) {
      const phrase = "hi! would you like pick a song? Y/N.";
      this.props.addMessage({ to: "me", from: "DJ", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
      this.setState({ djJustAsked: 1 });
    }
    else if (djJustAsked === 1) {
      const lc = txt.toLowerCase();
      phrase = "";
      if (lc === "y" || lc.indexOf("yes") > -1) {
        phrase = "Type 1 for R&B, 2 for Mariah, or 3 for surprise";
        this.setState({ djJustAsked: 2 });
      }
      else {
        phrase = "Ok, I'll keep spinning.";
        this.setState({ djJustAsked: 0 });
      }
      this.props.addMessage({ to: "me", from: "DJ", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
    }
    else {
      if (txt == 1 || txt == 2 || txt == 3) {
        phrase = "good pick.";
        this.props.setSong(txt);
      }
      else {
        phrase = "sorry, I'm a man of simple integers.";
      }
      this.props.addMessage({ to: "me", from: "DJ", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
      this.setState({ djJustAsked: 0 });
    }
  }

  onSubmit = () => {
    if (this.state.textBox === "") return;

    const { userActiveChat } = this.props;
    if (userActiveChat) {
      this.sendMessage(this.state.textBox);
      this.setState({ textBox: "", buttonDisabled: true });
    }
    else {
      alert("please select recipient");
    }
  }


  handleKeyDown = (e) => {

    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }


  sendMessage = (message) => {
    // const {currentRecipient} = this.state;
    const { userActiveChat } = this.props;
    if (message && userActiveChat) {
      if (userActiveChat.userName === "Everyone") {
        this.sendToAll(message);
      }
      else if (userActiveChat.userName === "Room") {
        this.sendToRoom(message);
      }
      else if (userActiveChat.userName === "wineBot") {
        this.sendToWineBot(message);
      }
      else if (userActiveChat.userName === "cocktailBot") {
        this.sendToCocktailBot(message);
      }
      else if (userActiveChat.userName === "cheeseBot") {
        this.sendToCheeseBot(message);
      }
      else if (userActiveChat.userName === "DJ") {
        this.sendToDJ(message);
      }
      else if (userActiveChat.userName === "hostBot") {
        this.sendToHostBot(message);
      }
      else {
        this.sendToOne(message, userActiveChat.id);
      }
    }
  }

  setUserHover = (user) => {
    this.setState({ userHover: user })
  }

  setUserHoverLeave = () => {
    this.setState({ userHover: null })
  }

  render() {
    var users = this.props.users;
    if (!users) users = [];
    const { userHover } = this.state;

    const { classes } = this.props;

    // headerH+bufferH*2+cbarH + usersH
    const bufferH = 30;
    const y = 34 + bufferH * 2 + 24 + 120
    const h = window.innerHeight - y - 24 - 30;
    return (
      <Frame title="chat" bounded={true} isHidden={this.props.chatIsHidden} onHide={this.props.hideChat} windowStyle={{ background: "rgba(0, 0, 0, .9)" }} content={

        <div className="Chat">

          <div className="Chat-messages" style={{ display: "flex", flexDirection: "column", height: h }}>
            <Messages messages={this.props.messages} addUserMessage={this.props.addMessage} />
            <div className="Chat-form">
              <div className="to-form">
                <div className="to-div">To: </div>
                <ComboBox {...this.props} setRecipient={this.setRecipient} />
              </div>
              <div className="Chat-send">
                <div className="Chat-send-item">
                  <input
                    label=""
                    id="margin-dense"
                    className={"standardInputWhite form-item"}
                    placeholder="type message here"
                    value={this.state.textBox}
                    onChange={this.handleTextBoxChange}
                    onFocus={this.props.resetMessgeNotification}
                    onKeyDown={this.handleKeyDown}
                  />
                </div>
                {/* <button className="standardButton form-item blueOutline" disabled={this.state.buttonDisabled} onClick={this.onSubmit}><SendIcon disabled={this.state.buttonDisabled} /></button>*/}
              </div>
            </div>

          </div>
        </div>
      }
        width={300} height={h} x={window.innerWidth - 330} y={y} z={1000}
      />
    );
  }

}


const mapStateToProps = (state) => {
  return {
    chatIsHidden: state.chatIsHidden,
    user: state.user,
    room: state.user.room,
    messages: state.messages,
    userActiveChat: state.userActiveChat,
    userHoverChat: state.userHoverChat,
  }
}

const mapDispatchToProps = () => {
  return {
    hideChat,
    toggleChat,
    addWine,
    addCocktail,
    addCheese,
    addMessage,
    setUserActiveChat,
    resetMessgeNotification,
    setSong
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Chat);
