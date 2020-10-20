import React from 'react';
import Frame from '../../../shared/Frame/Frame';

class Window extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    const w = 150;
    const h = 150;
    const spacing = 20;

    this.state = {
      currentImg: 1,
      randVal0: Math.random(),
      randVal1: Math.random()
    }

    this.imgs = [
      "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/test/waterfall.jpg",
      "/assets/s3-bucket/test/tree.jpg",
      "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/test/waterfall.jpg"
    ]
  }


  componentDidMount() {
    this.interval = setInterval(this.changeImg, Math.random()*3000+1500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeImg = () => {
    if (Math.random() > .5) this.setState({currentImg: 0,randVal0: Math.random(), randVal1: Math.random()});
    else this.setState({currentImg: 1, randVal0: Math.random(), randVal1: Math.random()});
  }

  render() {
    const {z, ogPos, pos, w, h, id, newFrameToTop, onDblClick} = this.props;
    const x = pos.x + ogPos.x;
    const y = pos.y + ogPos.y;
    // const img = this.imgs[x>y?1:0];
    const img = this.imgs[2];
    var frameImg = "/assets/s3-bucket/test/blinds.png";

    const styWind = {backgroundPosition: `${-x}px ${-y}px`, backgroundImage: `url(${img})`};
    // const styWind = {backgroundImage: `url(${img})`, backgroundSize: "100% 100%"};
    // onDrag={(position) => this.onDrag(i, position)}

    return(
      <Frame title="b1" x={ogPos.x} y={ogPos.y} width={w} height={h} windowStyle={{background: "transparent"}} content={
        <div className="windowDiv">
        <div className="background1 background" style={styWind}></div>
        <div className="windowFrame" style={{backgroundImage: `url(${frameImg})`, height: this.state.currentImg===0?0:200}}></div>
        </div>
      }

      z={z} newFrameToTop={() => newFrameToTop(id)} onDblClick={() => onDblClick(id)}
      />
    );

  }
}



export default Window;
