import React from 'react';
import Frame from '../../../shared/Frame/Frame';


class Chairs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chairY: 0
    }
  }


  componentDidMount() {
    this.chairInterval = setInterval(this.chairUpdate, 50);
  }

  componentWillUnmount() {
    clearInterval(this.chairInterval);
  }

  chairUpdate = () => {
    this.setState({chairY: this.state.chairY+2});
  }

  render() {
    const {w, h, x, y} = this.props;
    const chairStyle = {color: "red", backgroundPosition: `${this.state.chairY}px 0`};

    return (
      <Frame title="" content={<div className="blueChair" style={chairStyle}></div>} width={w} height={h} x={x} y={y} />
    )
  }


}


export default Chairs;
