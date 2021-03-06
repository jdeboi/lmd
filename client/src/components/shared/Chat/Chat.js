import React from 'react';
import ComboBox from './ComboBox';
import Messages from './Messages';
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Frame from '../Frame/Frame';
import CenterModal from '../CenterModal/CenterModal';
import { getCenterModalDim } from '../CenterModal/Helper';

import './Chat.css';
import './ChatMobile.css';

import socket from "../Socket/Socket";

import { connect } from 'react-redux';
import { setOneMenu, hideChat, toggleChat } from '../../../store/actions/menuItems';
import { addMessage, resetMessgeNotification } from '../../../store/actions/messages';
import { addWine, addCocktail, addCheese } from '../../../store/actions/user';
import { setUserActiveChat } from '../../../store/actions/userActiveChat';
import { setRandomSong, setSong } from '../../../store/actions/music';

import { wineLocation } from '../../sketches/Gallery/constants';

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
      hostBotJustAsked: false,
      djJustAsked: 0
    }
    this.textInput = React.createRef();
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
    // console.log("send to one", socketId, "msg:", txt);
    const { userActiveChat } = this.props;
    const message = { socketId: socketId, message: txt, time: new Date(), avatar: this.props.user.avatar };
    if (socket.connected) socket.emit('messageUser', message); //sending to individual socketid
    this.props.addMessage({ from: "me", to: userActiveChat.userName, message: txt, time: new Date() });
  }

  sendToRoom = (txt) => {
    // console.log("send to room ", this.props.room)
    const message = { room: this.props.room, message: txt, time: new Date(), avatar: this.props.user.avatar };
    if (socket.connected) socket.emit('messageRoom', message);
    this.props.addMessage({ to: "room", from: "me", message: txt, time: new Date() });
  }

  sendToAll = (txt) => {
    // console.log("send to all");
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
    const message = { to: "hostBot", from: "me", message: txt, time: new Date() };
    // console.log("MESSAGE", message);
    this.props.addMessage(message);
    setTimeout(() => this.hostBotRespond(txt), 1000);
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

  hostBotRespond = (txt) => {
    // console.log("winebot responding!");
    const hostBotJustAsked = this.state.hostBotJustAsked;
    const { userActiveChat } = this.props;
    if (!hostBotJustAsked) {
      const phrase = "hi, welcome to Jenna's MFA thesis show, Losing My Dimension!";
      this.props.addMessage({ to: "me", from: "hostBot", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
      this.setState({ hostBotJustAsked: true });
    }
    else {
      let phrase = "Have you found the live stream or Zoom? If not, check the top menu bar to toggle the live stream!";
      this.props.addMessage({ to: "me", from: "hostBot", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
      this.setState({ hostBotJustAsked: false });
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
    const { userActiveChat, user } = this.props;
    let phrase = "";
    if (djJustAsked === 0) {
      const phrase = "hi! would you like pick a song? Y/N.";
      this.props.addMessage({ to: "me", from: "DJ", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
      this.setState({ djJustAsked: 1 });
    }
    else if (djJustAsked === 1) {
      const lc = txt.toLowerCase();
      phrase = "";

      if (user.comp !== null) {
        phrase = "Sorry, Jenna has disabled audio at The Front!";
        this.setState({ djJustAsked: 0 });
      }
      else if (lc === "y" || lc.indexOf("yes") > -1) {
        phrase = "Type 1 to get funky, 2 for something jazzy, or 3 for a surprise";
        this.setState({ djJustAsked: 2 });
      }
      else {
        phrase = "Ok, I'll keep spinning.";
        this.setState({ djJustAsked: 0 });
      }
      this.props.addMessage({ to: "me", from: "DJ", message: phrase, time: new Date(), avatar: userActiveChat.avatar });
    }
    else {
      if (txt == 1 || txt == 2) {
        phrase = "good pick.";
        this.props.setSong(txt);

      }
      else if (txt == 3) {
        phrase = "good pick.";
        this.props.setRandomSong();
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
    const { ui } = this.props;
    // console.log(menu)
    if (ui.isMobile || ui.hasFooter) {
      return this.getMobileFrame();
    }
    return this.getFrame();
    // return (
    //   <React.Fragment>
    //   {this.getMobileFrame()}
    //   {this.getFrame()}
    //   </React.Fragment>
    // )
  }

  onHide = () => {
    this.props.hideChat();
    this.props.setOneMenu();
  }

  getMobileFrame = () => {
    const { w, h } = getCenterModalDim(this.props.ui, false);
    return (
      <CenterModal
        title="chat"
        z={1000}
        isHidden={this.props.menu.mobile !== "chat"}
        onHide={this.onHide}
        ui={this.props.ui}
        isRelative={false}
        classN="ChatMobile"
        content={this.getMobileContent(w, h)}
        buttons={this.getMobileButtons()}
      />
    );
  }

  getIsHidden = (props) => {
    const { ui, menu } = props;

    if (ui.isMobile || ui.hasFooter) {
      return menu.mobile !== "chat";
    }
    return menu.isChatHidden;
  }

  getMobileContent = (w, h) => {
    const inputW = w - 60 - 40 - 20;
    return (
      <div className="Chat-messages" style={{ display: "flex", flexDirection: "column", height: h }}>
        <div className="Chat-form">
          <div className="to-form">
            <div className="to-div">To: </div>
            <ComboBox {...this.props} setRecipient={this.setRecipient} w={w - 40 - 40} />
          </div>
          <div className="Chat-send">
            <div className="Chat-send-item margR">
              <input
                label=""
                id="margin-dense"
                className={"standardInput form-item"}
                placeholder="enter message"
                value={this.state.textBox}
                onChange={this.handleTextBoxChange}
                onFocus={this.props.resetMessgeNotification}
                onKeyDown={this.handleKeyDown}
                style={{ width: inputW }}
              />
            </div>
            <div className="Chat-send-item"><button className="sendButton" disabled={this.state.buttonDisabled} onClick={this.onSubmit}><SendIcon disabled={this.state.buttonDisabled} /></button></div>
          </div>

        </div>
        {/* <button className="sendButton standardButton primary">send</button> */}
        <Messages isMobile={true} messages={this.props.messages} addUserMessage={this.props.addMessage} />

      </div>
    );
  }

  getMobileButtons = () => {
    return (
      // null
      <div className="center-buttons chat-buttons">
        <button className="standardButton primary" onClick={this.onHide}>close</button>
        {/* <button className="standardButton primary" disabled={this.state.buttonDisabled} onClick={this.onSubmit}>send</button> */}
      </div>
    )
  }

  getFrame = () => {
    const { ui, menu } = this.props;
    var users = [];
    if (this.props.users) {
      users = this.props.users;
    }
    const { userHover } = this.state;

    // headerH+bufferH*2+cbarH + usersH

    const frW = 300;

    let minY = ui.edgeSpacing * 2 + ui.toolbarH + 120;
    const h = Math.min(ui.contentH - minY - ui.toolbarH, 800);
    const y = ui.height - h - ui.edgeSpacing - ui.toolbarH;

    return (
      <Frame title="chat" bounded={true} isHidden={menu.isChatHidden} onHide={this.props.hideChat} windowStyle={{ background: "rgba(0, 0, 0, .9)" }} content={

        <div className="Chat">

          <div className="Chat-messages" style={{ display: "flex", flexDirection: "column", height: h }}>
            <Messages isMobile={false} messages={this.props.messages} addUserMessage={this.props.addMessage} />
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
                    ref={(input) => { this.textInput = input; }}
                  />
                </div>
                {/* <button className="standardButton form-item blueOutline" disabled={this.state.buttonDisabled} onClick={this.onSubmit}><SendIcon disabled={this.state.buttonDisabled} /></button>*/}
              </div>
            </div>

          </div>
        </div>
      }
        width={frW} height={h} x={ui.width - frW - ui.edgeSpacing} y={y} z={1000}
      />
    );
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.getIsHidden(prevProps) && !this.getIsHidden(this.props)) {
  //       // console.log("FOCUS", this.textInput)
  //       // if (this.textInput) 
  //         // this.textInput.focus();
  //       // else
  //       //   console.log("nope")
  //     }
  //   }

}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    room: state.user.room,
    messages: state.messages,
    userActiveChat: state.userActiveChat,
    userHoverChat: state.userHoverChat,
    ui: state.ui,
    menu: state.menu
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
    setSong,
    setRandomSong,
    setOneMenu
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Chat);
