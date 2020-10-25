import React from 'react';
import './Windows.css';

import Frame from '../../../shared/Frame/Frame';
import Window from './Window';

import {getNewZIndices} from '../../../shared/Helpers/Helpers';

class Windows extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    const w = 150;
    const h = 150;
    const spacing = 20;

    this.state = {
      ogPositions : initOgPos(w, h, spacing),
      positions: initPos(w, h, spacing),
      zIndicesFrames: initZIndices()
    }

    this.imgs = [
      "/assets/s3-bucket/test/palm.png",

    ]
  }


  componentDidMount() {
  }

  componentWillUnmount() {
  }



  onDrag = (i, position) => {
    const positions = [...this.state.positions];
    const p = {...positions[i]};
    p.x = position.x;
    p.y = position.y;
    positions[i] = p;
    // this.setState({positions});
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
      <div className="Windows Sketch">
        {this.getFrames()}
      </div>
    );
  }

  getFrames = () => {
    const w = 130;
    const h = w;
    const {zIndicesFrames, ogPositions, positions} = this.state;

    return (
      this.state.positions.map((pos, i) => {
        const props = {
          z: zIndicesFrames[i],
          ogPos: ogPositions[i],
          pos: positions[i],
          w: w,
          h: h,
          id: i,
          newFrameToTop: this.newFrameToTop,
          onDblClick: this.onDblClick
        };
        return <Window key={i} {...props} />
      })
    )
  }

}

function initZIndices() {
  let ind = [];
  for (let i = 0; i < 100; i++) {
    ind.push(i);
  }
  return ind;
}

function initPos(w, h, spacing) {
  const positions = [];
  for (let x = spacing; x < window.innerWidth; x += w+ spacing) {
    for (let y = spacing; y < window.innerHeight; y += h + spacing + 24) {
      positions.push({x: 0, y: 0})
    }
  }
  return positions;
}

function initOgPos(w, h, spacing) {
  const positions = [];

  let i = 0;
  for (let x = spacing; x < window.innerWidth; x += w+ spacing) {
    for (let y = spacing; y < window.innerHeight; y += h + spacing + 24) {
      // const xx = i%2===0?x-spacing/2:x;
      positions.push({x: x, y: y})
      i++;
    }

  }
  return positions;
}


export default Windows;
