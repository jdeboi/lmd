import React from 'react';
import {getEmojis} from '../Welcome/components/Helpers';
import './SignInForm.css';

class SignInForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {avatar:props.user.avatar, userName:props.user.userName},
    }
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

  canClose = () => {
    return this.props.hasAvatar && this.state.user.userName != "";
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
      this.props.userSet(userName, avatar);
      if (this.props.nextStep) this.props.nextStep();
    }
    // else {
    //   this.props.userSet(avatar, userName);
    // }alert("Username already taken. Please enter a new user name.");
    else {
      // console.log("check registering user", userName);
      this.props.userRegisterCheck(userName, avatar);
      if (this.props.nextStep) this.props.nextStep();
    }

    // }
    // else {
    //   alert("Creating randomized avatar and user name.");
    //   const num = Math.floor(Math.random()*1000);
    //   this.props.userSet(this.getRandomEmoji(), `user-${num}`);
    // }
  }

  render() {

    const w = 540;
    const h = 400;


    return (

    );
  }

  getFrame = (w, h) => {
    return (
      <div className="SignIn" >
        <Frame title="avatar" isHidden={!this.props.showSignIn} onHide={this.onHide} content={
            {this.getForm(w, h)}
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
              <input onChange={this.setUserName} value={user.userName} placeholder="enter user name" inputProps={{ 'aria-label': 'user name field' }} />
            </div>
            <div className="emoji-list">
              {
                emojis.map((emoji, i) => {
                  return <button key={i} onClick={() => this.setAvatarBar(emoji)}>{emoji}</button>
                })
              }
            </div>
            {/* <button onClick={() => this.setAvatar(false)}>Cancel</button>*/}
            <div className="submit"><button onClick={() => this.handleSubmit(true)}>Submit</button></div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignInForm;
