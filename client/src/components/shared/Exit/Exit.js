import React from 'react';
import Frame from '../Frame/Frame';
import './Exit.css';

class Exit extends React.Component {

  constructor(props) {
    super(props);

  }
  // componentDidMount() {
  // }

  // componentWillUnmount() {
  // }

  render() {
    const y = 60;
    const x = 30;
    // const iconArrow = "fas fa-arrow-circle-left";
    const iconArrow = "fas fa-arrow-left";
    // const icon = "fas fa-window-close";
    // const icon = "fas fa-home";
    // 
    const icon = "fas fa-door-open";
    return (
     <button className="backButton" style={{left: x, top: y}}><i class={iconArrow}></i></button>
    )
  }

  getFrame = () => {
    let y = this.props.y?this.props.y:(window.innerHeight - 26 - 40 - 70);
    let x = this.props.x?this.props.x:(window.innerWidth-100-30);
    return (
      <Frame
      className="exitFrame"
      content={<div className="exitImg"></div>}
      width={100}
      height={100}
      x={x}
      y={y}
      />
    )
  }

}

export default Exit;
