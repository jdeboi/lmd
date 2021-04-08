import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Confessional.css';
// store
// import { doneLoadingApp } from '../../../store/actions/';
import { setSketchMusic } from '../../../store/actions/music';

import PearlyGates from './components/PearlyGates/PearlyGates';
import WebZoom from './components/WebZoom';
import BottomBar from './components/Emojis/BottomBar';

import ConfessFormFrame from './components/ConfessForm/ConfessFormFrame';
import ConfessMobileForm from './components/ConfessForm/ConfessMobileForm';
import Candles from './components/Candles/Candles';

import { mapVal, constrain } from '../../shared/Helpers/Helpers';



const processString = require('react-process-string');


class Confessional extends React.Component {

  constructor(props) {
    super(props);

    const { ui } = this.props;

    // this.factor = mapVal(window.innerWidth, 1440, 2560, 1, 1.5);
    // this.factor = constrain(this.factor, 1, 1.5);


    this.state = {
      confessFormHidden: true,
      audioOn: true,
      videoOn: true,
      candles: []
    };


    // this.memberRef0 = React.createRef();

  }


  componentDidMount() {
    // this.interval = setInterval(this.resetPlayer, 22000);
    this.props.setSketchMusic("cloud", 0, 1);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }



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

  getAllDim = (ui) => {

    let factor = mapVal(ui.contentW, 1440, 2560, 1, 1.5);
    factor = constrain(factor, 1, 1.5);

    const bottomBarH = 60;
    // const spacing = 120;
    const sideFrameSpaceY = 50;
    const sideFrameSpaceX = 100;

    const confessDim = {
      w: 400,
      h: 310
    }
    const zoomDim = {
      w: Math.floor(230 * 1.4),
      h: Math.floor(130 * 1.4)
    }
    const pearlyDim = {
      w: 1584 * factor * .3,
      h: 1588 * factor * .3
    }
    const totalFramesW = pearlyDim.w + confessDim.w + sideFrameSpaceX;
    const totalFramesH = pearlyDim.h + ui.toolbarH;
    pearlyDim.x = Math.max((ui.contentW - totalFramesW) / 2, 50);
    pearlyDim.y = (ui.contentH - totalFramesH - bottomBarH) / 2;

  
    const totalSideFrameH = zoomDim.h + confessDim.h + 2 * ui.toolbarH + sideFrameSpaceY;

    zoomDim.y = (ui.contentH - totalSideFrameH - bottomBarH/2) / 2;
    zoomDim.x = pearlyDim.x + pearlyDim.w + sideFrameSpaceX;


    confessDim.x = zoomDim.x;
    confessDim.y = zoomDim.y + zoomDim.h + sideFrameSpaceY;

    return { confessDim, pearlyDim, zoomDim, factor };
  }

  getPearlyGatesDimMobile = (ui) => {
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

    const gates = this.getPearlyGatesDimMobile(ui);
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
    const { audioOn, videoOn, candles } = this.state;

    const { ui } = this.props;
    const dimensions = this.getAllDim(ui);
    const { pearlyDim, confessDim, zoomDim } = dimensions;

    return (
      <div className="Confessional Sketch">
        <div className="confessions-form">
          <PearlyGates
            w={pearlyDim.w}
            h={pearlyDim.h}
            x={pearlyDim.x} //windowX
            y={pearlyDim.y} // winidowY
          />
          {/* <div className="member" ref={this.memberRef0}> */}
          <WebZoom
            videoOn={videoOn}
            audioOn={audioOn}
            x={zoomDim.x}
            y={zoomDim.y}
            w={zoomDim.w}
            h={zoomDim.h}
          />
          {/* </div> */}
          <ConfessFormFrame
            w={confessDim.w}
            h={confessDim.h}
            x={confessDim.x}
            y={confessDim.y}
            onSubmit={this.onSubmit}
          />
          <Candles candles={candles} />
          <BottomBar
            audioOn={audioOn}
            videoOn={videoOn}
            toggleAudio={this.toggleAudio}
            toggleVideo={this.toggleVideo}
            addCandle={this.addCandle}
          />
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
    setSketchMusic
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps())(Confessional));
