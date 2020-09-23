import React from 'react';
import "./HomePage.css";


import Frame from '../shared/Frame/Frame';
import Glasses from '../shared/Glasses/Glasses';


class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      keyDown: false
    }

    this.getAvatars = this.getAvatars.bind(this);
  }


  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    document.removeEventListener("keyup", this.handleKeyUp.bind(this));
  }

  getAvatars() {
    const {users} = this.props;
    if (users) {
      return (
        users.map((user, i) => {
          const sty = {top: user.y, left: user.x};
          return (
            <div className="avatar" key={i} style={sty}>{user.avatar}</div>
          )
        })
      )
    }
  }



  getAvatar() {
    const {user} = this.props;
    return (
      <div style={{top: user.y, left: user.x}} className="userAvatar">{user.avatar}</div>
    )
  }

  handleKeyDown(e) {
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

  handleKeyUp(e) {
    this.setState({keyDown: false});
  }

  render() {

    return (
      <div className="HomePage Sketch" >
      <Frame title="Gallery" content={
        <div>column</div>
      }
      width={100} height={400} x={100} y={100}
      />
      <div className="avatars">
      {this.getAvatars()}
      {this.getAvatar()}
      </div>
      <Glasses />
      </div>
    )
  }
}

export default HomePage;
