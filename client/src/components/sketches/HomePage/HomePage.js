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
import Column from './components/Column';
import Door from './components/Door/Door';

import { initZIndicesIcons, initZIndicesFrames } from './components/Helpers';
import { getNewZIndices } from '../../shared/Helpers/Helpers';

import ArrowKeysReact from 'arrow-keys-react';

import { wineLocation, djLocation, outsideDoorFrames, lights } from './constants';

// store
import { connect } from 'react-redux';
import { moveUser } from '../../../store/actions/user';

import flurry from './Canned/flurry_1.mp4';


class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      keyDown: false,
      zIndex: [3, 4, 5, 6],
      OGW: window.innerWidth / 2,
      OGH: window.innerHeight / 2,
      zIndicesIcons: initZIndicesIcons(),
      zIndicesFrames: initZIndicesFrames(),
      loading: true
    }

    this.avatarW = 34;

  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ OGW: window.innerWidth / 2, OGH: window.innerHeight / 2 });
  }

  newFrameToTop = (id) => {
    const newZ = getNewZIndices(id, this.state.zIndicesFrames);
    this.setState({ zIndicesFrames: newZ });
    // console.log("ZZZ", this.state.zIndices);
  }

  newIconToTop = (id) => {
    console.log("id", id)
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
    this.setState({ loading: false });
  }

  getHomeComponents = () => {
    const { users, user, zIndicesIcons, zIndicesFrames } = this.props;
    if (this.state.loading)
      return (
        <div className="backgroundCover"><div className="loading">LOADING</div></div>
      );
    return (
      <React.Fragment>
        {/*  <Welcome w={500} h={400} z={1} x={-250-user.x+ this.state.OGW} y={-320-user.y+ this.state.OGH} />*/}
        {/* <Oak w={500} h={400} z={0} x={-1550 - user.x + this.state.OGW} y={-220 - user.y + this.state.OGH} /> */}
        {this.getDancers()}
        {this.getWineBars()}
        {this.getLights()}
        {this.getDoors()}
        {this.getColumns()}
        {/* <Folders x={300 - user.x + this.state.OGW} y={-330 - user.y + this.state.OGH} zIcons={zIndicesIcons} zFrames={zIndicesFrames} onDblClick={this.onDblClick} newFrameToTop={this.newFrameToTop} newIconToTop={this.newIconToTop} />*/}
        {this.getAvatars()}
        <MiniMap users={users} user={user} x={50} y={50} z={50} wineLocation={wineLocation} />
        <Glasses />
      </React.Fragment>
    )
  }

  getDancers = () => {
    const { users, user } = this.props;
    return (
      <div className="Dance">
        <DJ x={djLocation.x - user.x + this.state.OGW} y={djLocation.y - user.y + this.state.OGH} z={2} />
        <Dancer startPos={{ x: 10, y: 160 }} x={djLocation.x - user.x + this.state.OGW} y={djLocation.y - user.y + this.state.OGH} avatar="💃" z={2} isFlipped={false} />
        <Dancer startPos={{ x: 200, y: 280 }} x={djLocation.x - user.x + this.state.OGW} y={djLocation.y - user.y + this.state.OGH} avatar="🕺🏾" z={2} isFlipped={false} />
        <Dancer startPos={{ x: 400, y: 120 }} x={djLocation.x - user.x + this.state.OGW} y={djLocation.y - user.y + this.state.OGH} avatar="💃🏽" z={2} isFlipped={true} />
      </div>
    )
  }

  getWineBars = () => {
    const { users, user } = this.props;
    return (
      <div className="Wine">
        <WineBar x={wineLocation[0].x - user.x + this.state.OGW} y={wineLocation[0].y - user.y + this.state.OGH} z={2} w={wineLocation[0].w} h={wineLocation[0].h} />
        <WineBar x={wineLocation[1].x - user.x + this.state.OGW} y={wineLocation[1].y - user.y + this.state.OGH} z={2} w={wineLocation[1].w} h={wineLocation[1].h} />
      </div>
    )
  }

  getLights = () => {
    const { users, user } = this.props;
    return (
      <div className="Lights">
        <TrackLights isFlipped={true} isHorizontal={false} x={lights[0].x - user.x + this.state.OGW} y={lights[0].y - user.y + this.state.OGH} z={900} w={80} h={300} />
        <TrackLights isFlipped={false} isHorizontal={false} x={lights[1].x - user.x + this.state.OGW} y={lights[1].y - user.y + this.state.OGH} z={900} w={80} h={300} />
        <TrackLights isFlipped={false} isHorizontal={false} x={lights[2].x - user.x + this.state.OGW} y={lights[2].y - user.y + this.state.OGH} z={900} w={80} h={300} />
      </div>
    )
  }

  getColumns = () => {
    const { users, user } = this.props;
    const y0 = -820;
    const dy = 60;
    const dx = 110;
    const y1 = 50;
    const h = 280;
    return (
      <div className="Columns">
        {/*<Column w={80} h={h} x={-240 - dx * 2 - user.x + this.state.OGW} y={y0 + dy * 2 - user.y + this.state.OGH} z={502} />
        <Column w={80} h={h} x={-240 - dx - user.x + this.state.OGW} y={y0 + dy - user.y + this.state.OGH} z={502} />
        <Column w={80} h={h} x={-240 - user.x + this.state.OGW} y={y0 - user.y + this.state.OGH} z={502}  />

        <Column w={80} h={h} x={160 - user.x + this.state.OGW} y={y0 - user.y + this.state.OGH} z={502}  />
        <Column w={80} h={h} x={160 + dx - user.x + this.state.OGW} y={y0 + dy - user.y + this.state.OGH} z={502}  />
        <Column w={80} h={h} x={160 + dx * 2 - user.x + this.state.OGW} y={y0 + dy * 2 - user.y + this.state.OGH} z={502} />



        <Column w={80} h={h} x={-240 - dx * 2 - user.x + this.state.OGW} y={y1 - dy * 2 - user.y + this.state.OGH} z={502} />
        <Column w={80} h={h} x={-240 - dx - user.x + this.state.OGW} y={y1 - dy - user.y + this.state.OGH} z={502} />
        <Column w={80} h={h} x={-240 - user.x + this.state.OGW} y={y1 - user.y + this.state.OGH} z={502}  />

        <Column w={80} h={h} x={160 - user.x + this.state.OGW} y={y1 - user.y + this.state.OGH} z={502}  />
        <Column w={80} h={h} x={160 + dx - user.x + this.state.OGW} y={y1 - dy - user.y + this.state.OGH} z={502}  />
        <Column w={80} h={h} x={160 + dx * 2 - user.x + this.state.OGW} y={y1 - dy * 2 - user.y + this.state.OGH} z={502} /> 
        
         <Column w={80} h={h} x={-340 - user.x + this.state.OGW} y={y0 - user.y + this.state.OGH} z={502} />
        <Column w={80} h={h} x={260 - user.x + this.state.OGW} y={y0 - user.y + this.state.OGH} z={502} />
        */}
       
       
      </div>
    )
  }

  getDoors = () => {
    const { users, user } = this.props;
    const h = 180;
    const w = 500;
    return (
      <div className="Doors">
        <Door id={1} isFlipped={false} w={w} h={h} z={0} x={outsideDoorFrames[2].x - w / 2} dx={-user.x + this.state.OGW} y={outsideDoorFrames[2].y - 24 - h / 2} dy={-user.y + this.state.OGH} user={user} users={users} />
        <Door id={2} isFlipped={false} w={w} h={h} z={0} x={outsideDoorFrames[0].x - w / 2} dx={-user.x + this.state.OGW} y={outsideDoorFrames[0].y - 24 - h / 2} dy={-user.y + this.state.OGH} user={user} users={users} />
        <Door id={2} isFlipped={false} w={w} h={h} z={0} x={outsideDoorFrames[3].x - w / 2} dx={-user.x + this.state.OGW} y={outsideDoorFrames[3].y - 24 - h / 2} dy={-user.y + this.state.OGH} user={user} users={users} />
        <Door id={3} isFlipped={true} w={h} h={w} z={0} x={outsideDoorFrames[1].x - h / 2} dx={-user.x + this.state.OGW} y={outsideDoorFrames[1].y - w / 2} dy={- user.y + this.state.OGH} user={user} users={users} />
      </div>
    )
  }

  getAvatars = () => {
    const { users, user } = this.props;
    return (
      <div className="avatars">
        <OtherAvatars users={users} user={user} avatarW={this.avatarW} />
        <Avatar user={user} avatarW={this.avatarW} />
      </div>
    )
  }

  render() {
    const { users, user, walls, doors, roomCount } = this.props;
    const { zIndex, zIndicesIcons, zIndicesFrames } = this.state;


    // onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}

    // walls={walls}
    // doors={doors}
    // <video autoPlay muted loop className="backgroundCover">
    //   <source src={window.AWS + "/macbookAir/clouds3d.mp4"} type="video/mp4" ></source>
    //   Your browser does not support HTML5 video.
    // </video>

    return (
      <div className="HomePage Sketch" >
        {/* getFlurry() */}

        <Sketch
          className="p5sketch"
          user={user}
          users={users}
          roomCount={roomCount}
          userMove={(x, y) => this.props.moveUser(x, y, wineLocation)}
          userNewRoom={this.props.userNewRoom}
          loadingDone={this.loadingDone}
        />

        {this.getHomeComponents()}

      </div>
    )
  }
}



const getFlurry = () => {
  return (
    <video ref={this.cloudsRef} autoPlay muted loop className="backgroundCover">
      <source src={flurry} type="video/mp4" ></source>
        Your browser does not support HTML5 video.
    </video>
  )
}




const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = () => {
  return {
    moveUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(HomePage);
