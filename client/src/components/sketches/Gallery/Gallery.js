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
import { setNoSketchMusic, setSketchMusic, setSketchVolume } from '../../../store/actions/music';

import { mapVal } from '../../shared/Helpers/Helpers';

// import ReactAudioPlayer from 'react-audio-player';


class Gallery extends React.Component {

  constructor(props) {
    super(props);

    // this.songs = [
    //   window.AWS + "/gallery/music/lounge.mp3",
    //   window.AWS + "/gallery/music/sexy.mp3",
    //   window.AWS + "/gallery/music/jazzriff.mp3",
    //   window.AWS + "/gallery/music/samba.mp3",
    //   window.AWS + "/gallery/music/jazzpiano.mp3",
    //   window.AWS + "/gallery/music/trap.mp3",
    // ];

    this.state = {
      keyDown: false,
      numEllipses: 0,
      // zIndex: [3, 4, 5, 6],
      // zIndicesIcons: initZIndicesIcons(),
      // zIndicesFrames: initZIndicesFrames(),
      volume: .5
    }

    this.props.setSketchMusic("gallery", 0, .1);
    // this.props.setNoSketchMusic();
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

        <MiniMap users={users} user={user} x={ui.edgeSpacing} y={ui.edgeSpacing} wineLocation={wineLocation} />

      </React.Fragment>
    )
  }

  getEllipses = () => {
    const str = "...";
    return str.substring(0, this.state.numEllipses);
  }

  getVolume = () => {
    const { user, music } = this.props;
    // if (music.isMuted || music.masterVolume === 0)
    //   return 0;
    let dx = djLocation.x - user.x;
    let dy = djLocation.y - user.y;
    let dis = Math.sqrt(dx * dx + dy * dy);
    if (this.props.outside) {
      let minVol = .3;
      let v = mapVal(dis, 0, 3000, 1, 0);
      if (v > 1)
        v = 1;
      else if (v < minVol)
        v = minVol;
      return v;
    }
    return .1;
  }


  setUserActive = (otherUser) => {
    this.props.setUserActiveChat(otherUser);
    this.props.showChat();
    this.props.setOneMenu("chat");
  }

  moveUser = (x, y) => {
    this.props.setSketchVolume(this.getVolume());
    this.props.moveUser(x, y, wineLocation);
  }

  render() {
    const { users, user, roomCount, ui, isClosed } = this.props;
    // const { zIndex, zIndicesIcons, zIndicesFrames } = this.state;

    return (
      <div className="Gallery Sketch" >
        <Sketch
          className="p5sketch"
          user={user}
          users={users}
          roomCount={roomCount}
          isClosed={isClosed}
          userMove={(x, y) => this.moveUser(x, y)}
          userTransition={(x, y) => this.props.transitionUser(x, y, wineLocation)}
          userNewRoom={this.props.userNewRoom}
          loadingDone={this.loadingDone}
          toggleOutside={this.props.toggleOutside}
          isMobile={ui.isMobile}
          setUserActive={this.setUserActive}
        />

        {this.getHomeComponents()}
        {/* <ReactAudioPlayer
          src={this.songs[this.props.music.currentSong]}
          autoPlay={true}
          volume={0}//{this.getVolume()}
          controls={false}
          loop={true}
          ref={player => {
            this.audioPlayer = player;
          }}
        /> */}
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
    showChat,
    setSketchMusic,
    setSketchVolume,
    setNoSketchMusic
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Gallery);
