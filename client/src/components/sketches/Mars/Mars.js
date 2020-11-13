import React from 'react';
import "./Mars.css";
import Frame from '../../shared/Frame/Frame';


// import Slider from '@material-ui/core/Slider';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';


import {onRender, onSceneReady} from './components/BabylonWater';
import BabylonWaterScene from './components/BabylonWater';
import SwimLane from './components/SwimLane';
import PoolButtons from './components/PoolButtons';
import Chairs from './components/Chairs';
import BigCrater from './components/BigCrater';

// import Glasses from '../../shared/Glasses/Glasses';



class Mars extends React.Component {

  constructor(props) {
    super(props);

    this.poolVid0 = window.AWS+"/mars/pool/mars_0.mp4"
    this.poolVid1 = window.AWS+"/mars/pool/mars_1.mp4"
    this.poolVid2 = window.AWS+"/mars/pool/mars_2.mp4"
    this.poolVid3 = window.AWS+"/mars/pool/mars_3.mp4"

    this.state = {
      poolVid: this.poolVid1
    }

  }


  componentDidMount() {
    this.props.addClass("overflow-all");
    // this.props.userSetRoom("esc-to-mars");
  }

  componentWillUnmount() {
    this.props.removeClass("overflow-all");
    // this.props.userLeaveRoom("esc-to-mars");
  }


  buttonClick = (num) => {
    let vids = [this.poolVid0, this.poolVid1, this.poolVid2, this.poolVid3];
    this.setState({poolVid: vids[num]});
  }

  render() {
    const headerBarH = 34;
    const toolbarH = 26;
    const spacing = 25;

    const dimensions = this.props.dimensions;
    const {windowWidth, windowHeight} = dimensions;

    const sketchW = 1275;
    const sketchH = 640+toolbarH;
    // 1325, 716
    // console.log("min w/h:", sketchW+spacing*2, sketchH+spacing*2);

    const startX = Math.max((windowWidth-sketchW)/2, spacing);
    const startY = Math.max(((windowHeight-headerBarH)-sketchH)/2, spacing);

    const pool = {
      x: startX,
      h:  640,
      y: startY,
      w: 0
    };
    pool.w =  548/1080 * pool.h;

    const chairs = {
      w: 600,
      h: 200,
      x: pool.x + pool.w + spacing,
      y: pool.y
    };
    const smallCrater = {
      w: 300,
      h: 300,
      x: chairs.x + chairs.w + spacing,
      y: pool.y
    };
    const bab = {
      w: chairs.w,//500,
      h: pool.h - chairs.h - spacing - toolbarH,
      y: chairs.y + chairs.h + toolbarH + spacing,
      x: pool.x + pool.w + spacing//chairs.x + chairs.w - 500
    };
    const board = {
      w: 500,
      h: 152,
      x: smallCrater.x + smallCrater.w - 500,
      y: pool.y + pool.h - 152
    };
    const swimLaneFrame = {
      w: 80,
      h: 36*8.8,//bab.h,
      x: bab.x + 30,//pool.x + pool.w + spacing,
      y: bab.y + 50//chairs.y + chairs.h + toolbarH + spacing
    };

    const tank ={
      w: smallCrater.w,
      h: pool.h-smallCrater.h - board.h-2*toolbarH-2*spacing,
      x: smallCrater.x,
      y: smallCrater.h + smallCrater.y + toolbarH + spacing
    }

    return (
      <div className="Mars Sketch">
        <BigCrater w={pool.w} h={pool.h} x={pool.x} y={pool.y} poolVid={this.state.poolVid} />
        <Frame title="" content={
            <div className="smallCrater"><div className="bubbles"><img src={window.AWS+"/mars/bubbles3.gif"} width={smallCrater.w} height={smallCrater.h} /></div></div>
          }
          width={smallCrater.w} height={smallCrater.h} x={smallCrater.x} y={smallCrater.y}
          />
        <PoolButtons w={tank.w} h={tank.h} x={tank.x} y={tank.y} buttonClick={this.buttonClick} />
        <Chairs w={chairs.w} h={chairs.h} x={chairs.x} y={chairs.y} />
        <BabylonWaterScene w={bab.w} h={bab.h} x={bab.x} y={bab.y} />
        <Frame title="" content={<div className="diving"></div>} width={board.w} height={board.h} x={board.x} y={board.y} />
        <SwimLane w={swimLaneFrame.w} h={swimLaneFrame.h} x={swimLaneFrame.x} y={swimLaneFrame.y} />

        {/*Glasses />*/}
      </div>
    )
  }


  getLabel(num) {
    return <div><span className="swimSign">{num}</span>ft</div>;
    }

  }


  export default Mars;
