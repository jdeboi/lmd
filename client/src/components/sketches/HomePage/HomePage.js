import React from 'react';
import "./HomePage.css";

import Frame from '../../shared/Frame/Frame';
import Dock from '../../shared/Dock/Dock';
import Glasses from '../../shared/Glasses/Glasses';

import P5Wrapper from 'react-p5-wrapper';
// import sketch from './HomeSketch';
import Sketch from './p5/HomeSketch';

import MiniMap from './components/MiniMap';
import OtherAvatars from './components/OtherAvatars';
import Avatar from './components/Avatar';

import Folders from './components/Folders';
import Welcome from './components/Welcome';
import Oak from './components/Oak';
import WineBar from './components/WineBar';
import DJ from './components/DJ';
import Dancer from './components/Dancer';
import TrackLights from './components/TrackLights/TrackLights';

import {initZIndicesIcons, initZIndicesFrames} from './components/Helpers';
import {getNewZIndices} from '../../shared/Helpers/Helpers';

import ArrowKeysReact from 'arrow-keys-react';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      keyDown: false,
      zIndex: [3, 4, 5, 6],
      OGW: window.innerWidth/2,
      OGH: window.innerHeight/2,
      zIndicesIcons: initZIndicesIcons(),
      zIndicesFrames: initZIndicesFrames()
    }

    this.avatarW = 34;

  }

  componentDidMount() {
    // window.addEventListener("keydown", this.handleKeyDown);
    // window.addEventListener("keyup", this.handleKeyUp);
    // this.props.userSetRoom("home");

  }

  componentWillUnmount() {
    // window.removeEventListener("keydown", this.handleKeyDown);
    // window.removeEventListener("keyup", this.handleKeyUp);
    // this.props.userLeaveRoom("home");
  }

  // at id = 1
  // 3, 2, 1, 0
  // 2, 3, 1, 0

  // at id = 3
  // 1, 2, 3, 0
  // 0, 1, 2, 3

  newFrameToTop = (id) => {
    const newZ = getNewZIndices(id, this.state.zIndicesFrames);
    this.setState({zIndicesFrames: newZ});
    // console.log("ZZZ", this.state.zIndices);
  }

  newIconToTop = (id) => {
    console.log("id", id)
    const newZ = getNewZIndices(id, this.state.zIndicesIcons);
    this.setState({zIndicesIcons: newZ});
    // console.log("ZZZ", this.state.zIndices);
  }

  onDblClick = (id) => {
    // console.log(id);
    this.newFrameToTop(id);
  }

  // onDblClick = (id) => {
  //   // console.log("yeah clicked", id)
  //   const zIndex = [...this.state.zIndex];
  //   const prevId = zIndex[id];
  //   let max = zIndex.length-1;
  //   zIndex.map(function(element){
  //     if (element > max) return element - 1;
  //     return element;
  //   });
  //   // this.setState({zIndex});
  // }


  userSetActiveChat = (user) => {

    this.props.userSetActiveChat(user);
  }


  //
  // handleKeyDown = (e) => {
  //   var {keyDown} = this.state;
  //
  //   if (!keyDown) {
  //     e = e || window.event;
  //     if (e.keyCode == '38') {
  //       // up
  //       this.props.userMove(0, -1, new Date());
  //     }
  //     else if (e.keyCode == '40') {
  //       // down
  //       this.props.userMove(0, 1, new Date());
  //     }
  //     else if (e.keyCode == '37') {
  //       // left
  //       this.props.userMove(-1, 0, new Date());
  //     }
  //     else if (e.keyCode == '39') {
  //       // right
  //       this.props.userMove(1, 0, new Date());
  //     }
  //     this.setState({keyDown: true});
  //   }
  //
  // }
  //
  // handleKeyUp = (e) => {
  //   this.setState({keyDown: false});
  // }

  enterRoom = (room) => {
    this.props.history.push(room);
  }

  render() {
    const {users, user, walls, doors, wineLocation, roomCount, djLocation} = this.props;
    const {zIndex, zIndicesIcons, zIndicesFrames} = this.state;


    // onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}

    // walls={walls}
    // doors={doors}
    // <video autoPlay muted loop className="backgroundCover">
    //   <source src={window.AWS + "/macbookAir/clouds3d.mp4"} type="video/mp4" ></source>
    //   Your browser does not support HTML5 video.
    // </video>

    // <TrackLights isFlipped={false} isHorizontal={true} x={-150-user.x+ this.state.OGW} y={-1000 -user.y +this.state.OGH} w={300} h={50} />
    // <TrackLights isFlipped={true} isHorizontal={true} x={-150-user.x+ this.state.OGW} y={-1300 -user.y +this.state.OGH} w={300} h={50} />
    // <TrackLights isFlipped={true} isHorizontal={false} x={-150-80-30-user.x+ this.state.OGW} y={-1300 -user.y +this.state.OGH} w={80} h={300} />
    // <TrackLights isFlipped={false} isHorizontal={false} x={150 + 30-user.x+ this.state.OGW} y={-1300 -user.y +this.state.OGH} w={80} h={300} />
    return (
      <div className="HomePage Sketch" >

        <Sketch
          className="p5sketch"
          user={user}
          users={users}
          roomCount={roomCount}
          userMove={this.props.userMove}
          userNewRoom={this.props.userNewRoom}
          />


        {/*  <Welcome w={500} h={400} z={1} x={-250-user.x+ this.state.OGW} y={-320-user.y+ this.state.OGH} />*/}
        <Oak w={500} h={400} z={0} x={-1550-user.x+ this.state.OGW} y={-220-user.y+ this.state.OGH} />
        <div className="Dance">
          <DJ x={djLocation.x-user.x + this.state.OGW} y={djLocation.y-user.y + this.state.OGH} z={2} />
          <Dancer x={djLocation.x-user.x+ this.state.OGW} y={djLocation.y-user.y + this.state.OGH} avatar="💃" z={2} />
          <Dancer x={djLocation.x-user.x+ this.state.OGW} y={djLocation.y-user.y + this.state.OGH} avatar="🕺🏾" z={2} />
          <Dancer x={djLocation.x-user.x+ this.state.OGW} y={djLocation.y-user.y + this.state.OGH} avatar="💃🏽" z={2} />
        </div>
        <div className="Wine">
          <WineBar x={wineLocation[0].x-user.x + this.state.OGW} y={wineLocation[0].y-user.y+ this.state.OGH} z={2} w={wineLocation[0].w} h={wineLocation[0].h} />
          <WineBar x={wineLocation[1].x-user.x + this.state.OGW} y={wineLocation[1].y-user.y+ this.state.OGH} z={2} w={wineLocation[1].w} h={wineLocation[1].h} />
        </div>
        <div className="Lights">
          <TrackLights isFlipped={true} isHorizontal={false} x={-40-user.x+ this.state.OGW} y={-1250 -user.y +this.state.OGH} z={1200} w={80} h={380} />
          <TrackLights isFlipped={false} isHorizontal={false} x={-600 + 30-user.x+ this.state.OGW} y={-1600 -user.y +this.state.OGH} z={1200} w={80} h={400} />
        </div>
        <Folders x={300-user.x+ this.state.OGW} y={-330-user.y+ this.state.OGH} zIcons={zIndicesIcons} zFrames={zIndicesFrames} onDblClick={this.onDblClick} newFrameToTop={this.newFrameToTop} newIconToTop={this.newIconToTop}  />
        <div className="avatars">
          <OtherAvatars users={users} user={user} avatarW={this.avatarW} userSetActiveChat={this.userSetActiveChat}  />
          <Avatar user={user} avatarW={this.avatarW} />
        </div>
        <MiniMap users={users} user={user} x={100} y={100} z={50} wineLocation={wineLocation}  />
      
        <Glasses />
      </div>
    )
  }
}




export default HomePage;
