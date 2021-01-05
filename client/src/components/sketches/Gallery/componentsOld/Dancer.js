import React from 'react';
import { danceFloor } from '../constants';

class Dancer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      x: this.props.startPos.x,
      y: this.props.startPos.y
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.update, 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  update = () => {
    var x = (Math.random()*2-1)*50+this.state.x;
    var y = (Math.random()*2-1)*50+this.state.y;

    
    var minX = -300;
    var maxX = 360;
    var minY = 120;
    var maxY = danceFloor.h-50;
    if (x < minX) x = minX;
    else if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    else if (y > maxY) y = maxY;
    
    this.setState({x, y})
  }

  render() {
    const sty = {fontSize: "40px", position: "absolute", left: this.props.x+this.state.x, top: this.props.y+this.state.y, zIndex:this.props.z};
    return (
      <div className={"dancer" + (this.props.isFlipped?" flippedX":"")} style={sty}>{this.props.avatar}</div>
    )
  }

}

export default Dancer;
