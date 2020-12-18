import React from 'react';
import { withRouter } from "react-router-dom";
import { getEmojis } from '../Welcome/components/Helpers';
import Frame from '../Frame/Frame';
import './SignIn.css';
import './SignInForm.css';

// store
import { connect } from 'react-redux';
import { setUser } from '../../../store/actions/user';
import { resetApp } from '../../../store/actions';

import socket from "../Socket/Socket";



class SignIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      localAvatar: props.user.avatar,
      localUserName: props.user.userName
      // user: { avatar: props.user.avatar, userName: props.user.userName },
    }
  }

  componentDidMount() {
    if(this.props.setClick )this.props.setClick(this.handleSubmit);
  }

  // basically, don't re-render this component unless that signin window
  // has opened?
  // have to check both nextProps && this props. not exactly sure of
  // explanation at the moment
  
  shouldComponentUpdate(nextProps, nextState) {
    const update = (
      (nextProps.showSignIn !== this.props.showSignIn)
      || (nextState.localUserName !== this.state.localUserName)
      || (nextState.localAvatar !== this.state.localAvatar)
      || (nextProps.hasAvatar !== this.props.hasAvatar)
      // nextProps.showSignIn || this.props.showSignIn || (nextProps.hasAvatar !== this.props.hasAvatar)
    );

    // console.log("update signing?", update, nextState.user.userName, this.state.user.userName);
    return update;
  }


  componentDidUpdate(prevProps) {

    // THIS COMES IN IF THE PAGE LOADS AND THERE AREN'T ANY COOKIES,
    // AND THEN COOKIES LOAD
    if (prevProps.hasAvatar !== this.props.hasAvatar) {

      // console.log("avatars");
      // const user = { ...this.state.user };
      // user.avatar = this.props.user.avatar;
      // user.userName = this.props.user.userName;
      this.setState({ localAvatar: this.props.user.avatar, localUserName: this.props.user.userName });
    }
  }

  setAvatarBar = (emoji) => {
    // const user = { ...this.state.user };
    // user.avatar = emoji;
    // this.setState({ user });
    this.setState({ localAvatar: emoji })
  }

  setUserName = (evt) => {
    // const user = { ...this.state.user };
    // user.userName = evt.target.value;
    if (evt.target.value.length < 17) {
      this.setState({ localUserName: evt.target.value });
    }
    else {
      alert ("user name is too many letters");
    }
    // this.props.userUpdated()
  }


  onHide = () => {
    this.handleSubmit();
    if (this.props.hasAvatar && this.state.localUserName != "") this.props.closeSignIn();
  }


  userRegister = ({ isUser, user }) => {
    // console.log("user register!!!")
    if (isUser) {
      alert("username already exists. Please enter a new username.");
    }
    else {
      // console.log("--------register--------");
      this.submitSuccess(user.userName, user.avatar);
      //
    }
  }

  submitSuccess = (userName, avatar) => {
    this.props.setUser(userName, avatar);

    // set the local state to this registered state
    // const userLocal = { ...this.state.user };
    // userLocal.avatar = avatar;
    // userLocal.userName = userName;
    this.setState({ localAvatar: avatar, localUserName: userName });
    // console.log("why", userName, avatar);

    if (this.props.closeSignIn) this.props.closeSignIn(); // frame
    else if (this.props.nextStep) this.props.nextStep(); // welcome page

  }

  userRegisterCheck = (userName, avatar) => {
    // console.log("checking", userName);
    const userCheck = { userName: userName, avatar: avatar };
    socket.emit("registerUser", userCheck, this.userRegister);
  }

  handleSubmit = () => {
    // if (clickedSubmit) {
    // console.log("submit");
    const avatar = this.state.localAvatar;
    const userName = this.state.localUserName;
    // const { localAvatar, userName } = this.state;
    if (avatar === "") {
      alert("Please select an emoji avatar");
    }
    else if (userName === "") {
      alert("Please set a user name");
    }
    else if (userName === this.props.user.userName) {
      // console.log("username and props same", userName);
      // this.props.setUser(userName, avatar);
      // if (this.props.closeSignIn) this.props.closeSignIn();
      // if (this.props.nextStep) this.props.nextStep();
      this.submitSuccess(userName, avatar)
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
    const { w, h } = this.props;
    let s;
    if (this.props.isFrame) s = this.getFrame(w, h);
    else s = this.getForm(w, h);
    return (s);
  }

  getFrame = (w, h) => {
    const x = (window.innerWidth - this.props.w) / 2;
    const y = (window.innerHeight - this.props.h - 34 - 24) / 2;
    const classN = "SignIn" + (this.props.showSignIn ? " GrayedOut":"");
    return (
      <div className={classN} >
        <Frame title="avatar" isHidden={!this.props.showSignIn} onHide={this.onHide} content={
          this.getForm(w, h)
        }
          width={w} height={h} x={x} y={y} z={2000}
        />
      </div>
    )
  }

  getForm = (w, h) => {
    let { localAvatar, localUserName } = this.state;
    // console.log("agg", localAvatar, localUserName);
    // let avatar = user.avatar===""?"👤":user.avatar;
    const emojis = getEmojis();

    return (
      <div className="SignInForm" >

        <div className="SignIn-Box">
          <div className="SignIn-Content">
            <div className="userBar">
              <div className="avatar">{localAvatar}</div>
              <input onChange={this.setUserName} value={localUserName} placeholder="enter user name" inputprops={{ 'aria-label': 'user name field' }} />
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

  resetApp = () => {
    // reset cookies?
    console.log("resetting");
    this.props.closeSignIn();
    this.props.resetApp();
    // this.props.history.push("/");
    window.location.href = "/";
  }

  getButtons = () => {
    let content;
    if (this.props.isFrame) {
      content =
        <div className="welcome-buttons submit">
          <button className="standardButton secondary" onClick={this.resetApp}>logout</button>
          <button className="standardButton primary" onClick={this.handleSubmit}>update</button>

        </div>
    }
    else {
      content = null;
      // content =
      //   (

      //     <div className="welcome-buttons">
      //       <button className="standardButton" onClick={this.props.prevStep}>back</button>
      //       <button className="standardButton highlightButton" onClick={() => this.handleSubmit(true)}>next</button>
      //     </div>
      //   )
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
    resetApp,
    setUser
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(SignIn));
