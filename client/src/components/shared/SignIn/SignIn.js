import React from 'react';
import { withRouter } from "react-router-dom";
import { getEmojis } from '../Welcome/components/Helpers';
import CenterModal from '../CenterModal/CenterModal';

import './SignIn.css';

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
    if (this.props.setClick) this.props.setClick(this.handleSubmit);
  }

  // basically, don't re-render this component unless that signin window
  // has opened?
  // have to check both nextProps && this props. not exactly sure of
  // explanation at the moment

  shouldComponentUpdate(nextProps, nextState) {
    const update = (
      (nextProps.showSignIn !== this.props.showSignIn)
      || (nextProps.menu !== this.props.menu)
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
      this.setState({ localAvatar: this.props.user.avatar, localUserName: this.props.user.userName });
    }
  }

  setAvatarBar = (emoji) => {
    this.setState({ localAvatar: emoji })
  }

  setUserName = (evt) => {
    if (evt.target.value.length < 17) {
      this.setState({ localUserName: evt.target.value });
    }
    else {
      alert("user name is too many letters");
    }
  }


  onHide = () => {
    this.handleSubmit();
    if (this.props.hasAvatar && this.state.localUserName != "") this.props.closeSignIn();
  }


  userRegister = ({ isUser, user }) => {
    if (isUser) {
      alert("username already exists. Please enter a new username.");
    }
    else {
      this.submitSuccess(user.userName, user.avatar);
    }
  }

  submitSuccess = (userName, avatar) => {
    this.props.setUser(userName, avatar);

    // set the local state to this registered state
    this.setState({ localAvatar: avatar, localUserName: userName });
    if (this.props.closeSignIn) this.props.closeSignIn(); // frame
    else if (this.props.nextStep) this.props.nextStep(); // welcome page

  }

  userRegisterCheck = (userName, avatar) => {
    const userCheck = { userName: userName, avatar: avatar };
    socket.emit("registerUser", userCheck, this.userRegister);
  }

  handleSubmit = () => {
    const avatar = this.state.localAvatar;
    const userName = this.state.localUserName;
    if (avatar === "") {
      alert("Please select an emoji avatar");
    }
    else if (userName === "") {
      alert("Please set a user name");
    }
    else if (userName === this.props.user.userName) {
      this.submitSuccess(userName, avatar)
    }
    else {
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

  getFrame = () => {
    const {ui, menu, showSignIn} = this.props;
    const isHidden = ui.isMobile? menu !== "user" : !showSignIn;
    console.log(isHidden);
    return (
      <CenterModal
        title="avatar"
        isHidden={isHidden}
        onHide={this.onHide}
        ui={ui}
        classN="SignIn"
        content={this.getForm()}
        buttons={this.getButtons()}
      />
    )
  }

  getForm = () => {
    let { localAvatar, localUserName } = this.state;
    const emojis = getEmojis();

    return (
      <React.Fragment>
        <div className="userBar flexItem flexPad flexRow">
          <div className="avatar">{localAvatar}</div>
          <input onChange={this.setUserName} value={localUserName} placeholder="enter username" inputprops={{ 'aria-label': 'user name field' }} />
        </div>
        <div className="emoji-list flexItem flexPad flex1">
          {
            emojis.map((emoji, i) => {
              return <button key={i} onClick={() => this.setAvatarBar(emoji)}>{emoji}</button>
            })
          }
        </div>
      </React.Fragment>
    )
  }

  resetApp = () => {
    // reset cookies?
    // console.log("resetting");
    this.props.closeSignIn();
    this.props.resetApp();
    // this.props.history.push("/");
    window.location.href = "/";
  }

  getButtons = () => {
    let buttons;
    if (this.props.isFrame) {
      buttons =
        <div className="center-buttons flexItem">
          <button className="standardButton secondary" onClick={this.resetApp}>logout</button>
          <button className="standardButton primary" onClick={this.handleSubmit}>update</button>

        </div>
    }
    else {
      buttons = null;
    }
    return buttons;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    ui: state.ui,
    menu: state.menu
  }
}

const mapDispatchToProps = () => {
  return {
    resetApp,
    setUser
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(SignIn));
