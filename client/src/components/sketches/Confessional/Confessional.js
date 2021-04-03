import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Confessional.css';
// store
// import { doneLoadingApp } from '../../../store/actions/';


import PearlyGates from './components/PearlyGates/PearlyGates';
import WebZoom from './components/WebZoom';
import BottomBar from './components/Emojis/BottomBar';

import ConfessFormFrame from './components/ConfessForm/ConfessFormFrame';
import ConfessMobileForm from './components/ConfessForm/ConfessMobileForm';
import Candles from './components/Candles/Candles';

import { mapVal, constrain } from '../../shared/Helpers/Helpers';

// import DesktopIcon from '../../shared/DesktopIcon/DesktopIcon';
// import FrameSimple from '../../shared/Frame/FrameSimple';


import ReactPlayer from 'react-player'
// import Moment from 'react-moment';

// import shellSound from "./assets/shell_sound.wav";
// import Glasses from '../../shared/Glasses/Glasses';



const processString = require('react-process-string');


class Confessional extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    const { ui } = this.props;

    this.factor = mapVal(window.innerWidth, 1440, 2560, 1, 1.5);
    this.factor = constrain(this.factor, 1, 1.5);

    this.dimW = 1584 * this.factor * .3;
    this.dimH = 1588 * this.factor * .3;

    this.minVol = .01;





    const bottomBar = 60;
    const spacing = 120;
    this.tweetW = 400;
    this.winX = Math.max((window.innerWidth - this.dimW - this.tweetW - spacing) / 2, 50)
    this.winY = (window.innerHeight - this.dimH - 26 - 30 - bottomBar) / 2 + 30;

    // const webY = winY -50;
    // const webX = tX;
    // const webH = 200;




    this.state = {
      windowX: this.winX,//(window.innerWidth - this.dimW)/2,
      windowY: this.winY,//(window.innerHeight - this.dimH-80)/2,
      tweetX: this.winX + this.dimW + 100,
      tweetY: this.winY + 20,
      webX: this.winX + this.dimW + 100,
      webY: this.winY - 50,
      earCursor: this.props.cursor,
      volume: this.minVol,
      confessFormHidden: true,
      audioOn: true,
      videoOn: true,
      candles: []
    };


    this.memberRef0 = React.createRef();

  }


  componentDidMount() {
    // this.interval = setInterval(this.resetPlayer, 22000);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }



  // resetPlayer = () => {
  //   if (this.videoBack && this.videoMain) {
  //     this.videoBack.currentTime = 0;
  //     this.videoMain.currentTime = .50;
  //   }
  // }

  addCandle = () => {
    // console.log("ADD EMOJI", id);
    const { ui } = this.props;
    const candle = { x: Math.random() * (ui.contentW - 150), y: Math.random() * (ui.contentH - 350) };
    this.setState(prevState => ({
      candles: [...prevState.candles, candle]
    }))
  }


  onSubmit = () => {
    alert("Thanks for your submission. Uploading to the cloud...");
    this.props.history.push("/confessions");
  }

  toggleAudio = () => {
    this.setState(prevState => ({
      audioOn: !prevState.audioOn
    }));
  }

  toggleVideo = () => {
    this.setState(prevState => ({
      videoOn: !prevState.videoOn
    }));
  }

  render() {
    const { tweetX, tweetY } = this.state;
    const { ui } = this.props;
    if (ui.isMobile || ui.hasFooter) {
      return this.getMobile();
    }
    return this.getDesktop();
  }

  getButtonSty = (gates, ui) => {
    let buttonW = 140;
    let sp = 10;
    const buttonSty = { top: 0, left: 0, position: "absolute" };
    // if (ui.orientation === "portrait") {
      buttonSty.top = gates.y + gates.dim + sp * 2 + ui.toolbarH;
      buttonSty.left = ui.contentW / 2 - buttonW / 2;
    // }
    // else {

    // }
    return buttonSty;
  }

  getPearlyGatesDim = (ui) => {
    const pearly = { x: this.winX, y: this.winY, dim: 475 };
    let sp = 10;
    let buttonH = 36;
    // if (ui.orientation === "portrait") {
      let availW = ui.contentW - sp * 2 - 4;
      let availH = ui.contentH - ui.toolbarH - sp * 3 - buttonH;
      let d = Math.min(availW, availH);
      pearly.dim = Math.min(d, pearly.dim);
      pearly.x = (ui.contentW - pearly.dim) / 2 - 2;
      pearly.y = (ui.contentH - pearly.dim - sp - ui.toolbarH - buttonH) / 2;
    // }
    // else {

    // }
    return pearly;

  }


  getMobile = () => {
    const { confessFormHidden } = this.state;
    const { ui } = this.props;

    const gates = this.getPearlyGatesDim(ui);
    const buttonSty = this.getButtonSty(gates, ui);

    return (
      <div className="Confessional Sketch">
        <div className="confessions-form">
          <PearlyGates w={gates.dim} h={gates.dim} x={gates.x} y={gates.y} />
          <button className="standardButton confess-button-primary" style={buttonSty} onClick={this.showConfess}>confess</button>
          <ConfessMobileForm
            isHidden={confessFormHidden}
            onHide={this.hideConfess}
            onSubmit={this.onSubmit}
            ui={ui}
          />

        </div>
      </div>
    )
  }

  showConfess = () => {
    this.setState({ confessFormHidden: false });
  }

  hideConfess = () => {
    this.setState({ confessFormHidden: true });
  }

  getDesktop = () => {
    const { tweetX, tweetY, webX, webY, windowX, windowY, audioOn, videoOn, candles } = this.state;

    return (
      <div className="Confessional Sketch">
        <div className="confessions-form">
          <PearlyGates w={this.dimW} h={this.dimH} x={windowX} y={windowY} />
          <div className="member" ref={this.memberRef0}>
            <WebZoom videoOn={videoOn} audioOn={audioOn} x={webX} y={webY} factor={this.factor} />
          </div>
          <ConfessFormFrame w={this.tweetW} h={310} x={tweetX} y={tweetY - 20} onSubmit={this.onSubmit} />
          <Candles candles={candles} />
          <BottomBar audioOn={audioOn} videoOn={videoOn} toggleAudio={this.toggleAudio} toggleVideo={this.toggleVideo} addCandle={this.addCandle} />
        </div>
      </div>
    )
  }

}




const mapStateToProps = (state) => {
  return {
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    // doneLoadingApp
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps())(Confessional));
