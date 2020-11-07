import React from 'react';
import {getEmojis} from '../Welcome/components/Helpers';
import Frame from '../Frame/Frame';
import './SignIn.css';
import './SignInForm.css';

// store
import { connect } from 'react-redux';
import { setUser } from '../../../store/actions/user';

import socket from "../Socket/Socket";


class SignIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {avatar:props.user.avatar, userName:props.user.userName},
    }
  }

  // basically, don't re-render this component unless that signin window
  // has opened?
  // have to check both nextProps && this props. not exactly sure of
  // explanation at the moment
  shouldComponentUpdate(nextProps, nextState) {
    return (
      (nextProps.showSignIn !== this.props.showSignIn)
      || (nextState.user.userName !== this.state.user.userName)
      || (nextState.user.avatar !== this.state.user.avatar)
      || (nextState.user.userName !== this.state.user.userName)
      || (nextProps.hasAvatar !== this.props.hasAvatar)
      // nextProps.showSignIn || this.props.showSignIn || (nextProps.hasAvatar !== this.props.hasAvatar)
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hasAvatar !== this.props.hasAvatar) {
      const user = {...this.state.user};
      user.avatar = this.props.user.avatar;
      user.userName = this.props.user.userName;
      this.setState({user});
    }
  }

  setAvatarBar = (emoji) => {
    const user = {...this.state.user};
    user.avatar = emoji;
    this.setState({user});
  }

  setUserName = (evt) => {
    const user = {...this.state.user};
    user.userName = evt.target.value;
    this.setState({user});
    // this.props.userUpdated()
  }


  onHide = () => {
    this.handleSubmit();
    if (this.props.hasAvatar && this.state.user.userName != "") this.props.closeSignIn();
  }


  userRegister = ({isUser, user}) => {
    // if (DEBUG) console.log("user register!!!")
    if (isUser) {
      alert("username already exists. Please enter a new username.");
    }
    else {
      this.props.setUser(user.userName, user.avatar);
      if (this.props.closeSignIn) this.props.closeSignIn();
      if (this.props.nextStep) this.props.nextStep();
    }
  }

  userRegisterCheck = (userName, avatar) => {
    const userCheck={userName:userName, avatar:avatar};
    socket.emit("registerUser", userCheck, this.userRegister);
  }

  handleSubmit = () => {
    // if (clickedSubmit) {
    const {avatar, userName} = this.state.user;
    if (avatar === "") {
      alert("Please select an emoji avatar");
    }
    else if (userName === "") {
      alert("Please set a user name");
    }
    else if (userName === this.props.user.userName) {
      // console.log("username and props same", userName);
      this.props.setUser(userName, avatar);
    }
    // else {
    //   this.props.userSet(avatar, userName);
    // }alert("Username already taken. Please enter a new user name.");
    else {
      // console.log("check registering user", userName);
      this.userRegisterCheck(userName, avatar);

    }
  }

  render() {
    const w = 540;
    const h = 400;
    let s;
    if (this.props.isFrame) s = this.getFrame(w, h);
    else s = this.getForm(w, h);
    return (s);
  }

  getFrame = (w, h) => {
    return (
      <div className="SignIn" >
        <Frame title="avatar" isHidden={!this.props.showSignIn} onHide={this.onHide} content={
            this.getForm(w, h)
          }
          width={w} height={h} x={(window.innerWidth-w)/2} y={(window.innerHeight-h-34-24)/2} z={2000}
          />
      </div>
    )
  }

  getForm = (w, h) => {
    let {user} = this.state;
    let avatar = user.avatar===""?"👤":user.avatar;
    const emojis = getEmojis();

    return(
      <div className="SignInForm" >

        <div className="SignIn-Box">
          <div className="SignIn-Content">
            <div className="userBar">
              <div className="avatar">{user.avatar}</div>
              <input onChange={this.setUserName} value={user.userName} placeholder="enter user name" inputprops={{ 'aria-label': 'user name field' }} />
            </div>
            <div className="emoji-list">
              {
                emojis.map((emoji, i) => {
                  return <button key={i} onClick={() => this.setAvatarBar(emoji)}>{emoji}</button>
                })
              }
            </div>
            {/* <button onClick={() => this.setAvatar(false)}>Cancel</button>*/}
            {this.getButtons()}
          </div>
        </div>
      </div>
    )
  }

  getButtons = () => {
    let content;
    if (this.props.isFrame) {
      content = <div className="submit"><button className="standardButton" onClick={() => this.handleSubmit(true)}>submit</button></div>
    }
    else {
      content =
      (

        <div className="welcome-buttons">
          <button className="standardButton" onClick={this.props.prevStep}>back</button>
          <button className="standardButton highlightButton" onClick={() => this.handleSubmit(true)}>next</button>
        </div>
      )
    }
    return content;
  }
}

const mapStateToProps = (state) => {
 return {
   user: state.user
 }
}

const mapDispatchToProps = () => {
 return {
   setUser
 }
}


export default connect(mapStateToProps, mapDispatchToProps())(SignIn);
