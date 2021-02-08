import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";

// import update from 'react-addons-update';
import update from 'immutability-helper';

import './App.css';
import Header from '../components/shared/Header/Header';
// import SideBar from '../components/shared/SideBar/SideBar';
import Chat from '../components/shared/Chat/Chat';
// import Dock from '../components/shared/Dock/Dock';

import {sketches, getUrl} from '../components/sketches/Sketches';

// cookies
import Cookies from 'js-cookie';

// store
import { connect } from 'react-redux';
import { loadingApp, resizeApp } from '../store/actions';
import { hideMenus, setOneMenu } from '../store/actions/menuItems';
import { setUserRoom, setUser, moveUser, setWine } from '../store/actions/user';
import { addMessage, addMessageNotification } from '../store/actions/messages';

// sketches
import Gallery from '../components/sketches/Gallery/Gallery';
import MacbookAir from '../components/sketches/MacbookAir/MacbookAir';
import JungleGyms from '../components/sketches/JungleGyms/JungleGyms';
import HardDrives from '../components/sketches/HardDrives/HardDrives';
import Wasted from '../components/sketches/Wasted/Wasted';
import Mars from '../components/sketches/Mars/Mars';
import WetStreams from '../components/sketches/WetStreams/WetStreams';
import Confessional from '../components/sketches/Confessional/Confessional';
import Confessions from '../components/sketches/Confessional/Confessions';
import Xfinity from '../components/sketches/Xfinity/Xfinity';
import Flush from '../components/sketches/Flush/Flush';
import Oogle from '../components/sketches/Oogle/Oogle';
import Yosemite from '../components/sketches/Yosemite/Yosemite';
import Blinds from '../components/sketches/Blinds/Blinds';
import Dinner from '../components/sketches/Dinner/Dinner';

// under construction
// import Altar from '../components/sketches/Test/Altar/Altar';

// import Three from '../components/sketches/Test/Three/Three';
// import Dimension from '../components/sketches/Dimension/Dimension';

// 
import Dig from '../components/sketches/Test/Dig/Dig';
import ClickMe from '../components/sketches/ClickMe/ClickMe';
import MoonLight from '../components/sketches/Test/MoonLight/MoonLight';

// pages
import About from '../components/pages/About';
import Statement from '../components/pages/Statement';
import Credits from '../components/pages/Credits';
import NotFound from '../components/pages/NotFound';

// menu frames
import SignIn from '../components/shared/SignIn/SignIn';
// import Participants from '../components/shared/Participants/Participants';
import Welcome from '../components/shared/Welcome/Welcome';
import FAQFrame from '../components/shared/FAQ/FAQFrame';
import Volume from '../components/shared/Volume/Volume';
import RoomDecal from '../components/shared/RoomDecal/RoomDecal';

import MobileFooter from '../components/shared/Header/MobileFooter/MobileFooter';
// import RoomUsers from '../components/shared/RoomUsers/RoomUsers';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
// import CssBaseline from '@material-ui/core/CssBaseline';


import socket from "../components/shared/Socket/Socket";

import FPSStats from "react-fps-stats";

import Exit from '../components/shared/Exit/Exit';

// import { userNearWine } from './Helpers/Boundaries';
import { djLocation, wineLocation, hostBotLocation } from '../components/sketches/Gallery/constants';



import dogicaFont from './assets/fonts/dogica.ttf';

const DEBUG = true;

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
      classes: ["App"],
      showSideBar: false,
      hasAvatar: false,
      showSignIn: false,
      showWelcome: false,
      showDock: true,
      sessionID: null,
      usersChange: false,
      users: [],
      hasLoadedRoom: false,
      // userAxctiveChat: null,
      roomCount: { "macbook-air": 0, "hard-drives-on-seashores": 0, "wet-streams": 0, "jungle-gyms": 0, "cloud-confessional": 0, "esc-to-mars": 0, "xfinity-depths": 0, "wasted-days": 0, "home-page": 0, "gallery": 0, "blind-eye": 0 }
    };


  }


  componentDidMount() {
    // const id = Cookies.get('hand');
    this.socketSetup();
    const hasAvatar = Cookies.get('hasAvatar');

    if (hasAvatar) {
      const userName = Cookies.get('userName');
      const avatar = Cookies.get('avatar');
      // const user= {...this.props.user};
      // user.userName = userName;
      // user.avatar = avatar;
      const room = this.getRoom();
      this.props.setUser(userName, avatar);
      this.props.setUserRoom(room);
      this.setState({ hasAvatar: true, showWelcome: false }); // false
    }
    else {
      this.setState({ hasAvatar: false, showWelcome: true });
    }


    window.addEventListener("resize", this.updateDeviceDimensions);

    this.unlisten = this.props.history.listen((location, action) => this.pageChange(location));
    this.props.loadingApp();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDeviceDimensions);
    // this.socket.disconnect();
    this.unlisten();
  }


  componentDidUpdate() {
    if (this.state.usersChange) this.setState({ usersChange: false })
  }


  pageChange = (location) => {



    this.props.hideMenus();
    // this.props.setOneMenu(null);
    const nextRoom = this.getRoom(location.pathname);
    if (nextRoom != this.props.user.room) {
      this.props.loadingApp();
      this.setState({hasLoadedRoom: false});
    }
    this.props.setUserRoom(nextRoom);
  }

  toggleSideBar = () => {
    // if (DEBUG) console.log("TOGGLED");
    this.setState(prevState => ({
      showSideBar: !prevState.showSideBar
    }));
  }

  handleDrawerClose = () => {
    // if (DEBUG) console.log("CLOSED")
    this.setState({ showSideBar: false });
  }

  updateDeviceDimensions = () => {
    // console.log("resizing");
    this.props.resizeApp(window.innerWidth, window.innerHeight);
  }

  addClass = (classn) => {
    let classes = [...this.state.classes];
    classes.push(classn);
    this.setState({ classes });
    //" " + this.state.cursor
  }

  removeClass = (classn) => {
    let classes = [...this.state.classes];
    let indexOfClass = classes.indexOf(classn);
    if (indexOfClass > -1) {
      classes.splice(indexOfClass, 1);
      this.setState({ classes });
    }
  }

  //////////////////////////////////////////////////////////
  // USERS
  socketSetup = () => {

    socket.on('connect', () => {
      const user = this.props.user;
      this.setState({ sessionID: socket.id });
      // if (DEBUG) console.log("SETUP SOCKET, SET", user);
      // socket.emit("setUser", user);
      socket.emit("joinRoom", user.room);
      // this.props.setUser()
      this.addBots();
    });


    socket.on("usersUpdate", data => {
      var { sessionID } = this.state;
      var filteredArray = data.filter(function (user) {
        return user.id != sessionID;
      });
      this.setRoomCount();
      // if (DEBUG) console.log("USERS UPDATED", data);
      this.setState({ users: filteredArray });
    });

    socket.on("message", data => {
      // console.log("message received", data);
      const message = { ...data }
      const user = { ...this.props.user };
      if (message.to === user.room) {
        message.to = "room"
      }
      else if (message.to !== "all") {
        message.to = "me";
      }
      message.from = this.getUserNameById(message.from);
      // this.addUserMessage(message);
      this.props.addMessage(message);
      this.props.addMessageNotification();
    })

    socket.on("userJoined", data => {
      const user = { ...this.props.user };
      this.setState({ usersChange: true });
      // console.log("SOMEONE JOINED");
    })

    socket.on("userDisconnected", data => {
      this.setState({ usersChange: true });
      // socket.emit("leaveRoom", user.room); // not sure if we need this?
      // console.log("SOMEONE DISCONNECTED");
    })
  }

  addBots = () => {
    const hostBot = { x: hostBotLocation.x, y: hostBotLocation.y, room: "gallery", avatar: "😷", userName: "hostBot", id: 4 };
    const cheeseBot = { x: wineLocation[0].x - 100, y: wineLocation[0].y + 80, avatar: "🤖", room: "gallery", userName: "cheeseBot", id: 0 };
    const wineBot = { x: wineLocation[1].x + 120, y: wineLocation[1].y + 50, avatar: "🤖", room: "gallery", userName: "wineBot", id: 1 };
    const cocktailBot = { x: wineLocation[2].x + 120, y: wineLocation[2].y + 50, avatar: "🤖", room: "gallery", userName: "cocktailBot", id: 2 };
    const dj = { x: djLocation.x + 100, y: djLocation.y - 30, room: "gallery", avatar: "🎧", userName: "DJ", id: 3 };
    socket.emit("setBot", cheeseBot);
    socket.emit("setBot", wineBot);
    socket.emit("setBot", cocktailBot);
    socket.emit("setBot", dj);
    socket.emit("setBot", hostBot);
  }


  setRoomCount = () => {
    const roomCount = { ...this.state.roomCount };
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
      this.setState({ roomCount })
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
    if (DEBUG) console.log("SHOW AV")
    if (!this.state.showWelcome) this.setState({ showSignIn: true });
  }

  userNewRoom = (room) => {
    // alert("door!");
    this.props.history.push(room);
    this.props.setUserRoom(room);
  }

  // userSetRoom = (location, action) => {
    
  // }

  getRoom = (path = this.props.location.pathname) => {
    var rm = path.substring(1, path.length);

    if (rm == "") rm = "gallery";
    else if (rm == "confessions") rm = "cloud-confessional";

    const pages = sketches.map((sketch) => sketch.link);
    pages.push("gallery");
    const pages2 = ["statement", "thesis", "bio", "about", "credits"];
    if (!pages.includes(rm) && !pages2.includes(rm)) rm = "";

    return rm;
  }

  getRoomTitle = () => {
    var rm = this.getRoom();
    rm = rm.replace(/-/g, ' ');
    return rm;
  }

  closeSignIn = () => {
    this.setState({ showSignIn: false })
  }

  closeWelcome = () => {
    this.setState({ showWelcome: false, hasAvatar: true })
  }

  getStringClasses = () => {
    var str = "";
    for (const classn of this.state.classes) {
      str += classn + " ";
    }
    str = str.substring(0, str.length - 1);
    return str;
  }

  handleMouseMove = e => {
    let showDock = this.state.showDock;
    if (showDock) {
      if (e.clientY < window.innerHeight - 100) {
        this.setState({ showDock: false });
      }
    }
    else if (e.clientY > window.innerHeight - 25) {
      this.setState({ showDock: true });
    }
  };

  render() {
    // const counter = useSelector(state => state.counterReducer);
    // console.log(counter);
    const { ui } = this.props;

    const appHeaderClass = "App-Header" + (ui.isMobile || ui.hasFooter ? " mobile" : "");

    return (
      <div className={this.getStringClasses()}>
        <MuiThemeProvider theme={theme}>
          {/* <CssBaseline />*/}
          <div className={appHeaderClass}>
            <div className="BackHeader"></div>
            <Header currentPage={this.getRoomTitle()} user={this.props.user} avatarClicked={this.avatarClicked} />
          </div>
          <div className="App-Content inner-outline" onMouseMove={this.handleMouseMove}>
            <Switch>
              <Route exact path="/" render={() => (<Gallery users={this.state.users} userNewRoom={this.userNewRoom} roomCount={this.state.roomCount} showDock={this.state.showDock} />)} />
              <Route path={getUrl("mac")} render={() => (<MacbookAir />)} />
              <Route path={getUrl("jung")} render={() => (<JungleGyms />)} />
              <Route path={getUrl("hard")} render={() => (<HardDrives />)} />
              <Route path={getUrl("wasted")} render={() => (<Wasted />)} />
              <Route path={getUrl("esc")} render={() => (<Mars addClass={this.addClass} removeClass={this.removeClass} />)} />
              <Route path={getUrl("wet")} render={() => (<WetStreams />)} />
              <Route path={getUrl("xfin")} render={() => (<Xfinity />)} />
              <Route path={getUrl("cloud")} render={() => (<Confessional cursor={this.state.cursorID} />)} />
              <Route path="/confessions" render={() => (<Confessions />)} />
              <Route path={getUrl("flush")} render={() => (<Flush />)} />
              <Route path={getUrl("home")} render={() => (<Oogle />)} />
              <Route path={getUrl("blind")} render={() => (<Blinds />)} />
              <Route path={getUrl("yose")} component={Yosemite} />
              <Route path={getUrl("click")} component={ClickMe} />

              <Route path="/dig" render={() => (<Dig addClass={this.addClass} />)} />
              {<Route path="/moon-light" component={MoonLight} />}
              {<Route path="/click-me" component={ClickMe} />}
              <Route path={"/dinner"} component={Dinner} />
              {/*<Route  path="/three" component={Three} />*/}

              <Route path="/about" render={() => (<About ui={this.props.ui} />)} />
              <Route path="/statement" render={() => (<Statement ui={this.props.ui} />)} />
              <Route path="/credits" render={() => (<Credits ui={this.props.ui} />)} />

              <Route component={NotFound} />
            </Switch>

          </div>
          {/* {<FPSStats top={window.innerHeight - 255} left={10} />} */}
          {/* <Exit /> */}
          {/* <SideBar room={this.state.user.room} user={this.state.user} users={this.state.users} usersChange={this.state.usersChange} showSideBar={this.state.showSideBar} handleDrawerClose={this.handleDrawerClose.bind(this)} messages={this.state.messages} addUserMessage={this.addUserMessage} userActiveChat={this.state.userActiveChat} userSetActiveChat={this.userSetActiveChat}  />*/}
          <Chat users={this.state.users} usersChange={this.state.usersChange} />
          {/* <Participants users={this.state.users} /> */}
          <Volume />
          {/* <RoomUsers users={this.state.users} /> */}
          <FAQFrame />
          <SignIn hasAvatar={this.state.hasAvatar} showSignIn={this.state.showSignIn} closeSignIn={this.closeSignIn} isFrame={true} />
          <RoomDecal hasLoadedRoom={this.state.hasLoadedRoom} users={this.state.users} onHide={() => this.setState({hasLoadedRoom: true})} />
          <Welcome user={this.props.user} hasAvatar={this.state.hasAvatar} showWelcome={this.state.showWelcome} closeWelcome={this.closeWelcome} />
          {/* <Dock showDock={this.state.showDock} /> */}
          <MobileFooter currentPage={this.getRoomTitle()} user={this.props.user} avatarClicked={this.avatarClicked} />
        </MuiThemeProvider>
      </div>
    );
  }


}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    setUserRoom,
    setUser,
    moveUser,
    setWine,
    addMessage,
    addMessageNotification,
    resizeApp,
    loadingApp,
    hideMenus,
    setOneMenu
  }
}
//

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(App));
