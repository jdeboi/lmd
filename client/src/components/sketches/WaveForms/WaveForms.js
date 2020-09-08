import React from 'react';
import Frame from '../../shared/Frame/Frame';
import DesktopIcon from '../../shared/DesktopIcon/DesktopIcon';
// import FrameSimple from '../../shared/Frame/FrameSimple';
import './WaveForms.css';
import ReactPlayer from 'react-player'


// import { AnaglyphUniversalCamera, HemisphericLight, PhotoDome, Vector3, Vector2, AssetContainer, SceneLoader, StandardMaterial, CubeTexture, Color3, Mesh, Texture } from 'babylonjs';
// import BabylonScene from '../../shared/Babylon.jsx'; // import the component above linking to file we just created.
// import { WaterMaterial, SkyMaterial } from 'babylonjs-materials';
// import 'babylonjs-loaders';

import Button from '@material-ui/core/Button';
import ReactAudioPlayer from 'react-audio-player';

import mainVid from  "./assets/waves2_lines.mp4";
// import mainVid from  "./assets/unused/waves_nobright.mp4";
// import wavesVid from  "./assets/sand.mp4";
// import mainVid from  "./assets/wave_darkgreen.mp4";
// import wavesVid from  "./assets/waveforms_green.mp4";
import wavesVid from  "../MacbookAir/assets/clouds3d.mp4";
import dove from  "./assets/dove_t.gif";

import shellSound from "./assets/shell_sound.wav";

// import txtFile from './assets/txt.png';
// import P5Wrapper from 'react-p5-wrapper';
// import sketch from './waveSketch';

import Glasses from '../../shared/Glasses/Glasses';

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import communion from './assets/emojis/communion.png';
import praise from './assets/emojis/praise.png';
import prayer from './assets/emojis/prayer.png';
import open from './assets/emojis/open.png';
import halo from './assets/emojis/halo.png';

import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

// import Cookies from 'js-cookie';

class WaveForms extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    let factor = .3;
    this.dimW = 1584*factor;
    this.dimH = 1588*factor;

    this.minVol = .01;

    const timeInc = Math.floor(Math.random()*300);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      windowX: 110,//(window.innerWidth - this.dimW)/2,
      windowY: 80,//(window.innerHeight - this.dimH-80)/2,
      earCursor: this.props.cursor,
      volume: this.minVol,
      timeInc: timeInc,
      time: this.getTime(timeInc),
      watchers: Math.floor(Math.random()*200),
      emojis: []

    };


    factor = 0.1;
    // this.shellW = 1600 *factor;
    // this.shellH = 1038*factor;
    this.shellW = 100;
    this.shellH = 100;
    this.shellX =  (window.innerWidth - this.shellW)/2; //this.state.windowX + this.dimW/2 - this.shellW/2;
    this.shellY = (window.innerHeight - this.shellH-80)/2;

    this.updateDimensions = this.updateDimensions.bind(this);
    this.resetPlayer = this.resetPlayer.bind(this);
    this.earChange = this.earChange.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateWatchers = this.updateWatchers.bind(this);

    this.updateEmojis = this.updateEmojis.bind(this);
  }


  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.interval = setInterval(this.resetPlayer, 22000);
    this.intervalTimer = setInterval(this.updateTime, 1000);
    this.intervalWatcher = setInterval(this.updateWatchers, 2200);
    this.intervalEmoji = setInterval(this.updateEmojis, 20);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    clearInterval(this.interval);
    clearInterval(this.intervalTimer);
    clearInterval(this.intervalWatcher);
    clearInterval(this.intervalEmoji);
  }

  // componentDidUpdate() {
  //   // subscribe state change
  //   this.videoMain.subscribeToStateChange(this.handleStateChangeMain.bind(this));
  //   this.videoBack.subscribeToStateChange(this.handleStateChangeBack.bind(this));
  // }

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    this.setState({windowX: (window.innerWidth - this.dimW)/2});
    this.setState({windowY: (window.innerHeight - this.dimH-80)/2});
  }

  updateEmojis() {
    const {emojis} = this.state;
    for (let i = 0; i < emojis.length; i++) {
      let emoji = emojis[i];
      console.log("UPDATE EMOJI", emoji);
      if (emoji) {
        emoji.y -= 6;
        if (emoji.y < 0) {
          emojis.splice(i, 1);
          i--;
        }
        else {
          emoji.x = emoji.startX + 30*Math.sin(emoji.y/70);
          emoji.opacity = (emoji.y-80) / window.innerHeight;
          if (emoji.opacity < 0) emoji.opacity = 0;
          else if (emoji.opacity > 1) emoji.opacity = 1;
        }
        this.setState({emojis})
      }
    }
  }

  addEmoji(id) {
    console.log("ADD EMOJI", id);
    const {emojis} = this.state;
    emojis.push({startX: Math.random()*window.innerWidth, x: 0, y: window.innerHeight - 50, opacity: 1, id: id});
    this.setState({emojis});
  }

  getTime(timeInc) {
    let sec = timeInc %60;
    let min = Math.floor(timeInc/60);
    let hr = Math.floor(min/60);
    // if (min < 10) min = "0" + min;
    if (hr < 10) hr = "0" + hr;
    if (sec < 10) sec = "0" + sec;

    let time = min + ":" + sec;
    return time;
  }

  updateTime() {
    let {time, timeInc} = this.state;
    timeInc++;

    time = this.getTime(timeInc);

    this.setState({time, timeInc});
  }

  updateWatchers() {
    let {watchers} = this.state;
    if (Math.random() < .3) {
      watchers++;
    }
    else if (Math.random() < .6) {
      watchers--;
      if (watchers < 1) watchers = 1;
    }
    this.setState({watchers})
  }

  // handleStateChangeMain(state) {
  //   // copy player state to this component's state
  //   this.setState({videoMain: state});
  // }
  //
  // handleStateChangeBack(state) {
  //   // copy player state to this component's state
  //   this.setState({videoBack: state});
  // }

  resetPlayer() {
    if (this.videoBack && this.videoMain) {
      this.videoBack.currentTime = 0;
      this.videoMain.currentTime = .50;
    }
  }

  getEarMenu() {
    let ears = ["👂🏿","👂🏾","👂🏽","👂🏼", "👂🏻"];
    return (
      <Frame title="" content={
          <div className="ears">
            {ears.map((val, i) => {
              return <Button key={i} className={"ear" +  (this.props.cursor>-1?" earCursor-"+this.props.cursor:"")} onClick={this.earChange.bind(this, i)} variant="outlined">{val}</Button>
            })}
          </div>
        }
        width={80} height={97*ears.length} windowStyle={{background:"transparent"}} x={window.innerWidth-100} y={(window.innerHeight-80-97*ears.length)/2}
        />
    );
  }

  earChange(index) {
    // console.log(index);
    this.setState({earCursor: index});
    if (this.state.volume === 0) this.setState({volume:this.minVol});
    this.audioPlayer.audioEl.current.play();
  }

  _onMouseMove(e) {
    if (this.state.volume > 0) {
      let x = e.screenX;
      let y = e.screenY;
      let dx = window.innerWidth/2-x;
      let dy = window.innerHeight/2-y;
      let maxD = Math.sqrt((window.innerWidth/2)*(window.innerWidth/2) + (window.innerHeight/2)*(window.innerHeight/2))
      let dis = Math.sqrt(dx*dx + dy*dy);
      if (dis === 0) dis =  this.minVol;
      let disMapped = mapVal(dis, 0, maxD/2, .8, 0);
      if (disMapped > 1) disMapped = 1;
      else if (disMapped < 0) disMapped = this.minVol;
      // console.log("dis", dis, disMapped);

      this.setState({volume: disMapped});
    }

  }


  // updateWindow() {
  //   let {mainY} = this.state;
  //   mainY = this.dimY+20*Math.sin(new Date().getTime()/300);
  //   this.setState({mainY: mainY});
  // }


  render() {
    const {time, watchers} = this.state;

    return (
      <div className="WaveForms Sketch">
        {/* <div className={"Frame-box" + (this.props.cursor>-1?" earCursor-"+this.props.cursor:"")} onMouseMove={this._onMouseMove.bind(this)}> */}
        {/*<video autoPlay muted loop ref={video => this.videoBack=video} className="backgroundCover">
        <source src={wavesVid} type="video/mp4" ></source>
        Your browser does not support HTML5 video.
        </video>*/}
        {<div className="waveCover"></div>}
        {/*<P5Wrapper className="p5sketch" sketch={sketch} />*/}
        {/* <BabylonScene antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' /> */}

        <Frame className="stairway" title="glory in the cloud" content={
            /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
            <div>
              <video autoPlay muted loop
                ref={video => {this.videoMain = video;}}
                className={"react-player mainContent"}
                width={this.dimW}
                height={this.dimH}
                >
                <source src={mainVid} type="video/mp4" ></source>
              </video>
              <div className="liveStream"><span className="live">LIVE</span><span className="time">{time}</span><span className="eye"><FontAwesomeIcon icon={faEye} /> {watchers}</span></div>
            </div>
          }
          width={this.dimW} height={this.dimH} x={this.state.windowX} y={this.state.windowY}
          />

        <Frame className="doveFrame" title="" windowStyle={{background: "transparent"}} content={
            <img src={dove} width={90} height={90} />
          }
          width={90} height={90} x={this.state.windowX+this.dimW/2-45} y={this.state.windowY+this.dimH/2-45}
          />


        {/*this.getEarMenu()*/}
        <ReactAudioPlayer
          src={shellSound}
          autoPlay={true}
          volume={this.state.volume}
          controls={false}
          loop={true}
          ref={player => {
            this.audioPlayer = player;
          }}
          />
        {/* </div>*/}
        <div className="emojis">
          {this.state.emojis.map((emoji, i) => {
            const id = emoji.id;
            const imgs = [prayer, communion, praise, open, halo];
            return (
              <img key={i} src={imgs[id]} style={{top:`${emoji.y}px`, left:`${emoji.x}px`, opacity: emoji.opacity}} />
            )
          })}
        </div>
        <Frame title="" windowStyle={{background: "transparent"}} content={

              getTweet()
          }
          width={400}  x={800} y={400}
          />
        <div className="bottomBar">
          <Button variant="contained" onClick={() => this.addEmoji(0)}><img src={prayer} /></Button>
          <Button variant="contained" onClick={() => this.addEmoji(1)}><img src={communion} /></Button>
          <Button variant="contained" onClick={() => this.addEmoji(2)}><img src={praise} /></Button>

          <Button variant="contained" onClick={() => this.addEmoji(3)}><img src={open} /></Button>
          <Button variant="contained" onClick={() => this.addEmoji(4)}><img src={halo} /></Button>
        </div>
        <Glasses y={30} />
      </div>
    );
  }

}

function getTweet() {
  const tweetContent = "#hallelujah I mean, if you can’t say something in a tight two sentences, save it for your blog, you know?";//getTweetContent("#hallelujah I mean, if you can’t say something in a tight two sentences, save it for your blog, you know?");
  return (
    <div className="tweet">
      <div className="tweet-top">
        <div className="tweeter-icon"></div>
        <div className="tweeter">
          <span className="person">Joy Onhigh</span>
          <span className="tweet-handle">@praisebe</span>
          <span className="tweet-time">• 2s</span>
        </div>
        {/* <div className="twitter-icon"><FontAwesomeIcon icon={faTwitter} /></div>*/}
      </div>
      <div className="tweet-content">{tweetContent}</div>
    </div>

  )
}

function getTweetContent(string) {
  let words = string.split(" ");
  let index = 0;
  let returnS = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i].charAt(0) === '#') {
      let hashtag = words[i].substring(1);
      let url = `https://twitter.com/hashtag/${hashtag}?src=hashtag_click`;
      returnS.push(<a key={index++} href={url}>{words[i]}</a>);
      // returnS += <a key={index++} href={url}>{words[i]}</a>;
    }
    else if (words[i].charAt(0) === '@') {
      let handle = words[i].substring(1);
      let url = `https://twitter.com/${handle}`;
      returnS.push(<a key={index++} href={url}>{words[i]}</a>);
      // returnS += <a key={index++} href={url}>{words[i]}</a>;
    }
    else {
      returnS.push(<span key={index++}>{words[i] + " "}</span>);
      // returnS += <span key={index++}>{words[i] + " "}</span>;
    }
    console.log("return", returnS);
    return returnS;
  }

}
//
function mapVal(val, in_min, in_max, out_min, out_max) {
  return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


export default WaveForms;
