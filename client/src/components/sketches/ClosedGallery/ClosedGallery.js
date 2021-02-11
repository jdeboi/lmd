import React from 'react';
import "./Gallery.css";

import Sketch from './p5/GallerySketch';
import MiniMap from './MiniMap/MiniMap';
import { wineLocation, djLocation } from './constants';
import LoadingPage from '../../shared/LoadingPage/LoadingPage';

// store
import { connect } from 'react-redux';
import { doneLoadingApp } from '../../../store/actions';
import { moveUser, toggleOutside } from '../../../store/actions/user';
import { setUserActiveChat } from '../../../store/actions/userActiveChat';
import { setOneMenu, showChat } from '../../../store/actions/menuItems';


import ReactAudioPlayer from 'react-audio-player';


class Gallery extends React.Component {

  constructor(props) {
    super(props);

    this.songs = [
      window.AWS + "/gallery/music/lounge.mp3",
      window.AWS + "/gallery/music/sexy.mp3",
      window.AWS + "/gallery/music/jazzriff.mp3",
      window.AWS + "/gallery/music/samba.mp3",
      window.AWS + "/gallery/music/jazzpiano.mp3",
      window.AWS + "/gallery/music/trap.mp3",
    ];

    this.state = {
      keyDown: false,
      numEllipses: 0,
      // zIndex: [3, 4, 5, 6],
      // zIndicesIcons: initZIndicesIcons(),
      // zIndicesFrames: initZIndicesFrames(),
      volume: .5
    }


  }

  componentDidMount() {
    this.loadingInterval = setInterval(this.cycleEllipses, 300);
    // window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    if (this.loadingInterval)
      clearInterval(this.loadingInterval);
  }

  cycleEllipses = () => {
    this.setState({ numEllipses: (this.state.numEllipses + 1) % 4 })
  }

  // newFrameToTop = (id) => {
  //   const newZ = getNewZIndices(id, this.state.zIndicesFrames);
  //   this.setState({ zIndicesFrames: newZ });
  // }

  // newIconToTop = (id) => {
  //   // console.log("id", id)
  //   const newZ = getNewZIndices(id, this.state.zIndicesIcons);
  //   this.setState({ zIndicesIcons: newZ });
  //   // console.log("ZZZ", this.state.zIndices);
  // }

  // onDblClick = (id) => {
  //   // console.log(id);
  //   this.newFrameToTop(id);
  // }


  enterRoom = (room) => {
    this.props.history.push(room);
  }

  loadingDone = () => {
    this.props.doneLoadingApp();
    clearInterval(this.loadingInterval);
  }

  getHomeComponents = () => {
    const { users, user, ui } = this.props;
    // const { zIndicesIcons, zIndicesFrames } = this.state;
    if (ui.loading)
      return (
        <LoadingPage ui={ui} />
      );
    return (
      <React.Fragment>

        <MiniMap users={users} user={user} x={10} y={10} wineLocation={wineLocation} />

      </React.Fragment>
    )
  }

  getEllipses = () => {
    const str = "...";
    return str.substring(0, this.state.numEllipses);
  }

  getVolume = () => {
    const { user, music } = this.props;
    if (music.isMuted || music.volume === 0)
      return 0;
    let dx = djLocation.x - user.x;
    let dy = djLocation.y - user.y;
    let dis = Math.sqrt(dx * dx + dy * dy);
    if (this.props.outside) {
      let minVol = this.mapVal(music.volume, 1, 0, .3, 0);
      let v = this.mapVal(dis, 0, 3000, music.volume, 0);
      if (v > music.volume) v = music.volume;
      else if (v < minVol) v = minVol;
      return v;
    }
    return this.mapVal(music.volume, 1, 0, .1, 0);
  }

  mapVal = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  setUserActive = (otherUser) => {
    this.props.setUserActiveChat(otherUser);
    this.props.showChat();
    // this.props.setOneMenu("chat");
  }

  render() {
    const { users, user, roomCount, ui } = this.props;
    // const { zIndex, zIndicesIcons, zIndicesFrames } = this.state;

    return (
      <div className="Gallery Sketch" >
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
          setUserActive={this.setUserActive}
        />

        {this.getHomeComponents()}
        <ReactAudioPlayer
          src={this.songs[this.props.music.currentSong]}
          autoPlay={true}
          volume={0}//{this.getVolume()}
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



const mapStateToProps = (state) => {
  return {
    user: state.user,
    music: state.music,
    outside: state.outside,
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    moveUser,
    toggleOutside,
    doneLoadingApp,
    setUserActiveChat,
    setOneMenu,
    showChat
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Gallery);
