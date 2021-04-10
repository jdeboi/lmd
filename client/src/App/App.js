import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";

import './App.css';

import Cookies from 'js-cookie';
import socket from "../components/shared/Socket/Socket";

// shared components
import Header from '../components/shared/Header/Header';
import MobileFooter from '../components/shared/Header/MobileFooter/MobileFooter';
import Chat from '../components/shared/Chat/Chat';
import YouTube from '../components/shared/LiveStream/YouTube';
import ReactAudioPlayer from 'react-audio-player';

// import FPSStats from "react-fps-stats";

// store
import { connect } from 'react-redux';
import { loadingApp, resizeApp, startComposition } from '../store/actions';
import { hideMenus, setOneMenu, showSignIn, setGalleryActive } from '../store/actions/menuItems';
import { setUserRoom, setUser, moveUser, setWine } from '../store/actions/user';
import { addMessage, addMessageNotification } from '../store/actions/messages';

// menu frames
import SignIn from '../components/shared/SignIn/SignIn';
import Welcome from '../components/shared/Welcome/Welcome';
import FAQFrame from '../components/shared/FAQ/FAQFrame';
// import Volume from '../components/shared/Volume/Volume';
import RoomDecal from '../components/shared/RoomDecal/RoomDecal';

// sketches
import { sketches, getUrl } from '../components/sketches/Sketches';
import Gallery from '../components/sketches/Gallery/Gallery';
import MacbookAir from '../components/sketches/MacbookAir/MacbookAir';
import JungleGyms from '../components/sketches/JungleGyms/JungleGyms';
import HardDrives from '../components/sketches/HardDrives/HardDrivesOG';
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
import ClickMe from '../components/sketches/ClickMe/ClickMe';

// pages
import About from '../components/pages/About';
import Statement from '../components/pages/Statement';
import Credits from '../components/pages/Credits';
import NotFound from '../components/pages/NotFound';

// utilities
import RegisterDesktop from '../components/utilities/RegisterDesktop/RegisterDesktop';
import UnregisterDesktop from '../components/utilities/RegisterDesktop/UnregisterDesktop';
import ViewUsers from '../components/utilities/ViewUsers/ViewUsers';
import PanGallery from '../components/utilities/PanGallery/PanGallery';
import ScrollSketches from '../components/utilities/ScrollSketches/ScrollSketches';
import Projection from '../components/utilities/Projection/Projection';

// users
import { djLocation, wineLocation, hostBotLocation } from '../components/sketches/Gallery/constants';


const DEBUG = true;
window.AWS = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";


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
      roomCount: { "flush": 0, "click-me-baby": 0, "macbook-air": 0, "hard-drives-on-seashores": 0, "wet-streams": 0, "jungle-gyms": 0, "cloud-confessional": 0, "esc-to-mars": 0, "xfinity-depths": 0, "wasted-days": 0, "home-page": 0, "gallery": 0, "blind-eye": 0 }
    };

    this.isClosed = true;
    this.isMenuOn = false;
  }


  componentDidMount() {
    this.socketSetup();
    const hasAvatar = Cookies.get('hasAvatar');

    // this.props.router.setRouteLeaveHook(this.props.route, this.onLeave); 

    if (hasAvatar) {
      const userName = Cookies.get('userName');
      const avatar = Cookies.get('avatar');

      const room = this.getRoom(this.props.location.pathname);
      this.props.setUser(userName, avatar);
      this.props.setUserRoom(room);
      this.setState({ hasAvatar: true, showWelcome: false }); // false
      // this.props.setGalleryActive();
    }
    else {
      this.setState({ hasAvatar: false, showWelcome: true });
    }



    window.addEventListener("resize", this.updateDeviceDimensions);
    window.addEventListener("keydown", this.handleKeyPress);

    // this.unlisten = this.props.history.listen((location, action) => this.pageChange(location));
    this.props.loadingApp();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDeviceDimensions);
    window.removeEventListener("keydown", this.handleKeyPress);
    // this.unlisten();
  }


  componentDidUpdate(prevProps) {
    if (this.state.usersChange)
      this.setState({ usersChange: false });

    if (this.props.location.pathname !== prevProps.location.pathname)
      this.pageChange();
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      const { user } = this.props;
      const { hasLoadedRoom } = this.state;
      if (!hasLoadedRoom && user.room !== "gallery") {
        this.setState({ hasLoadedRoom: true });
        this.props.startComposition();
      }
    }
  }

  pageChange = () => {
    let newPath = this.props.location.pathname;
    // console.log("PAGE CHANGE", newPath)
    this.props.hideMenus();
    const nextRoom = this.getRoom(newPath);
    if (nextRoom !== this.props.user.room) {
      this.props.loadingApp();
      this.setState({ hasLoadedRoom: false });
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
        return user.id !== sessionID;
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
      // const user = { ...this.props.user };
      this.setState({ usersChange: true });
      // console.log(data)
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
        if (room in roomCount)
          roomCount[room]++;
      }
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
    if (!this.state.showWelcome) {
      this.setState({ showSignIn: true });
      this.props.showSignIn();
    }
  }

  userNewRoom = (room) => {
    // alert("door!");
    this.props.history.push(room);
    this.props.setUserRoom(room);
  }


  getRoom = (path) => {
    var rm = path.substring(1, path.length);

    if (rm === "") rm = "gallery";
    else if (rm === "confessions") rm = "cloud-confessional";

    const pages = sketches.map((sketch) => sketch.link);
    pages.push("gallery");
    pages.push("gallerytest");
    const pages2 = ["statement", "thesis", "bio", "about", "credits"];
    if (!pages.includes(rm) && !pages2.includes(rm)) rm = "";

    return rm;
  }

  getRoomTitle = (path) => {
    var rm = this.getRoom(path);
    rm = rm.replace(/-/g, ' ');
    return rm;
  }


  closeWelcome = () => {
    this.setState({ showWelcome: false, hasAvatar: true, hasLoadedRoom: true })
    // this.props.setGalleryActive();
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

  startMedia = () => {
    // console.log("starting media");
    if (this.props.music.hasAudio && this.audioPlayer) {
      // if (this.audioPlayer.audioEl) 
      // this.audioPlayer.audioEl.play();
    }
    this.setState({ hasLoadedRoom: true });
  }

  render() {

    const { ui, music, user } = this.props;
    const appHeaderClass = "App-Header" + (ui.isMobile || ui.hasFooter ? " mobile" : "");
    const currentPage = this.getRoomTitle(this.props.location.pathname);

    return (
      <div className={this.getStringClasses()}>
        <div className={appHeaderClass}>
          <div className="BackHeader"></div>
          <Header currentPage={currentPage} user={this.props.user} avatarClicked={this.avatarClicked} isClosed={this.isClosed} isMenuOn={this.isMenuOn} />
        </div>
        <div className="App-Content inner-outline" onMouseMove={this.handleMouseMove}>
          <Switch>
            <Route exact path="/" render={() => (<Gallery users={this.state.users} userNewRoom={this.userNewRoom} roomCount={this.state.roomCount} showDock={this.state.showDock} isClosed={this.isClosed} />)} />

            {/* Sketches */}
            <Route exact path={getUrl("mac")} render={() => (<MacbookAir />)} />
            <Route exact path={getUrl("jung")} render={() => (<JungleGyms />)} />
            <Route exact path={getUrl("hard")} render={() => (<HardDrives />)} />
            <Route exact path={getUrl("wasted")} render={() => (<Wasted />)} />
            <Route exact path={getUrl("esc")} render={() => (<Mars addClass={this.addClass} removeClass={this.removeClass} />)} />
            <Route exact path={getUrl("wet")} render={() => (<WetStreams />)} />
            <Route exact path={getUrl("xfin")} render={() => (<Xfinity />)} />
            <Route exact path={getUrl("cloud")} render={() => (<Confessional cursor={this.state.cursorID} />)} />
            <Route exact path="/confessions" render={() => (<Confessions />)} />
            <Route exact path={getUrl("flush")} render={() => (<Flush />)} />
            <Route exact path={getUrl("home")} render={() => (<Oogle />)} />
            <Route exact path={getUrl("blind")} render={() => (<Blinds />)} />
            <Route exact path={getUrl("yose")} component={Yosemite} />
            <Route exact path={getUrl("click")} render={() => (<ClickMe addClass={this.addClass} removeClass={this.removeClass} />)} />

            {/* Pages */}
            <Route exact path="/about" render={() => (<About ui={this.props.ui} />)} />
            <Route exact path="/statement" render={() => (<Statement ui={this.props.ui} />)} />
            <Route exact path="/credits" render={() => (<Credits ui={this.props.ui} />)} />

            {/* Utilities */}
            <Route exact path="/gallerytest" render={() => (<Gallery users={this.state.users} userNewRoom={this.userNewRoom} roomCount={this.state.roomCount} showDock={this.state.showDock} isClosed={false} />)} />
            <Route exact path="/register" render={() => (<RegisterDesktop />)} />
            <Route exact path="/unregister" render={() => (<UnregisterDesktop />)} />
            <Route exact path="/viewusers" render={() => <ViewUsers users={this.state.users} />} />
            <Route exact path="/pangallery" render={() => <PanGallery users={this.state.users} roomCount={this.state.roomCount} />} />
            <Route exact path="/scroll" render={() => <ScrollSketches addClass={this.addClass} removeClass={this.removeClass} />} />
            <Route exact path="/projection" render={() => <Projection addClass={this.addClass} removeClass={this.removeClass} users={this.state.users} roomCount={this.state.roomCount} />} />

            {/* catch all */}
            <Route path="*" component={NotFound} />
          </Switch>

        </div>
        {/* {<FPSStats top={window.innerHeight - 255} left={10} />} */}
        <Chat users={this.state.users} usersChange={this.state.usersChange} />
        {/* <Volume /> */}
        <FAQFrame />
        <SignIn hasAvatar={this.state.hasAvatar} showSignIn={this.state.showSignIn} isFrame={true} />
        <RoomDecal startMedia={this.startMedia} hasLoadedRoom={this.state.hasLoadedRoom} users={this.state.users} />
        <Welcome isClosed={this.isClosed} user={this.props.user} hasAvatar={this.state.hasAvatar} showWelcome={this.state.showWelcome} closeWelcome={this.closeWelcome} />
        <MobileFooter currentPage={currentPage} user={this.props.user} avatarClicked={this.avatarClicked} />
        <YouTube />
        { user.comp === null && ((currentPage === "gallery" && !this.state.showWelcome) ||
          ui.compositionStarted) ?
          <ReactAudioPlayer
            src={music.currentSongTitle}
            autoPlay={true}
            volume={music.isMuted?0:music.volume}
            controls={false}
            loop={true}
            ref={player => {
              this.audioPlayer = player;
            }}
          /> : null
        }
      </div>
    );
  }


}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    ui: state.ui,
    music: state.music
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
    setOneMenu,
    startComposition,
    showSignIn,
    setGalleryActive
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(App));
