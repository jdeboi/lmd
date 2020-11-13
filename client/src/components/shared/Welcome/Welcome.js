import React from 'react';
import './Welcome.css';

import MFADeets from './components/MFADeets';
import SignIn from '../SignIn/SignIn';
import Instructions from './components/Instructions';
import { getEmojis } from './components/Helpers';
import Glasses from './components/Glasses';

import Frame from '../Frame/Frame';

class Welcome extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    // const {avatar, userName} = this.props.user;

    this.state = {
      step: 0,
      title: "Welcome"
    }


    this.onHide = this.onHide.bind(this);
  }

  // basically, don't re-render this component unless that signin window
  // has opened?
  // have to check both nextProps && this props. not exactly sure of
  // explanation at the moment
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.showWelcome || this.props.showWelcome || (nextProps.hasAvatar !== this.props.hasAvatar) || (nextState.step !== this.state.step)
  //   );
  // }




  onHide() {
    alert("nope");
    // this.handleSubmit();
    // if (this.props.hasAvatar && this.state.user.userName != "") this.props.closeSignIn();
  }

  render() {
    const w = 540;
    const h = 400;

    const emojis = getEmojis();
    const content = this.getWelcomeStep(this.state.step);
    // const isHidden={!this.props.showSignIn}
    return (
      <div className="Welcome" style={{ display: this.props.showWelcome ? "block" : "none" }}>
        <Frame title={this.state.title} isHidden={false} onHide={this.onHide} windowStyle={{ backgroundColor: "white" }} content={
          content
        }
          width={w} height={h} x={(window.innerWidth - w) / 2} y={(window.innerHeight - h - 34 - 24) / 2} z={2000}
        />
      </div>
    );


  }

  getWelcomeStep = (step) => {
    if (step === 0) return <MFADeets nextStep={this.nextStep} />
    else if (step === 1) return <SignIn {...this.props} nextStep={this.nextStep} prevStep={this.prevStep} isFrame={false} />;
    else if (step === 2) return <Instructions prevStep={this.prevStep} nextStep={this.nextStep} />
    else if (step == 3) return <Glasses prevStep={this.prevStep} closeWelcome={this.props.closeWelcome} />
    return null;
  }


  prevStep = () => {
    const step = this.state.step;
    // var step = this.state.step;
    // step += 1;
    var title = "";
    if (step - 1 === 1) title = "avatar";
    else if (step - 1 === 2) title = "instructions";
    this.setState({ step: step - 1, title });
  }

  nextStep = () => {
    const step = this.state.step;
    // var step = this.state.step;
    // step += 1;
    var title = "";
    if (step + 1 === 1) title = "avatar";
    else if (step + 1 === 2) title = "instructions";
    else if (step + 1 === 3) title = "3D glasses";
    this.setState({ step: step + 1, title });
  }

}

export default Welcome;
