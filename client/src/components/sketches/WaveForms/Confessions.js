import React from 'react';
import Frame from '../../shared/Frame/Frame';
import DesktopIcon from '../../shared/DesktopIcon/DesktopIcon';
// import FrameSimple from '../../shared/Frame/FrameSimple';
import './WaveForms.css';
import ReactPlayer from 'react-player'

import ReactAudioPlayer from 'react-audio-player';

// import mainVid from  "./assets/waves2_lines.mp4";
// import dove from  "./assets/dove_t.gif";
// import shellSound from "./assets/shell_sound.wav";

import Glasses from '../../shared/Glasses/Glasses';

import txt from './assets/Canned/txt.png';

class Confessions extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);



    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      confessions: this.initConfessions()
    };



    this.updateDimensions = this.updateDimensions.bind(this);
    this.moveConfessions = this.moveConfessions.bind(this);
  }


  componentDidMount() {
    this.interval = setInterval(this.moveConfessions, 30);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  updateDimensions() {

    // this.setState({windowX, windowY, tweetX, tweetY})
  }


  initConfessions() {
    let confessions = [
      {txt: "I am not thinking about my partner during sex."},
      {txt: "I said I love you but I didn't mean it."},
      {txt: "I took a macbook mouse from work"},
      {txt: "I cursed at God because honestly, what is going on here."},
      {txt: "I told my neighbors they were little brats"},
      {txt: "I said I hoped my boss would burn in hell."},
      {txt: "When I was diagnosed I was angry. It just felt so unfair. I blamed my husband, my myself, my kids. But most of all, I blamed God."},
      {txt: "No body tells you what's right. I mean, I guess God is supposed to do that, but I've lost hope that anyone's on the receiving end. If he'd just give me a sign or something maybe I wouldn't have so many doubts."}
    ];
    for (const confession of confessions) {
      confession.x = Math.random()*window.innerWidth;
      confession.y = Math.random()*(window.innerHeight-150)+30;
      // confession.x0 = confession.x;
      // confession.y0 = confession.y;
    }
    return confessions;
  }

  moveConfessions() {
    const {confessions} = this.state;
    for (const confession of confessions) {
      // confession.x++;
      // confession.x %= window.innerWidth;
      confession.y = 15*Math.sin(new Date()/400 + confession.x/100);
    }
    this.setState({confessions});
  }

  ondblclick(id) {
    console.log(id);
  }

  render() {
    const {confessions} = this.state;

    return (
      <div className="WaveForms Sketch">
        {confessions.map((confession, i) => {
          const box={x: 100+i*20, y:100+i*20, w:400};
          return <DesktopIcon key={i} title={"confession " + i} ondblclick={this.ondblclick.bind(this)} x={0} y={confession.y} dx={confession.x} dy={confession.y} box={box}
            content={
              <img src={txt} width={80} height={80} />
            }
            frameContent={
              <div className="confession-txt">{confession.txt}</div>
            }
            />
        })
      }
      <Glasses y={30} />
    </div>
  );
}

}


export default Confessions;
