import React from 'react';
import "./HomePage.css";

// import Frame from '../../shared/Frame/Frame';
// import Dock from '../../shared/Dock/Dock';
// import Glasses from '../../shared/Glasses/Glasses';

import Sketch from './p5/HomeSketch';

import MiniMap from './components/MiniMap';
// import OtherAvatars from '../../shared/RoomUsers/OtherAvatars';
// import Avatar from '../../shared/RoomUsers/Avatar';

import Folders from './components/Folders';
import RoomFolders from './components/RoomFolders';
// import Oak from './components/Oak';
import WineBar from './components/Bars/WineBar';
import CheeseBar from './components/Bars/CheeseBar';
import CocktailBar from './components/Bars/CocktailBar';
import DJ from './components/DJ';
import Dancer from './components/Dancer';
import TrackLights from './components/TrackLights/TrackLights';
import Column from './components/Column';
import Door from './components/Door/Door';
import Pools from './components/Pools/Pools';

// import './p5/components/Draggable/Draggable.css';

import { initZIndicesIcons, initZIndicesFrames } from './components/Helpers';
import { getNewZIndices } from '../../shared/Helpers/Helpers';

import { wineLocation, djLocation, outsideDoorFrames, lights, p5ToDomCoords, globalConfig, limits, limitsDiv } from './constants';

// store
import { connect } from 'react-redux';
import {  doneLoadingApp } from '../../../store/actions';
import { moveUser, toggleOutside } from '../../../store/actions/user';

import ReactAudioPlayer from 'react-audio-player';


class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.songs = [
      window.AWS + "/homePage/music/lounge.mp3",
      window.AWS + "/homePage/music/sexy.mp3",
      window.AWS + "/homePage/music/jazzriff.mp3",
      window.AWS + "/homePage/music/samba.mp3",
      window.AWS + "/homePage/music/jazzpiano.mp3",
      window.AWS + "/homePage/music/trap.mp3",
    ];

    this.state = {
      keyDown: false,
      zIndex: [3, 4, 5, 6],
      zIndicesIcons: initZIndicesIcons(),
      zIndicesFrames: initZIndicesFrames(),
      volume: .5
    }


  }

  componentDidMount() {
    // window.addEventListener("resize", this.handleResize);
  }

  newFrameToTop = (id) => {
    const newZ = getNewZIndices(id, this.state.zIndicesFrames);
    this.setState({ zIndicesFrames: newZ });
    // console.log("ZZZ", this.state.zIndices);
  }

  newIconToTop = (id) => {
    // console.log("id", id)
    const newZ = getNewZIndices(id, this.state.zIndicesIcons);
    this.setState({ zIndicesIcons: newZ });
    // console.log("ZZZ", this.state.zIndices);
  }

  onDblClick = (id) => {
    // console.log(id);
    this.newFrameToTop(id);
  }


  enterRoom = (room) => {
    this.props.history.push(room);
  }

  loadingDone = () => {
    this.props.doneLoadingApp();
  }

  getHomeComponents = () => {
    const { users, user, ui } = this.props;
    const { zIndicesIcons, zIndicesFrames } = this.state;
    if (ui.loading)
      return (
        <div className="backgroundCover"><div className="loading">LOADING</div></div>
      );
      // const xMini = ui.isMobile && ui.orientation === "landscape" ? 80 : 20;
    return (
      <React.Fragment>
        {/*  <Welcome w={500} h={400} z={1} x={-250-user.x+ ui.width/2} y={-320-user.y+ ui.height/2} />*/}
        {/* <Oak w={500} h={400} z={0} x={-1550 - user.x + ui.width/2} y={-220 - user.y + ui.height/2} /> */}
        {this.getOuterFrame()}
        {this.getDancers()}
        {this.getBars()}
        {this.getLights()}
        {this.getDoors()}
        {this.getColumns()}
        <RoomFolders x={-user.x + ui.width/2} y={-user.y + ui.height/2} zIcons={zIndicesIcons} zFrames={zIndicesFrames} onDblClick={this.onDblClick} newFrameToTop={this.newFrameToTop} newIconToTop={this.newIconToTop} />
        <Folders x={540 - user.x + ui.width/2} y={0 - user.y + ui.height/2} zIcons={zIndicesIcons} zFrames={zIndicesFrames} onDblClick={this.onDblClick} newFrameToTop={this.newFrameToTop} newIconToTop={this.newIconToTop} />
        {/* {this.getAvatars()} */}
        <Pools x={-user.x + ui.width/2} y={-user.y + ui.height/2} />
        <MiniMap users={users} user={user} x={20} y={20} wineLocation={wineLocation} />
        {/*Glasses />*/}
        <div id="cards"></div>
      </React.Fragment>
    )
  }

  getDancers = () => {
    const { user, ui } = this.props;
    return (
      <div className="Dance">
        <DJ x={djLocation.x - user.x + ui.width/2 - 85} y={djLocation.y - user.y + ui.height/2 + 40} z={2} />
        <Dancer startPos={{ x: 10, y: 160 }} x={djLocation.x - user.x + ui.width/2} y={djLocation.y - user.y + ui.height/2} avatar="💃" z={2} isFlipped={false} />
        <Dancer startPos={{ x: 200, y: 380 }} x={djLocation.x - user.x + ui.width/2} y={djLocation.y - user.y + ui.height/2} avatar="🕺🏾" z={2} isFlipped={false} />
        <Dancer startPos={{ x: 300, y: 150 }} x={djLocation.x - user.x + ui.width/2} y={djLocation.y - user.y + ui.height/2} avatar="💃🏽" z={2} isFlipped={true} />
      </div>
    )
  }

  getRoomFiles = () => {

  }

  getBars = () => {
    const { user, ui } = this.props;
    return (
      <div className="Bars">
        <CheeseBar x={wineLocation[0].x - user.x + ui.width/2} y={wineLocation[0].y - user.y + ui.height/2} z={2} w={wineLocation[0].w} h={wineLocation[0].h} />
        <WineBar x={wineLocation[1].x - user.x + ui.width/2} y={wineLocation[1].y - user.y + ui.height/2} z={2} w={wineLocation[1].w} h={wineLocation[1].h} />
        <CocktailBar x={wineLocation[2].x - user.x + ui.width/2} y={wineLocation[2].y - user.y + ui.height/2} z={2} w={wineLocation[2].w} h={wineLocation[2].h} />
      </div>
    )
  }

  getLights = () => {
    const { user, ui } = this.props;
    return (
      <div className="Lights">
        <TrackLights isFlipped={true} isHorizontal={false} x={lights[0].x - user.x + ui.width/2} y={lights[0].y - user.y + ui.height/2} z={900} w={80} h={300} />
        <TrackLights isFlipped={false} isHorizontal={false} x={lights[1].x - user.x + ui.width/2} y={lights[1].y - user.y + ui.height/2} z={900} w={80} h={300} />
        <TrackLights isFlipped={false} isHorizontal={false} x={lights[2].x - user.x + ui.width/2} y={lights[2].y - user.y + ui.height/2} z={900} w={80} h={300} />
      </div>
    )
  }

  getColumns = () => {
    const { user, ui } = this.props;
    const y0 = -820;
    const dy = 100;
    const dx = 100;
    const y1 = -50;
    const h = 280;
    return (
      <div className="Columns">
        {/*  <Column w={80} h={h} x={-240 - dx * 2 - user.x + ui.width/2} y={y0 + dy * 2 - user.y + ui.height/2} z={502} />
        <Column w={80} h={h} x={-240 - dx - user.x + ui.width/2} y={y0 + dy - user.y + ui.height/2} z={502} />
        <Column w={80} h={h} x={-240 - user.x + ui.width/2} y={y0 - user.y + ui.height/2} z={502}  />

        <Column w={80} h={h} x={160 - user.x + ui.width/2} y={y0 - user.y + ui.height/2} z={502}  />
        <Column w={80} h={h} x={160 + dx - user.x + ui.width/2} y={y0 + dy - user.y + ui.height/2} z={502}  />
        <Column w={80} h={h} x={160 + dx * 2 - user.x + ui.width/2} y={y0 + dy * 2 - user.y + ui.height/2} z={502} />



        <Column w={80} h={h} x={-240 - dx * 2 - user.x + ui.width/2} y={y1 - dy * 2 - user.y + ui.height/2} z={502} />
        <Column w={80} h={h} x={-240 - dx - user.x + ui.width/2} y={y1 - dy - user.y + ui.height/2} z={502} />
        <Column w={80} h={h} x={-240 - user.x + ui.width/2} y={y1 - user.y + ui.height/2} z={502}  />
*/}
        <Column w={80} h={h} x={160 - user.x + ui.width/2} y={y1 - user.y + ui.height/2} z={502} />
        <Column w={80} h={h} x={160 + dx - user.x + ui.width/2} y={y1 - dy - user.y + ui.height/2} z={502} />
        <Column w={80} h={h} x={160 + dx * 2 - user.x + ui.width/2} y={y1 - dy * 2 - user.y + ui.height/2} z={502} />
        <Column w={80} h={h} x={160 + dx * 3 - user.x + ui.width/2} y={y1 - dy * 3 - user.y + ui.height/2} z={502} />

        {/*   <Column w={80} h={h} x={-340 - user.x + ui.width/2} y={y0 - user.y + ui.height/2} z={502} />
        <Column w={80} h={h} x={260 - user.x + ui.width/2} y={y0 - user.y + ui.height/2} z={502} />*/}



      </div>
    )
  }

  

  getOuterFrame = () => {
    const { ui } = this.props;
    const startX = limitsDiv[0].x;
    const endX = limitsDiv[1].x;
    const startY = limitsDiv[0].y;
    const endY = limitsDiv[2].y;
    const x = startX - this.props.user.x + ui.width/2;
    const y = startY - this.props.user.y + ui.height/2;
    const w = endX - startX;
    const h = endY - startY;
    return (
      <div className="outerFrame" style={{ width: w, height: h, left: x, top: y }}></div>
      // <Frame
      //   className="outerFrame"
      //   windowStyle={{ background: "transparent" }}
      //   content={<div></div>}
      //   x={startX - this.props.user.x + ui.width/2}
      //   y={startY - this.props.user.y + ui.height/2}
      //   z={20}
      //   width={w}
      //   height={h}
      // />
    )
  }

  getDoors = () => {
    const { users, user, ui } = this.props;
    const h = 180;
    const w = 500;
    return (
      <div className="Doors">
        <Door id={1} isFlipped={false} w={w} h={h} z={0} x={outsideDoorFrames[2].x - w / 2} dx={-user.x + ui.width/2} y={outsideDoorFrames[2].y - 24 - h} dy={-user.y + ui.height/2} user={user} users={users} />
        <Door id={2} isFlipped={false} w={w} h={h} z={0} x={outsideDoorFrames[0].x - w / 2} dx={-user.x + ui.width/2} y={outsideDoorFrames[0].y - 24 - h} dy={-user.y + ui.height/2} user={user} users={users} />
        <Door id={2} isFlipped={false} w={w} h={h} z={0} x={outsideDoorFrames[3].x - w / 2} dx={-user.x + ui.width/2} y={outsideDoorFrames[3].y - 24 - h} dy={-user.y + ui.height/2} user={user} users={users} />
        <Door id={3} isFlipped={true} w={h} h={w} z={0} x={outsideDoorFrames[1].x} dx={-user.x + ui.width/2} y={outsideDoorFrames[1].y - w / 2 - 50} dy={- user.y + ui.height/2} user={user} users={users} />
      </div>
    )
  }

  // getAvatars = () => {
  //   const { users, user } = this.props;
  //   return (
  //     <div className="avatars">
  //       <OtherAvatars users={users} user={user} avatarW={this.avatarW} />
  //       <Avatar user={user} avatarW={this.avatarW} />
  //     </div>
  //   )
  // }

  getVolume = () => {
    const { user, ui } = this.props;
    let dx = djLocation.x - user.x;
    let dy = djLocation.y - user.y;
    let dis = Math.sqrt(dx * dx + dy * dy);
    if (this.props.outside) {
      let minVol = .3;
      let v = this.mapVal(dis, 0, 3000, 1, 0);
      if (v > 1) v = 1;
      else if (v < minVol) v = minVol;
      return v;
    }
    // let maxVol = .2;
    // let minVol = 0.01;
    // let v = this.mapVal(dis, 0, 3000, maxVol, minVol);
    // if (v > maxVol) v = maxVol;
    // else if (v < minVol) v = minVol;
    return .1;
    // return v;
  }

  mapVal = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  render() {
    const { users, user, walls, doors, roomCount, ui } = this.props;
    const { zIndex, zIndicesIcons, zIndicesFrames } = this.state;

    return (
      <div className="HomePage Sketch" >
        <Sketch
          className="p5sketch"
          user={user}
          users={users}
          roomCount={roomCount}
          userMove={(x, y) => this.props.moveUser(x, y, wineLocation)}
          userTransition={(x, y) => this.props.transitionUser(x, y, wineLocation)}
          userNewRoom={this.props.userNewRoom}
          loadingDone={this.loadingDone}
          toggleOutside={this.props.toggleOutside}
          isMobile={ui.isMobile}
        />

        {this.getHomeComponents()}
        <ReactAudioPlayer
          src={this.songs[this.props.currentSong]}
          autoPlay={false}
          volume={this.getVolume()}
          controls={false}
          loop={true}
          ref={player => {
            this.audioPlayer = player;
          }}
        />
      </div>
    )
  }
}



// const getFlurry = () => {
//   return (
//     <video ref={this.cloudsRef} autoPlay muted loop className="backgroundCover">
//       <source src={flurry} type="video/mp4" ></source>
//         Your browser does not support HTML5 video.
//     </video>
//   )
// }




const mapStateToProps = (state) => {
  return {
    user: state.user,
    currentSong: state.currentSong,
    outside: state.outside,
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    moveUser,
    toggleOutside,
    doneLoadingApp
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(HomePage);
