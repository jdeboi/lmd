import React from 'react';
import Frame from '../Frame/Frame';
import './Glasses.css';

class Glasses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      windowStyle: {
        opacity: 1,
        visibility: "visible"
      },
      start: new Date()
    };

  }
  componentDidMount() {
    this.interval = setInterval(() => {
      if (new Date().getTime() - this.state.start.getTime() > 4000) {
        let {opacity, visibility} = this.state.windowStyle;
        opacity -= .01;
        let clear = false;
        if (opacity <= 0) {
          opacity = 0;
          visibility = "hidden";
          clear = true;
        }
        this.setState({windowStyle: {opacity: opacity, visibility: visibility}});
        if (clear) clearInterval(this.interval);
      }
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    let y = this.props.y?this.props.y:(window.innerHeight - 26 - 40 - 70);
    let x = this.props.x?this.props.x:(window.innerWidth-100-30);
    return (
      <Frame
      windowStyle={this.state.windowStyle}
      className="glassesFrame"
      content={<div className="glassesIcon"></div>}
      width={100}
      height={40}
      x={x}
      y={y}
      />
    )
  }

}

export default Glasses;
