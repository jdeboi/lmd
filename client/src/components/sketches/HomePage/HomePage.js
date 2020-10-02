import React from 'react';
import "./HomePage.css";

import Frame from '../../shared/Frame/Frame';
import Glasses from '../../shared/Glasses/Glasses';

import P5Wrapper from 'react-p5-wrapper';
// import sketch from './HomeSketch';
import Sketch from './HomeSketch';

import OtherAvatars from './components/OtherAvatars';
import Avatar from './components/Avatar';

import Folders from './components/Folders';
import Welcome from './components/Welcome';
import WineBar from './components/WineBar';

import ArrowKeysReact from 'arrow-keys-react';

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      keyDown: false,
      zIndex: [0, 1, 2, 3],
      OGW: window.innerWidth/2,
      OGH: window.innerHeight/2
    }

    this.avatarW = 34;

  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    this.props.userSetRoom("home");

  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    this.props.userLeaveRoom("home");
  }

  // at id = 1
  // 3, 2, 1, 0
  // 2, 3, 1, 0

  // at id = 3
  // 1, 2, 3, 0
  // 0, 1, 2, 3

  onDblClick = (id) => {
    console.log("yeah clicked", id)
    const zIndex = [...this.state.zIndex];
    const prevId = zIndex[id];
    let max = zIndex.length-1;
    zIndex.map(function(element){
      if (element > max) return element - 1;
      return element;
    });
    // this.setState({zIndex});
  }


  userSetActiveChat = (user) => {

    this.props.userSetActiveChat(user);
  }



  handleKeyDown = (e) => {
    var {keyDown} = this.state;

    if (!keyDown) {
      e = e || window.event;
      if (e.keyCode == '38') {
        // up
        this.props.userMove(0, -1, new Date());
      }
      else if (e.keyCode == '40') {
        // down
        this.props.userMove(0, 1, new Date());
      }
      else if (e.keyCode == '37') {
        // left
        this.props.userMove(-1, 0, new Date());
      }
      else if (e.keyCode == '39') {
        // right
        this.props.userMove(1, 0, new Date());
      }
      this.setState({keyDown: true});
    }

  }

  handleKeyUp = (e) => {
    this.setState({keyDown: false});
  }

  enterRoom = (room) => {
    this.props.history.push(room);
  }

  render() {
    const {users, user, walls, doors, wineLocation} = this.props;
    const {zIndex} = this.state;

    return (
      <div className="HomePage Sketch" onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} >

        <Sketch
          className="p5sketch"
          user={user}
          users={users}
          walls={walls}
          doors={doors}
          />


        <Welcome w={500} h={400} z={zIndex[0]} x={-250-user.x+ this.state.OGW} y={-250-user.y+ this.state.OGH} />
        <WineBar x={wineLocation.x-user.x + this.state.OGW} y={wineLocation.y-user.y+ this.state.OGH} w={wineLocation.w} h={wineLocation.h} />
        <Folders x={300-user.x+ this.state.OGW} y={-330-user.y+ this.state.OGH} z0={zIndex[1]} z1={zIndex[2]} z2={zIndex[3]} onDblClick={this.onDblClick} />
        <div className="avatars">
          <OtherAvatars users={users} user={user} avatarW={this.avatarW} userSetActiveChat={this.userSetActiveChat}  />
          <Avatar user={user} avatarW={this.avatarW} />
        </div>
        <Glasses />
      </div>
    )
  }
}




export default HomePage;
