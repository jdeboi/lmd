import React from 'react';
import Frame from '../../shared/Frame/Frame';
import './Altar.css';

// import leftImg from "./assets/zoom/left.png";
// import midImg from "./assets/zoom/mid.png"

import ReactPlayer from 'react-player'

// import mainVid from './assets/wave_tunnel.mp4';
// import dove from './assets/dove2.gif';
// import altar from './assets/altars/altar.jpg';
// import redWine from './assets/redwine.gif';


import Webcam from "react-webcam";

class Altar extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }

    this.videoConstraints = {
      width: 128,
      height: 72,
      facingMode: "user"
    };
    this.memberRef0 = React.createRef();
    this.memberRef1 = React.createRef();
    this.memberRef2 = React.createRef();
    this.mainRef = React.createRef();


  }




  render() {

    return (
      <div className="Altar Sketch">
        <div className="topVids">
          <div className="member" ref={this.memberRef0}>
            <Frame className="static" content={
                <Webcam videoConstraints={this.videoConstraints} />
              }
              x={0} y={0} width={230} height={130}
              />
          </div>
          <div className="member" ref={this.memberRef0}>
            <Frame className="static" content={
                /* <img height={130} width={230} src="https://media4.giphy.com/media/UiwxIx9BElaVi/giphy.gif?cid=ecf05e47a8bbe3d9385a466e6febc98bd9d83fe2e23ed054&rid=giphy.gif" />*/
                <Webcam videoConstraints={this.videoConstraints} />
              }
              x={0} y={0} width={230} height={130}
              />
          </div>
          <div className="member">
            <Frame className="static" content={

                <Webcam videoConstraints={this.videoConstraints} />

              }
              x={0} y={0} width={230} height={130}
              />

          </div>
        </div>
        <div className="mainVid">
          <Frame className="static" content={
              /*<img src={altar} height={370} width={600} />*/
              <Webcam videoConstraints={this.videoConstraints} />
            }
            x={0} y={0} width={600} height={370}
            />

        </div>
        {getFooter()}
      </div>
    );
  }

}

function getFooter() {
  return(
    <footer>
      {/* <img className="zoom-left" src={leftImg} />
    <img className="zoom-mid" src={midImg} />*/}
  </footer>
);
}


export default Altar;
