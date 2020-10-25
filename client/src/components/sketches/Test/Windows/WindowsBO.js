import React from 'react';
import './Windows.css';

import Frame from '../../../shared/Frame/Frame';
import DesktopIcon from '../../../shared/DesktopIcon/DesktopIcon';

import {getNewZIndices} from '../../../shared/Helpers/Helpers';

class Windows extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.state = {
      pos0: {x: 0, y: 0},
      pos1: {x: 0, y: 0},
      zIndicesFrames: [0, 1]
    }

  }


  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onDrag0 = (position) => {
    const pos0 = {...this.state.pos0};
    pos0.x = position.x;
    pos0.y = position.y;

    this.setState({pos0});
  }

  onDrag1 = (position) => {
    const pos1 = {...this.state.pos1};
    pos1.x = position.x;
    pos1.y = position.y;

    this.setState({pos1});
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
    const {pos0, pos1, zIndicesFrames} = this.state;
    const sty = {background: "transparent"};
    const styWind1 = {backgroundPosition: `${-pos0.x}px ${-pos0.y}px`};
    const styWind2 = {backgroundPosition: `${-pos1.x}px ${-pos1.y}px`};
    return (
      <div className="Windows Sketch">
        <Frame title="b1" x={400} y={400} width={300} height={263} windowStyle={sty} onDrag={this.onDrag0} content={
            <div className="windowDiv">
              <div className="background1 background" style={styWind1}></div>
              <div className="windowFrame"></div>
            </div>
          }

          z={zIndicesFrames[0]} newFrameToTop={() => this.newFrameToTop(0)} onDblClick={() => this.onDblClick(0)}
          />
        <Frame title="b2" x={800} y={400} width={300} height={263} windowStyle={sty} onDrag={this.onDrag1} content={
            <div className="windowDiv">
              <div className="background2 background" style={styWind2}></div>
              <div className="windowFrame2"></div>
            </div>
          }

          z={zIndicesFrames[1]} newFrameToTop={() => this.newFrameToTop(1)} onDblClick={() => this.onDblClick(1)}
          />
      </div>
    );
  }

}



export default Windows;
