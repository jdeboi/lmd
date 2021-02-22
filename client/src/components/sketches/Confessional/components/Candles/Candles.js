import React from 'react';
import Candle from './Candle';

class Candles extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }




  render() {
    return (
      this.props.candles.map((candle, i) => {
        return <Candle key={i} x={candle.x} y={candle.y} />
      })
    );
  }

}



export default Candles;
