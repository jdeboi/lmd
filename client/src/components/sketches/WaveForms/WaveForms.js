import React from 'react';
import { withRouter } from 'react-router-dom';
import Frame from '../../shared/Frame/Frame';
import DesktopIcon from '../../shared/DesktopIcon/DesktopIcon';
// import FrameSimple from '../../shared/Frame/FrameSimple';
import './WaveForms.css';
import ReactPlayer from 'react-player'
// import Moment from 'react-moment';

// import { AnaglyphUniversalCamera, HemisphericLight, PhotoDome, Vector3, Vector2, AssetContainer, SceneLoader, StandardMaterial, CubeTexture, Color3, Mesh, Texture } from 'babylonjs';
// import BabylonScene from '../../shared/Babylon.jsx'; // import the component above linking to file we just created.
// import { WaterMaterial, SkyMaterial } from 'babylonjs-materials';
// import 'babylonjs-loaders';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

// import ReactAudioPlayer from 'react-audio-player';

// import mainVid from  "./assets/waves2_lines.mp4";
// import dove from  "./assets/dove_t.gif";
// import shellSound from "./assets/shell_sound.wav";

// import Glasses from '../../shared/Glasses/Glasses';

import { faEye, faRetweet, faVideo, faMicrophoneAlt, faMicrophoneAltSlash } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// import communion from './assets/emojis/communion.png';
// import praise from './assets/emojis/praise.png';
// import prayer from './assets/emojis/prayer.png';
// import open from './assets/emojis/open.png';
// import halo from './assets/emojis/halo.png';

// import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import Webcam from "react-webcam";


import BottomBar from './components/BottomBar';
import LiveBar from './components/LiveBar';

const processString = require('react-process-string');


class WaveForms extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    let factor = .3;
    this.dimW = 1584 * factor;
    this.dimH = 1588 * factor;

    this.minVol = .01;



    factor = 1.4;
    this.videoConstraints = {
      width: 230 * factor,
      height: 130 * factor,
      facingMode: "user"
    };

    const bottomBar = 60;
    const spacing = 120;
    this.tweetW = 400;
    const winX = Math.max((window.innerWidth - this.dimW - this.tweetW - spacing) / 2, 50)
    const winY = (window.innerHeight - this.dimH - 26 - 30 - bottomBar) / 2 + 30;

    // const webY = winY -50;
    // const webX = tX;
    // const webH = 200;




    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      windowX: winX,//(window.innerWidth - this.dimW)/2,
      windowY: winY,//(window.innerHeight - this.dimH-80)/2,
      tweetX: winX + this.dimW + 100,
      tweetY: winY + 20,
      webX: winX + this.dimW + 100,
      webY: winY - 50,
      earCursor: this.props.cursor,
      volume: this.minVol,
      timePeriod: "days",
      prayTo: "Kanye"
    };

    factor = 0.1;
    this.memberRef0 = React.createRef();

  }


  componentDidMount() {
    this.interval = setInterval(this.resetPlayer, 22000);
    // this.props.userSetRoom("confessions");
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    // this.props.userLeaveRoom("confessions");
  }


  handleChange = (event) => {
    this.setState({ timePeriod: event.target.value });
  };

  resetPlayer = () => {
    if (this.videoBack && this.videoMain) {
      this.videoBack.currentTime = 0;
      this.videoMain.currentTime = .50;
    }
  }

  onSubmit = () => {
    alert("thanks for your submission. uploading to the cloud");
    this.props.history.push("/confessions");
  }

  render() {
    const { timePeriod, prayTo } = this.state;

    return (
      <div className="WaveForms Sketch">
        <div className="confessions-form">
          <Frame className="stairway" title="cloud confessional" content={
            /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
            <div>
              <video autoPlay muted loop
                ref={video => { this.videoMain = video; }}
                className={"react-player mainContent"}
                width={this.dimW}
                height={this.dimH}
              >
                <source src={window.AWS + "/waveforms/waves2_lines.mp4"} type="video/mp4" ></source>
              </video>
              <LiveBar />
            </div>
          }
            width={this.dimW} height={this.dimH} x={this.state.windowX} y={this.state.windowY}
          />

          <Frame className="doveFrame" title="" windowStyle={{ background: "transparent" }} content={
            <img src={window.AWS + "/waveforms/dove_t.gif"} width={90} height={90} />
          }
            width={90} height={90} x={this.state.windowX + this.dimW / 2 - 45} y={this.state.windowY + this.dimH / 2 - 45}
          />

          <div className="member" ref={this.memberRef0}>
            <Frame className="static" content={
              /* <img height={130} width={230} src="https://media4.giphy.com/media/UiwxIx9BElaVi/giphy.gif?cid=ecf05e47a8bbe3d9385a466e6febc98bd9d83fe2e23ed054&rid=giphy.gif" />*/
              <div>
                <Webcam videoConstraints={this.videoConstraints} />
                <img src={window.AWS + "/waveforms/divine.gif"} width={"100%"} height={"100%"} style={{ opacity: .3, position: "absolute", top: 0, left: 0 }} />
              </div>
            }
              x={this.state.webX} y={this.state.webY} width={this.videoConstraints.width} height={this.videoConstraints.height}
            />
          </div>
          {/*this.getEarMenu()*/}
          {/* <ReactAudioPlayer
            src={window.AWS + "/waveforms/shell_sound.wav"}
            autoPlay={true}
            volume={this.state.volume}
            controls={false}
            loop={true}
            ref={player => {
              this.audioPlayer = player;
            }}
            /> */}
          {/* </div>*/}

          <Frame title="" windowStyle={{ background: "transparent" }} content={
            <div className="confessional">
              <div className="line0">
                <div className="text-line0">Bless me</div>
                <select className="confessional-box" value={this.state.prayTo} onChange={this.handleChange}>
                  <option value="RBG">RBG</option>
                  <option value="Father">Father</option>
                  <option value="Mitch McConnel">Mitch McConnel</option>
                  <option value="Kanye">Kanye</option>
                </select>
              </div>
              <div>for I have sinned. It has been:</div>

              <div className="confessional-time">
                <div className="confessional-box">
                  <input type="number" placeholder="number" />
                </div>

                <select className="confessional-box" value={this.state.timePeriod} onChange={this.handleChange}>
                  <option value="days">days</option>
                  <option value="months">months</option>
                  <option value="years">years</option>
                  <option value="never">never</option>
                </select>
              </div>
              <div className="text-line1">since I last went to confession.</div>
              <div className="txt-box">
                <div className="multitext confessional-box">
                  <textarea
                    id="outlined-multiline-static"
                    label=""
                    multiline="true"
                    placeholder="confession"
                    className="box text-line2"
                  />
                </div>
              </div>
              <button className="confessional-box" onClick={this.onSubmit}>submit</button>
            </div>
          }
            width={this.tweetW} height={300} x={this.state.tweetX} y={this.state.tweetY}
          />
          <BottomBar />
        </div>

        {/* <Glasses y={30} /> */}
      </div>
    );

  }


}

function getTweetContent(string) {
  let config = [
    {
      // / delimits start/end
      // parentheses creates capturing group
      // [has any of these symbols]

      // match @ []
      // \escape
      // second set of parens apparently stops it. added |\: to get retweet colon
      regex: /\@([a-z0-9_\-]+?)( |\,|$|\.|\:)/gim, //regex to match a username
      fn: (key, result) => {
        let username = result[0];
        const profileUrl = "https://twitter.com/" + username.substring(1, username.length);
        return <a key={key} href={profileUrl} target="_blank">{username}</a>;
      }
    },
    {
      regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |\,|$|\.)/gim,
      fn: (key, result) => <span key={key}>
        <a target="_blank" href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}>{result[2]}.{result[3]}{result[4]}</a>{result[5]}
      </span>
    },
    {
      regex: /\#([a-z0-9_\-]+?)( |\,|$|\.|\:)/gim, //regex to match a hashtag
      fn: (key, result) => {
        let hashtag = result[0];
        const hashtagUrl = `https://twitter.com/hashtag/${hashtag.substring(1, hashtag.length)}?src=hashtag_click`;
        return <a key={key} href={hashtagUrl} target="_blank">{hashtag}</a>;
      }
    },
    {
      regex: /\&amp/,
      fn: (key, result) => {
        let amp = result;
        return "&";
      }
    }];

  let processed = processString(config)(string);
  return processed;
}

function getMostEngagement(mode, tweets) {
  let max = 0;
  let id = 0;
  let maxId = 0;

  for (const tweet of tweets) {
    let likes = tweet.public_metrics.like_count;
    let rts = tweet.public_metrics.retweet_count;
    let replies = tweet.public_metrics.reply_count;
    let metrics = [likes, rts, replies];

    if (metrics[mode] > max) {
      max = likes;
      maxId = id;
    }
    id++;
  }
  return maxId;
}

function mapVal(val, in_min, in_max, out_min, out_max) {
  return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function getTweetTime(tweet_created_at) {
  // const dateToFormat = new Date('1976-04-19T12:59-0500');
  // const created_time = isoStringToDate(tweet_created_at);
  // var timeDiff = new Date() - created_time;
  // timeDiff /= 1000;
  // var seconds = Math.round(timeDiff);
  // console.log(created_time, timeDiff, seconds);
  // return seconds + "s";
  return "5s";
}

function isoStringToDate(s) {
  var b = s.split(/[-t:+]/ig);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5]));
}
//
// function urlify(text) {
//   var urlRegex = /(https?:\/\/[^\s]+)/g;
//   return text.replace(urlRegex, function(url) {
//     return '<a href="' + url + '">' + url + '</a>';
//   })
// }

export default withRouter(WaveForms);
