import React from 'react';
import { Route, Switch } from "react-router-dom";

// import update from 'react-addons-update';
import update from 'immutability-helper';

import './App.css';
import Header from '../components/shared/Header/Header';
import SideBar from '../components/shared/SideBar/SideBar';

// cookies
import Cookies from 'js-cookie';

// sketches
import HomePage from '../components/HomePage/HomePage';
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

import socket from "../components/shared/Socket/Socket";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:5000";


window.AWS = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches";

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
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
      classes: "App",
      showSideBar: false,
      hasAvatar: false,
      showSignIn: false,
      sessionID: null,
      usersChange: false,
      user: {avatar:"", userName:"", room:"", x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight, messages: [{to:"to", from:"from", message:"message"}]},
      users: null,
      messages: []
    };

    // this.setHands = this.setHands.bind(this);
    // this.updateDimensions = this.updateDimensions.bind(this);
    this.updateDeviceDimensions = this.updateDeviceDimensions.bind(this);
    this.addClass = this.addClass.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);

    this.userClicked = this.userClicked.bind(this);
    this.userUpdated = this.userUpdated.bind(this);
    this.userSet = this.userSet.bind(this);
    this.userMove = this.userMove.bind(this);
    this.userRegister = this.userRegister.bind(this);
    this.userRegisterCheck = this.userRegisterCheck.bind(this);
    this.addUserMessage = this.addUserMessage.bind(this);
    // this.usersChangeReset = this.usersChangeReset.bind(this);
  }


  componentDidMount() {
    // const id = Cookies.get('hand');

    const hasAvatar = Cookies.get('hasAvatar');

    if (hasAvatar) {
      const userName = Cookies.get('userName');
      const avatar = Cookies.get('avatar');
      const user= {...this.state.user};
      user.userName = userName;
      user.avatar = avatar;
      this.setState({user, showSignIn: false, hasAvatar: true});

      if (socket.connected) {
        socket.emit("setUser", user);
      }
    }
    else {
      console.log("nope")
      this.setState({showSignIn: true, hasAvatar: false});
    }



    socket.on('connect', () => {
      console.log("CONNECTED", socket.id)
      this.setState({sessionID: socket.id});
      var {user} = this.state;
      socket.emit("setUser", user);
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
      console.log("message received", data);
      this.addUserMessage(data);
    })

    socket.on("userJoined", data => {
      this.setState({usersChange: true});
      console.log("SOMEONE JOINED");
    })

    socket.on("userDisconnected", data => {
      this.setState({usersChange: true});
      console.log("SOMEONE DISCONNECTED");
    })

    this.updateDeviceDimensions();
    window.addEventListener("resize", this.updateDeviceDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDeviceDimensions);
    // this.socket.disconnect();
  }


  addUserMessage(msg) {
    const user = {...this.state.user};

    var newUser = update(user, { messages:
      {$push: [msg]}
    });

    // console.log("USER UDPATE", newUser);

    this.setState({user: newUser});
  }

  toggleSideBar() {
    console.log("TOGGLED");
    this.setState(prevState => ({
      showSideBar: !prevState.showSideBar
    }));
  }

  handleDrawerClose() {
    console.log("CLOSED")
    this.setState({showSideBar: false});
  }

  updateDeviceDimensions() {
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
    console.log("minD", minD, dimensions.windowWidth, dimensions.windowHeight);
    dimensions.device = "";
    if (minD < 450) dimensions.device="mobile";
    else if (minD <  700) dimensions.device="tablet";
    else dimensions.device="desktop";

    this.setState({dimensions: dimensions});
  }

  addClass(classn) {
    let classes = this.state.classes;
    classes += " " + classn;
    this.setState({classes: classes});
    //" " + this.state.cursor
  }

  userClicked() {
    this.setState({showSignIn: true});
  }

  userUpdated(avatar, userName) {
    const newUser = { ...this.state.user }
    newUser.userName = userName;
    newUser.avatar = avatar;
    this.setState({user: newUser});
  }

  userMove(x, y, time) {
    let space = 50;
    const user = { ...this.state.user }
    user.x += x*space;
    user.y += y*space;
    // console.log("1", new Date() - time);
    this.setState({user});
    // console.log("dt", new Date() - time);
    socket.emit("setUser", user);
  }

  userSet(userName, avatar) {
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

    socket.emit("setUser", this.state.user);
  }

  userRegister({isUser, user}) {
    console.log("user register!!!")
    if (isUser) {
      alert("username already exists. Please enter a new username.");
    }
    else {
      this.userSet(user.userName, user.avatar);
    }
  }

  userRegisterCheck(userName, avatar) {
    console.log("userRegisterCheck");
    const user={userName:userName, avatar:avatar};
    socket.emit("registerUser", user, this.userRegister);
  }

  // usersChangeReset() {
  //   this.setState({usersChange: false});
  // }

  closeSignIn() {
    this.setState({showSignIn: false})
  }

  render() {
    const {dimensions} = this.state;
    return (
      <div className={this.state.classes}>
        <MuiThemeProvider theme={theme}>
          <div className="App-Header">
            <div className="BackHeader"></div>
            <Header dimensions={dimensions} toggleSideBar={this.toggleSideBar} user={this.state.user} userSet={this.userSet} userClicked={this.userClicked} />
          </div>
          <div className="App-Content inner-outline">
            <Switch>
              <Route exact path="/" render={() => (<HomePage user={this.state.user} users={this.state.users} userMove={this.userMove}/>)} />
              <Route  path="/losing-my-dimension" component={Dimension} />
              <Route  path="/macbook-air" render={() => (<MacbookAir dimensions={dimensions} />)} />
              <Route  path="/i-got-the-feels" component={ClickMe} />
              <Route  path="/jungle-gyms" component={JungleGyms} />
              <Route  path="/hard-drives-on-seashores" component={HardDrives} />
              <Route  path="/wasted-days-are-days-wasted" render={() => (<Spacetimes dimensions={dimensions} />)} />
              <Route  path="/esc-to-mars" render={() => (<Mars addClass={this.addClass} dimensions={dimensions} />)}/>
              <Route  path="/wet-streams" component={WetStreams} />

              <Route  path="/dinner" component={Dinner} />
              <Route  path="/altars" component={Altar} />
              <Route  path="/xfinity-depths" render={() => (<Loop dimensions={dimensions} />)}/>
              <Route  path="/cloud-confessional" render={() => (<WaveForms cursor={this.state.cursorID} />)} />
              <Route  path="/confessions" render={() => (<Confessions />)} />

              <Route  path="/dig" render={() => (<Dig addClass={this.addClass} />)} />

              <Route  path="/moon-light" component={MoonLight} />
              <Route  path="/three" component={Three} />

              <Route  path="/credits" component={Credits} />
              <Route  path="/words" component={About} />
              <Route  component={NotFound} />
            </Switch>
            <div id="fps">0</div>
          </div>
          <SideBar user={this.state.user} users={this.state.users} usersChange={this.state.usersChange} showSideBar={this.state.showSideBar} handleDrawerClose={this.handleDrawerClose.bind(this)} />
          <SignIn user={this.state.user} hasAvatar={this.state.hasAvatar} showSignIn={this.state.showSignIn} closeSignIn={this.closeSignIn.bind(this)} userUpdated={this.userUpdated} userSet={this.userSet} userRegisterCheck={this.userRegisterCheck} />
        </MuiThemeProvider>
      </div>
    );
  }

  componentDidUpdate() {
    if (this.state.usersChange) this.setState({usersChange: false})
  }

}



export default App;
