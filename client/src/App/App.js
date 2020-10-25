import React from 'react';
import { Route, Switch, withRouter, useLocation } from "react-router-dom";

// import update from 'react-addons-update';
import update from 'immutability-helper';

import './App.css';
import Header from '../components/shared/Header/Header';
import SideBar from '../components/shared/SideBar/SideBar';

// cookies
import Cookies from 'js-cookie';

// sketches
import HomePage from '../components/sketches/HomePage/HomePage';
import MacbookAir from '../components/sketches/MacbookAir/MacbookAir';
import JungleGyms from '../components/sketches/JungleGyms/JungleGyms';
import HardDrives from '../components/sketches/HardDrives/HardDrives';
import Spacetimes from '../components/sketches/Spacetimes/Spacetimes';
import Mars from '../components/sketches/Mars/Mars';
import WetStreams from '../components/sketches/WetStreams/WetStreams';
import WaveForms from '../components/sketches/WaveForms/WaveForms';
import Confessions from '../components/sketches/WaveForms/Confessions';
import Loop from '../components/sketches/Loop/Loop';
import VorTech from '../components/sketches/VorTech/VorTech';
import Oogle from '../components/sketches/Oogle/Oogle';

// under construction
// import Altar from '../components/sketches/Test/Altar/Altar';

// import Three from '../components/sketches/Test/Three/Three';
// import Dimension from '../components/sketches/Dimension/Dimension';

import Dinner from '../components/sketches/Test/Dinner/Dinner';
import Dig from '../components/sketches/Test/Dig/Dig';
import Blinds from '../components/sketches/Blinds/Blinds';
import ClickMe from '../components/sketches/Test/ClickMe/ClickMe';
import MoonLight from '../components/sketches/Test/MoonLight/MoonLight';
import Yosemite from '../components/sketches/Test/Yosemite/Yosemite';

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
      user: {avatar:"", userName:"", room:"home", x: 0, y: 0, hasWine: null, needsWine: false},
      users: null,
      userActiveChat: null,
      messages: [],
      // room: "home",
      roomCount: {"macbook-air": 0, "hard-drives-on-seashores": 0, "wet-streams": 0, "jungle-gyms": 0, "cloud-confessional": 0, "esc-to-mars": 0, "xfinity-depths": 0, "wasted-days-are-days-wasted": 0, "home": 0}
    };

    this.wineLocation = [{x: 1050, y: -1300, w: 80, h: 150}, {x: -1350, y: -2450, w: 80, h: 150}];
    this.djLocation = {x: 800, y: -3000};
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
      user.room = this.getRoom(); //useLocation().pathname;

      if (socket.connected) {
        // user.room = "home";
        socket.emit("setUser", user);

        // ok, so issue is that App mounts after subcomponent, overriding the room
      }
      this.setState({user, showSignIn: false, hasAvatar: true});
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
      // user.room = "home"
      // console.log("CONNECTED", socket.id, "in room", this.state.room);
      this.setState({sessionID: socket.id});

      socket.emit("setUser", user);
      socket.emit("joinRoom", user.room);

      this.addBots();
    });


    socket.on("usersUpdate", data => {
      var {sessionID} = this.state;
      var filteredArray = data.filter(function(user){
        return user.id != sessionID;
      });
      this.setRoomCount();
      // console.log("USERS", filteredArray, sessionID )
      this.setState({users: filteredArray});
    });

    socket.on("message", data => {
      // console.log("message received", data);
      const message = {...data}
      const user = {...this.state.user};
      if (message.to === user.room) {
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
    const wineBot0 = {x: this.wineLocation[0].x +120, y: this.wineLocation[0].y+50, avatar: "🤖", room:"home", userName:"wineBot", id:0};
    const wineBot1 = {x: this.wineLocation[1].x +120, y: this.wineLocation[1].y+50, avatar: "🤖", room:"home", userName:"wineBot", id:1};
    const dj = {x: this.djLocation.x, y: this.djLocation.y, avatar: "🤖", userName:"DJ", id: 2};
    // const hostBot = {x: 300, y: 600, avatar: "🤖", room:"home", userName:"hostBot", id:1}
    socket.emit("setBot", wineBot0);
    socket.emit("setBot", wineBot1);
    socket.emit("setBot", dj);
    // socket.emit("setBot", hostBot);
  }

  addWine = () => {
    const user = { ...this.state.user }
    user.needsWine = true;
    if (userNearWine(user, this.wineLocation[0]) || userNearWine(user, this.wineLocation[1])) {
      user.needsWine = false;
      user.hasWine = new Date();
    }
    this.setState({user});
    socket.emit("setUser", user);
  }

  setRoomCount = () => {
    const roomCount = {...this.state.roomCount};
    // reset it
    for (var key in roomCount) {
      if (roomCount.hasOwnProperty(key)) {
        roomCount[key] = 0;
      }
    }
    if (this.state.users) {
      for (const usr of this.state.users) {
        var room = usr.room;
        if (room in roomCount) roomCount[room]++;
      }
      // console.log("OK", roomCount, this.state.users);
      this.setState({roomCount})
    }

  }

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
    if ((userNearWine(user, this.wineLocation[0]) || userNearWine(user, this.wineLocation[1])) && user.needsWine) {
      user.needsWine = false;
      user.hasWine = new Date();
    }
    this.setState({user});
    socket.emit("setUser", user);
  }


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
    // alert("door!");
    this.props.history.push(room);
  }

  getRoom = () => {
    const path = this.props.location.pathname;
    var rm = path.substring(1, path.length);

    if (rm == "") rm = "home-page";
    else if (rm == "confessions") rm = "cloud-confessional";

    const pages = ["home-page","macbook-air", "wet-streams","hard-drives-on-seashores","blind-spot","cloud-confessional", "xfinity-depths", "esc-to-mars", "jungle-gyms"];
    if (!pages.includes(rm)) rm = "";

    return rm;
  }

  userSetRoom = () => {
    // const user = {...this.state.user}
    // user.room = room;
    const user = {...this.state.user};
    user.room = this.getRoom();
    // console.log("user room was", user.room);
    // user.room = room;
    socket.emit("setUser", user);
    socket.emit("joinRoom", user.room);
    // console.log("user room to", user.room);
    this.setState({user});
    // console.log("usr", this.state.user);
  }

  userLeaveRoom = () => {
    socket.emit("leaveRoom", this.state.user.room);
    // this.setState({room: "home"}, () => {
    //   const user = {...this.state.user};
    //   user.room = this.state.room;
    //   socket.emit("setUser", user);
    //   socket.emit("joinRoom", room);
    // });
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
    // console.log("app", this.state.user.room);
    return (
      <div className={this.getStringClasses()}>
        <MuiThemeProvider theme={theme}>
          {/* <CssBaseline />*/}
          <div className="App-Header">
            <div className="BackHeader"></div>
            <Header dimensions={dimensions} currentPage={this.state.user.room} toggleSideBar={this.toggleSideBar} user={this.state.user} userSet={this.userSet} avatarClicked={this.avatarClicked} />
          </div>
          <div className="App-Content inner-outline">
            <Switch>
              <Route exact path="/" render={() => (<HomePage dimensions={dimensions} user={this.state.user} users={this.state.users} userMove={this.userMove} userNewRoom={this.userNewRoom} userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} userSetActiveChat={this.userSetActiveChat} wineLocation={this.wineLocation} djLocation={this.djLocation} roomCount={this.state.roomCount} />)} />
              <Route  path="/macbook-air" render={() => (<MacbookAir dimensions={dimensions} userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/jungle-gyms" render={() => (<JungleGyms userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/hard-drives-on-seashores" render={() => (<HardDrives userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)}  />
              <Route  path="/wasted-days-are-days-wasted" render={() => (<Spacetimes dimensions={dimensions} userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/esc-to-mars" render={() => (<Mars addClass={this.addClass} removeClass={this.removeClass} dimensions={dimensions} userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/wet-streams" render={() => (<WetStreams userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/xfinity-depths" render={() => (<Loop dimensions={dimensions} userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)}/>
              <Route  path="/cloud-confessional" render={() => (<WaveForms cursor={this.state.cursorID} userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/confessions" render={() => (<Confessions userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/flush" render={() => (<VorTech userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/house-view" render={() => (<Oogle userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/blind-eye" render={() => (<Blinds userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />

              <Route  path="/dig" render={() => (<Dig addClass={this.addClass} />)} />
              {<Route  path="/moon-light" component={MoonLight} />}
              <Route  path="/yosemite" component={Yosemite} />
              {/*<Route  path="/three" component={Three} />*/}
              <Route  path="/credits" render={() => (<Credits userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  path="/words" render={() => (<About userSetRoom={this.userSetRoom} userLeaveRoom={this.userLeaveRoom} />)} />
              <Route  component={NotFound} />
            </Switch>
            {/*<div id="fps">0</div> */}

          </div>
          {   <FPSStats top={window.innerHeight-55} left={10} />}
          <SideBar room={this.state.user.room} user={this.state.user} users={this.state.users} usersChange={this.state.usersChange} showSideBar={this.state.showSideBar} handleDrawerClose={this.handleDrawerClose.bind(this)} messages={this.state.messages} addUserMessage={this.addUserMessage} userActiveChat={this.state.userActiveChat} userSetActiveChat={this.userSetActiveChat} addWine={this.addWine} />
          <SignIn user={this.state.user} hasAvatar={this.state.hasAvatar} showSignIn={this.state.showSignIn} closeSignIn={this.closeSignIn.bind(this)} userUpdated={this.userUpdated} userSet={this.userSet} userRegisterCheck={this.userRegisterCheck} />
        </MuiThemeProvider>
      </div>
    );
  }


}
//

export default withRouter(App);
