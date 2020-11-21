import React from 'react';

class Swan extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      x: this.props.x,
      y: this.props.x,
      dir: 1
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.update, 500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  update = () => {
    var x = (Math.random()*.5-.25)*50+this.state.x;
    var y = (Math.random()*.5-.25)*50+this.state.y;

    
    var minX = 0;
    var maxX = 250;
    var minY = 0;
    var maxY = 250;
    if (x < minX) x = minX;
    else if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    else if (y > maxY) y = maxY;
    
  
    this.setState({x, y})
  }

  render() {
    const sty = {fontSize: "80px", position: "absolute", left: this.props.x+this.state.x, top: this.props.y+this.state.y, zIndex:this.props.z};
    return (
      <div className={"swan" + (this.state.dir===-11?" flippedX":"")} style={sty}>🦢</div>
    )
  }

}

export default Swan;
