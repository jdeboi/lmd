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

    let factor = .3;
    this.dimW = 1584 * factor;
    this.dimH = 1588 * factor;

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
      confessFormHidden: true
    };

    factor = 0.1;
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

  onSubmit = () => {
    alert("thanks for your submission. uploading to the cloud");
    this.props.history.push("/confessions");
  }

  render() {
    const { tweetX, tweetY } = this.state;
    const { ui } = this.props;
    if (ui.isMobile || ui.hasFooter) {
      return this.getMobile();
    }
    return this.getDesktop();
  }


  // {/*this.getEarMenu()*/}
  // {/* <ReactAudioPlayer
  //   src={window.AWS + "/waveforms/shell_sound.wav"}
  //   autoPlay={true}
  //   volume={this.state.volume}
  //   controls={false}
  //   loop={true}
  //   ref={player => {
  //     this.audioPlayer = player;
  //   }}
  //   /> */}
  // {/* </div>*/}

  getMobile = () => {
    const { windowX, windowY, confessFormHidden } = this.state;
    const { ui } = this.props;

    let sp = 10;
    let buttonH = 36;
    let dim = 475;
    let x = this.winX;
    let y = this.winY;
    const buttonSty = { top: 0, left: 0, position: "absolute"};
    if (ui.orientation === "portrait") {
      let availW = ui.contentW - sp * 2 - 4;
      let availH = ui.contentH - ui.toolbarH - sp * 3 - buttonH;
      let d = Math.min(availW, availH);
      dim = Math.min(d, dim);
      x = (ui.contentW - dim) / 2 - 2;
      y = (ui.contentH - dim - sp - buttonH) / 2;
      buttonSty.top = y + dim + sp*2 + ui.toolbarH;
      buttonSty.left = ui.contentW/2 - 140/2;
    }

    return (
      <div className="Confessional Sketch">
        <div className="confessions-form">
          <PearlyGates w={dim} h={dim} x={x} y={y} />
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
    const { tweetX, tweetY, webX, webY, windowX, windowY } = this.state;

    return (
      <div className="Confessional Sketch">
        <div className="confessions-form">
          <PearlyGates w={this.dimW} h={this.dimH} x={windowX} y={windowY} />
          <div className="member" ref={this.memberRef0}>
            <WebZoom x={webX} y={webY} />
          </div>
          <ConfessFormFrame w={this.tweetW} h={310} x={tweetX} y={tweetY-20} onSubmit={this.onSubmit} />
          <BottomBar />
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
