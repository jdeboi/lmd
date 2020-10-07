import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";

// import update from 'react-addons-update';
import update from 'immutability-helper';

import './App.css';
import Header from '../components/shared/Header/Header';
import SideBar from '../components/shared/SideBar/SideBar';

// cookies
import Cookies from 'js-cookie';

// sketches
import HomePage from '../components/sketches/HomePage/HomePage';
import Dimension from '../components/sketches/Dimension/Dimension';
import MacbookAir from '../components/sketches/MacbookAir/MacbookAir';
import ClickMe from '../components/sketches/ClickMe/ClickMe';
import JungleGyms from '../components/sketches/JungleGyms/JungleGyms';
import HardDrives from '../components/sketches/HardDrives/HardDrives';
import Spacetimes from '../components/sketches/Spacetimes/Spacetimes';
import Mars from '../components/sketches/Mars/Mars';
import WetStreams from '../components/sketches/WetStreams/WetStreams';
import WaveForms from '../components/sketches/WaveForms/WaveForms';
import Confessions from '../components/sketches/WaveForms/Confessions';

// under construction
import Altar from '../components/sketches/Altar/Altar';
import MoonLight from '../components/sketches/MoonLight/MoonLight';
import Loop from '../components/sketches/Loop/Loop';
import Three from '../components/sketches/Three/Three';
import Dinner from '../components/sketches/Dinner/Dinner';
import Dig from '../components/sketches/Dig/Dig';

// pages
import About from '../components/pages/About';
import Credits from '../components/pages/Credits';
import NotFound from '../components/pages/NotFound';

import Frame from '../components/shared/Frame/Frame';
import SignIn from '../components/shared/SignIn/SignIn';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';


import socket from "../components/shared/Socket/Socket";

import FPSStats from "react-fps-stats";
import {userNearWine} from './Helpers/Boundaries';
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:5000";

import dogicaFont from './assets/fonts/dogica.ttf';

const dogica = {
  fontFamily: 'dogica',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
  local('dogica'),
  local('dogica-Regular'),
  url(${dogicaFont}) format('ttf')
  `,
  unicodeRange:
  'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

window.AWS = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: { main: indigo[300] },
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,

  },
  typography: {
    fontFamily: 'dogica, Arial',
    fontSize: 10,
  },
  overrides: {
    // MuiCssBaseline: {
    //   '@global': {
    //     '@font-face': [dogica],
    //   },
    // },
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cursor: 0,
      cursorID: 0,
      dimensions: {windowWidth: window.innerWidth, windowHeight: window.innerHeight, device:"desktop", flipped: false, orientation: "landscape"},
      wOG: window.innerWidth,
      hOG: window.innerHeight,
      classes: ["App"],
      showSideBar: false,
      hasAvatar: false,
      showSignIn: false,
      sessionID: null,
      usersChange: false,
      user: {avatar:"", userName:"", room:"", x: 0, y: 0, hasWine: null, needsWine: false},
      users: null,
      userActiveChat: null,
      messages: [],
      room: "home"
    };

    this.wineLocation = {x: -100, y: 50, w: 80, h: 150};
  }


  componentDidMount() {
    // const id = Cookies.get('hand');
    this.socketSetup();
    const hasAvatar = Cookies.get('hasAvatar');

    if (hasAvatar) {
      const userName = Cookies.get('userName');
      const avatar = Cookies.get('avatar');
      const user= {...this.state.user};
      user.userName = userName;
      user.avatar = avatar;
      this.setState({user, showSignIn: false, hasAvatar: true});

      if (socket.connected) {
        user.room = this.state.room;
        socket.emit("setUser", user);
      }
    }
    else {
      this.setState({showSignIn: true, hasAvatar: false});
    }


    this.updateDeviceDimensions();
    window.addEventListener("resize", this.updateDeviceDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDeviceDimensions);
    // this.socket.disconnect();
  }


  componentDidUpdate() {
    if (this.state.usersChange) this.setState({usersChange: false})
  }

  addUserMessage = (message) => {
    // const user = {...this.state.user};
    const messages = [...this.state.messages, message];
    // user.messages = messages;
    // var newUser = update(user, { messages:
    //   {$push: [msg]}
    // });

    // console.log("USER UDPATE", newUser);
    this.setState({messages});
  }

  toggleSideBar = () => {
    // console.log("TOGGLED");
    this.setState(prevState => ({
      showSideBar: !prevState.showSideBar
    }));
  }

  handleDrawerClose = () => {
    // console.log("CLOSED")
    this.setState({showSideBar: false});
  }

  updateDeviceDimensions = () => {
    var dimensions= {};
    // width, height
    dimensions.windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    dimensions.windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    // orientation and flipped
    let ratio = this.state.wOG/this.state.hOG;
    dimensions.flipped = false;
    if (dimensions.windowWidth/dimensions.windowHeight !== ratio) dimensions.flipped = true;
    dimensions.orientation = dimensions.windowWidth/dimensions.windowHeight > 1 ? "landscape":"portrait";

    // device type
    let minD = Math.min(dimensions.windowWidth, dimensions.windowHeight);
    // console.log("minD", minD, dimensions.windowWidth, dimensions.windowHeight);
    dimensions.device = "";
    if (minD < 450) dimensions.device="mobile";
    else if (minD <  700) dimensions.device="tablet";
    else dimensions.device="desktop";

    this.setState({dimensions: dimensions});
  }

  addClass = (classn) => {
    let classes = [...this.state.classes];
    classes.push(classn);
    this.setState({classes});
    //" " + this.state.cursor
  }

  removeClass = (classn) => {
    let classes = [...this.state.classes];
    let indexOfClass = classes.indexOf(classn);
    if (indexOfClass > -1) {
      classes.splice(indexOfClass, 1);
      this.setState({classes});
    }
  }

  //////////////////////////////////////////////////////////
  // USERS
  socketSetup = () => {

    socket.on('connect', () => {
      const user = {...this.state.user};
      user.room = this.state.room;
      // console.log("CONNECTED", socket.id, "in room", this.state.room);
      this.setState({sessionID: socket.id});

      socket.emit("setUser", user);
      socket.emit("joinRoom", this.state.room);

      this.addBots();
    });


    socket.on("usersUpdate", data => {
      var {sessionID} = this.state;
      var filteredArray = data.filter(function(user){
        return user.id != sessionID;
      });
      // console.log("USERS", filteredArray, sessionID )
      this.setState({users: filteredArray});
    });

    socket.on("message", data => {
      // console.log("message received", data);
      const message = {...data}
      if (message.to === this.state.room) {
        message.to = "room"
      }
      else if (message.to !== "all") {
        message.to = "me";
      }
      message.from = this.getUserNameById(message.from);
      this.addUserMessage(message);
    })

    socket.on("userJoined", data => {
      const user = {...this.state.user};
      this.setState({usersChange: true});
      // console.log("SOMEONE JOINED");
    })

    socket.on("userDisconnected", data => {
      this.setState({usersChange: true});
      // socket.emit("leaveRoom", user.room); // not sure if we need this?
      // console.log("SOMEONE DISCONNECTED");
    })
  }

  addBots = () => {
    const wineBot = {x: this.wineLocation.x -50, y: this.wineLocation.y+50, avatar: "🤖", room:"home", userName:"wineBot", id:0};
    // const hostBot = {x: 300, y: 600, avatar: "🤖", room:"home", userName:"hostBot", id:1}
    socket.emit("setBot", wineBot);
    // socket.emit("setBot", hostBot);
  }

  addWine = () => {
    const user = { ...this.state.user }
    user.needsWine = true;
    if (userNearWine(user, this.wineLocation)) {
      user.needsWine = false;
      user.hasWine = new Date();
    }
    this.setState({user});
    socket.emit("setUser", user);
  }

  // userNearWine = () => {
  //   // const wineLocation = this.wineLocation;
  //   const user = { ...this.state.user };
  //   var dx = user.x - (this.wineLocation.x+this.wineLocation.w/2);
  //   var dy = user.y - (this.wineLocation.y+this.wineLocation.h/2);
  //   var dis = Math.sqrt(dx*dx + dy*dy);
  //   // console.log("DIS", dis < 200);
  //   return dis < 200;
  // }

  getUserNameById = (id) => {
    const users = this.state.users;
    if (users) {
      let obj = users.find(o => o.id === id);
      if (obj) return obj.userName;
    }
    return "";
  }

  getAvatarById = (id) => {
    const users = this.state.users;
    if (users) {
      let obj = users.find(o => o.id === id);
      if (obj) return obj.avatar;
    }
    return "";
  }

  avatarClicked = () => {
    this.setState({showSignIn: true});
  }

  userSetActiveChat = (clickedUser) => {
    // const mx = event.mx;
    // const mouseX = mx-window.innerWidth;
    var userActiveChat = null;
    if (clickedUser) userActiveChat = {...clickedUser};
    this.setState({userActiveChat, showSideBar: true});
    // console.log("trying to set chat user", userActiveChat);
  }

  userUpdated = (avatar, userName) => {
    const newUser = { ...this.state.user }
    newUser.userName = userName;
    newUser.avatar = avatar;
    this.setState({user: newUser});
  }

  userMove = (x, y) => {
    const user = {...this.state.user};
    user.x = x;
    user.y = y;
    if (userNearWine(user, this.wineLocation) && user.needsWine) {
      user.needsWine = false;
      user.hasWine = new Date();
    }
    this.setState({user});
    socket.emit("setUser", user);
  }

  // userMove = (x, y, time) => {
  //   let space = 50;
  //   const user = { ...this.state.user }
  //   user.x += x*space;
  //   user.y += y*space;
  //   const room = doorCrossing({x: user.x, y: user.y}, this.doors);
  //   if (room) {
  //     alert("door!");
  //     this.props.history.push(room);
  //   }
  //   else if (boundaryCrossing({x: user.x, y: user.y}, this.centerPoints)) {
  //     // alert("boundary crossing");
  //   }
  //   else {
  //     if (this.userNearWine() && user.needsWine) {
  //         user.needsWine = false;
  //         user.hasWine = new Date();
  //     }
  //     // console.log("1", new Date() - time);
  //     this.setState({user});
  //     // console.log("dt", new Date() - time);
  //     // user.room = this.state.user;
  //     socket.emit("setUser", user);
  //   }
  //
  // }

  userSet = (userName, avatar) => {
    Cookies.set("hasAvatar", true);
    Cookies.set("avatar", avatar);
    Cookies.set("userName", userName);
    this.userUpdated(avatar, userName);

    // we have an avatar / username submitted
    // make sign in go away
    // let {hasAvatar, showSignIn} = this.state;
    // hasAvatar = true;
    // showSignIn = false;
    this.setState({hasAvatar:true, showSignIn:false});

    const user = {...this.state.user};
    user.room = this.state.room;
    socket.emit("setUser", user);
  }


  userRegister = ({isUser, user}) => {
    // console.log("user register!!!")
    if (isUser) {
      alert("username already exists. Please enter a new username.");
    }
    else {
      this.userSet(user.userName, user.avatar);
    }
  }

  userRegisterCheck = (userName, avatar) => {
    // console.log("userRegisterCheck");
    const userCheck={userName:userName, avatar:avatar};
    socket.emit("registerUser", userCheck, this.userRegister);
  }

  userNewRoom = (room) => {
    alert("door!");
    this.props.history.push(room);
  }

  userSetRoom = (room) => {
    // const user = {...this.state.user}
    // user.room = room;
    this.setState({room: room});
    socket.emit("joinRoom", room);
  }

  userLeaveRoom = (room) => {
    socket.emit("leaveRoom", room);
  }
  // usersChangeReset() {
  //   this.setState({usersChange: false});
  // }

  closeSignIn = () => {
    this.setState({showSignIn: false})
  }

  getStringClasses = () => {
    var str = "";
    for (const classn of this.state.classes) {
      str += classn + " ";
    }
    str = str.substring(0, str.length-1);
    return str;
  }

  render() {
    const {dimensions} = this.state;
    return (
      <div className={this.getStringClasses()}>
        <MuiThemeProvider theme={theme}>
          {/* <CssBaseline />*/}
          <div className="App-Header">
            <div className="BackHeader"></div>
            <Header dimensions={dimensions} toggleSideBar={this.toggleSideBar} user={this.state.user} userSet={this.userSet} avatarClicked={this.avatarClicked} />
          </div>
          <div className="App-Content inner-outline">
            <Switch>
              <Route exact path="/" render={() => (<HomePage dimensions={dimensions} user={this.state.user} users={this.state.users} userMove={this.userMove} userNewRoom={this.userNewRoom} userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} userSetActiveChat={this.userSetActiveChat} wineLocation={this.wineLocation} />)} />
              <Route  path="/macbook-air" render={() => (<MacbookAir dimensions={dimensions} userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/jungle-gyms" render={() => (<JungleGyms userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/hard-drives-on-seashores"      render={() => (<HardDrives userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)}  />
              <Route  path="/wasted-days-are-days-wasted"   render={() => (<Spacetimes dimensions={dimensions} userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/esc-to-mars" render={() => (<Mars addClass={this.addClass} removeClass={this.removeClass} dimensions={dimensions} userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/wet-streams" render={() => (<WetStreams userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/xfinity-depths" render={() => (<Loop dimensions={dimensions} userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)}/>
              <Route  path="/cloud-confessional" render={() => (<WaveForms cursor={this.state.cursorID} userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/confessions" render={() => (<Confessions userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />

              <Route  path="/dig" render={() => (<Dig addClass={this.addClass} />)} />
              <Route  path="/moon-light" component={MoonLight} />
              <Route  path="/three" component={Three} />

              <Route  path="/credits" render={() => (<Credits userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/words" render={() => (<About userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  component={NotFound} />
            </Switch>
            {/*<div id="fps">0</div> */}
            <FPSStats top={window.innerHeight-55} left={10} />
          </div>
          <SideBar room={this.state.room} user={this.state.user} users={this.state.users} usersChange={this.state.usersChange} showSideBar={this.state.showSideBar} handleDrawerClose={this.handleDrawerClose.bind(this)} messages={this.state.messages} addUserMessage={this.addUserMessage} userActiveChat={this.state.userActiveChat} userSetActiveChat={this.userSetActiveChat} addWine={this.addWine} />
          <SignIn user={this.state.user} hasAvatar={this.state.hasAvatar} showSignIn={this.state.showSignIn} closeSignIn={this.closeSignIn.bind(this)} userUpdated={this.userUpdated} userSet={this.userSet} userRegisterCheck={this.userRegisterCheck} />
        </MuiThemeProvider>
      </div>
    );
  }


}

export default withRouter(App);
