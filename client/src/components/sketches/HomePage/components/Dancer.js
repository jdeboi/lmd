import React from 'react';
import Frame from '../../../shared/Frame/Frame';

class Dancer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      x: 300,
      y: 400
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.update, 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  update = () => {
    var x = this.state.x;
    var y = this.state.y;
    // x += (Math.random()*2-1)*50;
    // y += (Math.random()*2-1)*50;

    var maxX = 300;
    var minX = -100;
    var minY = 150;
    var maxY = 400;
    if (x < minX) x = minX;
    else if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    else if (y > maxY) y = maxY;
    this.setState({x, y})
  }

  render() {
    const sty = {fontSize: "40px", position: "absolute", left: this.props.x+this.state.x, top: this.props.y+this.state.y, zIndex:this.props.z};
    return (
      <div className="dancer" style={sty}>{this.props.avatar}</div>
    )
  }

}

export default Dancer;
