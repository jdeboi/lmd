import React from 'react';
import './Welcome.css';
import '../SignIn/SignIn.css';
// import '../CenterModal/CenterModal.css';

// store
import { connect } from 'react-redux';

// components
import CenterModal from '../CenterModal/CenterModal';
import MFADeets from './components/MFADeets';
import SignIn from '../SignIn/SignIn';
import FAQ from '../FAQ/FAQ';
import Glasses from './components/Glasses';


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
    alert("Sorry, please click through to the end of this dialog box.");
    // this.handleSubmit();
    // if (this.props.hasAvatar && this.state.user.userName != "") this.props.closeSignIn();
  }

  render() {
    const { ui, showWelcome } = this.props;
    const content = this.getWelcomeStep(this.state.step);
    const buttons = this.getButtons(this.state.step);
    return (
      <CenterModal
        title={this.state.title}
        isHidden={!showWelcome}
        onHide={this.onHide}
        ui={ui}
        z={2500}
        isRelative={false}
        classN="Welcome"
        content={content}
        buttons={buttons}
      />
    );


  }

  getWelcomeStep = (step) => {
    if (step === 0)
      return <MFADeets width={this.props.ui.width} />
    else if (step === 1)
      return <SignIn {...this.props} setClick={click => this.clickSubmit = click} nextStep={this.nextStep} prevStep={this.prevStep} isFrame={false} />;
    else if (step === 2)
      return <FAQ />
    else if (step == 3)
      return <Glasses />
    return null;
  }

  getButtons = (step) => {
    if (step === 0)
      return (
        <div className="center-buttons">
          <button className="standardButton primary" onClick={this.nextStep}>next</button>
        </div>
      );
    else if (step === 1)
      // https://stackoverflow.com/questions/37949981/call-child-method-from-parent
      return (
        <div className="center-buttons">
          <button className="standardButton secondary" onClick={this.prevStep}>back</button>
          <button className="standardButton primary" onClick={() => this.clickSubmit()}>next</button>
        </div>
      );
    else if (step === 2)
      return (
        <div className="center-buttons">
          <button className="standardButton secondary" onClick={this.prevStep}>back</button>
          <button className="standardButton primary" onClick={this.nextStep}>next</button>
        </div>
      );
    else if (step == 3)
      return (
        <div className="center-buttons">
          <button className="standardButton secondary" onClick={this.prevStep}>back</button>
          <button className="standardButton primary" onClick={this.props.closeWelcome}>finish</button>
        </div>
      );
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


const mapStateToProps = (state) => {
  return {
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Welcome);
