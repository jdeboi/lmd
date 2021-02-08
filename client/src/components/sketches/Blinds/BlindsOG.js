import React from 'react';
import './Blinds.css';

import Frame from '../../shared/Frame/Frame';
import Window from './Window';

import {getNewZIndices} from '../../shared/Helpers/Helpers';

class Blinds extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.w = 160;
    this.h = this.w;
    this.bufferX = 40; // buffer
    this.bufferY = 20; // buffer
    this.spacing = 20; // between elements
    this.numFramesW = Math.floor((window.innerWidth-2*this.bufferX+this.spacing)/(this.w+this.spacing));
    this.numFramesH = Math.floor((window.innerHeight-34-2*this.bufferY+this.spacing)/(this.h+24+this.spacing));
    this.startX = (window.innerWidth - this.numFramesW*(this.w+this.spacing)+this.spacing)/2;
    this.startY = 34+this.bufferY; //(window.innerHeight-this.numFramesH*(this.h+24+this.spacing)+this.spacing)/2;
    
    this.state = {
      ogPositions : this.initOgPos(),
      positions: this.initPos(),
      zIndicesFrames: initZIndices(),
      blindMode: 0,
      mx: 0,
      my: 0
    }
  }


  componentDidMount() {
    this.blindInterval = setInterval(this.changeBlindMode, 8000);
    // this.props.userSetRoom("blind-spot");
  }

  componentWillUnmount() {
    // this.props.userLeaveRoom("blind-spot");
    clearInterval(this.blindInterval);
  }

  handleMouseMove = e => {
    this.setState({
      mx: e.clientX,
      my: e.clientY
    });
  };

  changeBlindMode = () => {
    var blindMode = this.state.blindMode;
    if (blindMode + 1 > 4) this.setState({blindMode: 0});
    else this.setState({blindMode: blindMode+1});
    // this.setState({blindMode: 3});
  }



  newFrameToTop = (id) => {
    const newZ = getNewZIndices(id, this.state.zIndicesFrames);
    this.setState({zIndicesFrames: newZ});
    // console.log("ZZZ", this.state.zIndices);
  }

  onDblClick = (id) => {
    // console.log(id);
    this.newFrameToTop(id);
  }





  render() {

    // const xs = [0, 150, 300, 450, 600];

    return (
      <div className="Blinds Sketch" onMouseMove={this.handleMouseMove}>
        {this.getFrames()}
      </div>
    );
  }

  getFrames = () => {
    const {zIndicesFrames, ogPositions, positions, mx, my} = this.state;
    const imgW = (this.w+this.spacing)*4;
    const imgH = (this.h+24+this.spacing)*4;

    return (

      this.state.positions.map((pos, i) => {
        // console.log(ogPositions[i]);

        const props = {
          z: zIndicesFrames[i],
          ogPos: ogPositions[i],
          pos: positions[i],
          w: this.w,
          h: this.h,
          id: i,
          imgW: imgW,
          imgH: imgH,
          startX: this.startX,
          startY: this.startY,
          mx: mx,
          my: my,
          title: "", // this.getLetter(i),
          newFrameToTop: this.newFrameToTop,
          onDblClick: this.onDblClick,
          mode: this.state.blindMode
        };
        return <Window key={i} {...props} />
      })
    )
  }

  getLetter = (i) => {
    const x = Math.floor(i/this.numFramesH);
    const y = i%this.numFramesH;
    const iPrime = x + y * this.numFramesW;

    // const str = "blind eye";
    // if (iPrime >= str.length) return "";
    // return str.substring(iPrime, iPrime+1);
    // if (iPrime === 0) return "blind";
    // else if (iPrime === 1) return "eye";
    if (i === 0) return "blind";
    else if (i === 1) return "eye";
    return "";
  }

  initOgPos = () => {
    const positions = [];
    // let i = 0;
    for (let x = 0; x < this.numFramesW; x++) {
      for (let y = 0; y < this.numFramesH; y++) {
        // const xx = i%2===0?x-spacing/2:x;
        const xx = this.startX + x*(this.w+this.spacing);
        const yy = this.startY + y*(this.h + this.spacing + 24);
        positions.push({x: xx, y: yy})
        // i++;
      }

    }
    return positions;
  }

  initPos = () => {
    const positions = [];
    for (let x = 0; x < this.numFramesW; x++) {
      for (let y = 0; y < this.numFramesH; y++) {
        positions.push({x: 0, y: 0})
      }
    }
    return positions;
  }
}

function initZIndices() {
  let ind = [];
  for (let i = 0; i < 100; i++) {
    ind.push(i);
  }
  return ind;
}



export default Blinds;
