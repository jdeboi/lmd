import React from 'react';
import Frame from '../../../shared/Frame/Frame';
import DesktopIcon from '../../../shared/DesktopIcon/DesktopIcon';
// import FrameSimple from '../../shared/Frame/FrameSimple';
import './Dig.css';


class Dig extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.state = {
      numFrames: 0
    }

    this.clicked = this.clicked.bind(this);
    this.getFrames = this.getFrames.bind(this);
  }


  componentDidMount() {
    // document.body.classList.add('overflow-all');
    this.props.addClass("overflow-all");

  }

  componentWillUnmount() {
  }


  mod(a, b) {
    return (((a % b) + b) % b);
  }

  onDblClick(i) {
    console.log(i);
    let {numFrames} = this.state;
    numFrames++;
    this.setState({numFrames});
  }

  render() {

    let mapDivs = [];
    const box = {x: 400, y: 400, w: 400, h: 200};

    return (
      <div className="Dig" ref={this.divRef} >

        <DesktopIcon disableWindow={true} onDblClick={this.onDblClick.bind(this)} x={100} y={220} width={60} height={90} title="dive" box={box}
          title={"z-axis"}
          content={
            <img src={window.AWS + "/loop/folder.png"} width={80} height={80} />
          }
          frameContent={
            <div className="test">blue pill</div>
          }
          />

        {this.getFrames()}
      </div>
    );
  }

  clicked(id) {
    let {numFrames} = this.state;
    numFrames++;
    this.setState({numFrames});
  }

  getFrames() {
    const {numFrames} = this.state;
    let frames = [];
    for (let i = 0; i < numFrames; i++) {
      frames[i] = i;
    }

    return (
      <div className="openedFrames">
        {frames.map((frame) => {
          const framesW = 20;
          const startX = 100;
          const direction = Math.floor(frame/framesW);
          let x = 0;
          if (direction %2 == 0) x = startX + frame%framesW*20;
          else x = startX + framesW*20 - frame%framesW*20;
          return <Frame handle={".App"} key={frame} x={x} y={100+frame*20} width={400} height={300} title="work" windowStyle={{background: "red"}} content={
              <div onDblClick={() => {this.clicked(frame)}}>
                <img src={window.AWS + "/loop/folder.png"} width={20} height={20} />
                <span>go deeper</span>
              </div>
            } />
          })}
        </div>
      )

    }

  }




  export default Dig;
