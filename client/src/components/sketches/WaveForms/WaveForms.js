import React from 'react';
import {Link} from 'react-router-dom';
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

import ReactAudioPlayer from 'react-audio-player';

// import mainVid from  "./assets/waves2_lines.mp4";
// import dove from  "./assets/dove_t.gif";
// import shellSound from "./assets/shell_sound.wav";

import Glasses from '../../shared/Glasses/Glasses';

import { faEye,faRetweet, faVideo, faMicrophoneAlt, faMicrophoneAltSlash } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import communion from './assets/emojis/communion.png';
// import praise from './assets/emojis/praise.png';
// import prayer from './assets/emojis/prayer.png';
// import open from './assets/emojis/open.png';
// import halo from './assets/emojis/halo.png';

import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import Webcam from "react-webcam";

// import divine from './assets/Canned/divine.gif';
// import devil from './assets/Canned/devil.png';
// import txt from './assets/Canned/txt.png';

// import socketIOClient from "socket.io-client";
const processString = require('react-process-string');

// const ENDPOINT = "http://127.0.0.1:5000";

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

    factor = 1.4;
    this.videoConstraints = {
      width: 230*factor,
      height: 130*factor,
      facingMode: "user"
    };

    const bottomBar = 60;
    const spacing = 120;
    this.tweetW = 400;
    const winX = Math.max((window.innerWidth - this.dimW - this.tweetW - spacing)/2, 50)
    const winY = (window.innerHeight - this.dimH - 26 - 30 -bottomBar)/2+30;

    // const webY = winY -50;
    // const webX = tX;
    // const webH = 200;




    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      windowX: winX,//(window.innerWidth - this.dimW)/2,
      windowY: winY,//(window.innerHeight - this.dimH-80)/2,
      tweetX: winX+this.dimW + 100,
      tweetY: winY + 20,
      webX: winX+this.dimW + 100,
      webY: winY - 50,
      earCursor: this.props.cursor,
      volume: this.minVol,
      timeInc: timeInc,
      time: this.getTime(timeInc),
      watchers: Math.floor(Math.random()*200),
      timePeriod: "days",
      emojis: [],
      tweets: [{id: "1234", author_id:"@onhigh", author_name: "Joy Totheworld", text: "praise be to God, lord almighty", time: 0, likes: 0, comments: 0, rts: 0}],
      confessions: this.initConfessions(),
      showConfessions: false
    };




    factor = 0.1;
    // this.shellW = 1600 *factor;
    // this.shellH = 1038*factor;
    // this.shellW = 100;
    // this.shellH = 100;
    // this.shellX =  (window.innerWidth - this.shellW)/2; //this.state.windowX + this.dimW/2 - this.shellW/2;
    // this.shellY = (window.innerHeight - this.shellH-80)/2;

    this.updateDimensions = this.updateDimensions.bind(this);
    this.resetPlayer = this.resetPlayer.bind(this);
    this.earChange = this.earChange.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateWatchers = this.updateWatchers.bind(this);

    this.updateEmojis = this.updateEmojis.bind(this);
    this.setTweet = this.setTweet.bind(this);
    this.fetchTweets = this.fetchTweets.bind(this);
    this.getTweet = this.getTweet.bind(this);
    this.addTweet = this.addTweet.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.renderForm = this.renderForm.bind(this);
    // this.renderConfessions = this.renderConfessions.bind(this);


    this.memberRef0 = React.createRef();

    this.moveConfessions = this.moveConfessions.bind(this);
  }


  componentDidMount() {

    window.addEventListener("resize", this.updateDimensions);
    this.interval = setInterval(this.resetPlayer, 22000);
    this.intervalTimer = setInterval(this.updateTime, 1000);
    this.intervalWatcher = setInterval(this.updateWatchers, 2200);
    this.intervalEmoji = setInterval(this.updateEmojis, 20);

    // this.socket = socketIOClient(ENDPOINT);
    // this.socket.on("tweet", data => {
    //   this.setTweet(data);
    // });

    this.fetchTweets();

    this.intervalConfession = setInterval(this.moveConfessions, 30);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    clearInterval(this.interval);
    clearInterval(this.intervalTimer);
    clearInterval(this.intervalWatcher);
    clearInterval(this.intervalEmoji);
    clearInterval(this.intervalConfession);
    // this.socket.disconnect();
  }

  // componentDidUpdate() {
  //   // subscribe state change
  //   this.videoMain.subscribeToStateChange(this.handleStateChangeMain.bind(this));
  //   this.videoBack.subscribeToStateChange(this.handleStateChangeBack.bind(this));
  // }

  updateDimensions() {

    // this.setState({windowX, windowY, tweetX, tweetY})
  }

  handleChange(event) {
    this.setState({timePeriod: event.target.value});
  };

  async fetchTweets() {
    const query = encodeURI("#confession");
    const url = `/api/get/${query}`;
    const response = await fetch(url);
    const initialRes = await response.json();

    if (initialRes.tweets.data) {
      const mode = Math.floor(Math.random()*3);
      let id = getMostEngagement(mode, initialRes.tweets.data); //Math.floor(Math.random()*10);
      const tweet = initialRes.tweets.data[id];
      const user = initialRes.tweets.includes.users[id];
      this.addTweet(tweet, user);


    }
  }

  addTweet(tweetObj, user) {
    console.log("TWEET", tweetObj);
    console.log("USER", user);

    let {tweets} = this.state;
    const tweet = {};
    tweet.text = getTweetContent(tweetObj.text);
    tweet.time = getTweetTime(tweetObj.created_at);
    tweet.tweetID = tweetObj.id;
    tweet.name = user.name;
    tweet.url = user.profile_image_url;
    tweet.username = user.username;
    tweet.likes = tweetObj.public_metrics.like_count;
    tweet.rts = tweetObj.public_metrics.retweet_count;
    tweet.replies = tweetObj.public_metrics.reply_count;
    tweets.push(tweet);
    this.setState({tweets});
  }

  setTweet(data) {
    // let {tweets} = this.state;
    // tweets.push(data);
    // this.setState({tweets});
    console.log("tweeted", data);
  }

  updateEmojis() {
    const {emojis} = this.state;
    for (let i = 0; i < emojis.length; i++) {
      let emoji = emojis[i];
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

  getTweet() {
    const {tweets} = this.state;
    const {text, name, username, url, likes, rts, replies, time, tweetID} = tweets[tweets.length-1];
    const tweetUri = `twitter.com/${username}/status/${tweetID}`;
    const profileUrl = "https://twitter.com/" + username;
    const tweetUriA = <a href={"https://"+tweetUri} target="_blank">{tweetUri.substring(0, 15) + "..."}</a>;
      return (
        <div className="tweet">
          <div className="tweet-top">
            <div className="tweeter-icon" style={{backgroundImage: `url(${url})`}}><div className="inner"></div></div>
            <div className="tweeter">
              <div className="person"><a href={profileUrl} target="_blank">{name}</a></div>
              <div className="tweet-handle"><a href={profileUrl} target="_blank">@{username}</a></div>
            </div>
            <div className="tweet-time">• {time}</div>
            {/* <div className="twitter-icon"><FontAwesomeIcon icon={faTwitter} /></div>*/}
          </div>
          <div className="tweet-content">{text}</div>
          <div><hr /></div>
          <div className="tweet-metrics">
            <div className="comments"><FontAwesomeIcon icon={faComment} /><span>{likes}</span></div>
            <div className="retweets"><FontAwesomeIcon icon={faRetweet} /><span>{rts}</span></div>
            <div className="likes"><FontAwesomeIcon icon={faHeart} /><span>{replies}</span></div>
          </div>
        </div>

      )
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
      const {confessions, showConfessions} = this.state;
      if (showConfessions) {
        for (const confession of confessions) {
          confession.x++;
          confession.x %= window.innerWidth;
          confession.y = 50*Math.sin(confession.x/100);
        }
        this.setState({confessions});
      }
    }

    ondblclick(id) {
      console.log(id);
    }

    renderConfessions() {
      const {confessions, tweets} = this.state;

      return (
        <div className="floating-confessions">
        {confessions.map((confession, i) => {
          const box={x: 100+i*20, y:100+i*20, w:400};
          return <DesktopIcon key={i} title={"confession " + i} ondblclick={this.ondblclick.bind(this)} x={0} y={confession.y} dx={confession.x} dy={confession.y} box={box}
            content={
              <img src={window.AWS+"/waveforms/txt.png"} width={80} height={80} />
            }
            frameContent={
              <div className="confession-txt">{tweets.text}</div>
            }
            />
        })
      }

      </div>
    );
  }

  // onSubmit()  {
  //   alert("Thank you for your confession. Uploading to the cloud.");
    // setTimeout(this.toggleConfessions.bind(this), 4000);
    // this.toggleConfessions();
    // window.location = process.env.PUBLIC_URL+"/#/confessions"
  // }

  // toggleConfessions() {
    // this.setState({showConfessions: true});
    // window.location=
  // }

  render() {
    const {showConfessions} = this.state;

    return(
      <div className="WaveForms Sketch">
        {this.renderForm()}
         {/*showConfessions?this.renderConfessions():this.renderForm()*/}
        <Glasses y={30} />
      </div>
    );

  }

  renderForm() {
    const {time, watchers, tweets, timePeriod} = this.state;

    return (
      <div className="confessions-form">

        <Frame className="stairway" title="cloud confessional" content={
            /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
            <div>
              <video autoPlay muted loop
                ref={video => {this.videoMain = video;}}
                className={"react-player mainContent"}
                width={this.dimW}
                height={this.dimH}
                >
                <source src={window.AWS + "/waveforms/waves2_lines.mp4"} type="video/mp4" ></source>
              </video>
              <div className="liveStream"><span className="live">LIVE</span><span className="time">{time}</span><span className="eye"><FontAwesomeIcon icon={faEye} /> {watchers}</span></div>
            </div>
          }
          width={this.dimW} height={this.dimH} x={this.state.windowX} y={this.state.windowY}
          />

        <Frame className="doveFrame" title="" windowStyle={{background: "transparent"}} content={
            <img src={window.AWS + "/waveforms/dove_t.gif"} width={90} height={90} />
          }
          width={90} height={90} x={this.state.windowX+this.dimW/2-45} y={this.state.windowY+this.dimH/2-45}
          />

        <div className="member" ref={this.memberRef0}>
          <Frame className="static" content={
              /* <img height={130} width={230} src="https://media4.giphy.com/media/UiwxIx9BElaVi/giphy.gif?cid=ecf05e47a8bbe3d9385a466e6febc98bd9d83fe2e23ed054&rid=giphy.gif" />*/
              <div>
                <Webcam videoConstraints={this.videoConstraints} />
                <img src={window.AWS + "/waveforms/divine.gif"} width={"100%"} height={"100%"} style={{opacity:.3, position: "absolute", top: 0, left:0}} />
              </div>
            }
            x={this.state.webX} y={this.state.webY} width={this.videoConstraints.width} height={this.videoConstraints.height}
            />
        </div>
        {/*this.getEarMenu()*/}
        <ReactAudioPlayer
          src={window.AWS + "/waveforms/shell_sound.wav"}
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
            const imgs = ["prayer", "communion", "praise", "open", "halo"];
            const url = window.AWS + "/waveforms/emojis/" + imgs[id] + ".png" ;
            return (
              <img key={i} src={url} style={{top:`${emoji.y}px`, left:`${emoji.x}px`, opacity: emoji.opacity}} />
            )
          })}
        </div>
        <Frame title="" windowStyle={{background: "transparent"}} content={
            <div className="confessional">
              <div className="text-line0">Bless me Father for I have sinned. It has been:</div>
              <div className="confessional-time">
                <TextField className="box field" size="small" id="outlined-basic" label="number" type="number" variant="outlined" />
                <FormControl size="small" className="field">
                  {/*this.getTweet()*/}

                  <InputLabel id="demo-simple-select-label">Time Period</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={timePeriod}
                    onChange={this.handleChange}
                    >
                    <MenuItem value={"days"}>days</MenuItem>
                    <MenuItem value={"months"}>months</MenuItem>
                    <MenuItem value={"years"}>years</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="text-line1">since I last went to confession.</div>
              <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="confession"
                variant="outlined"
                className="box text-line2"
                size="medium"
                />
              <Link to="/confessions"><Button variant="outlined" size="small" >submit</Button></Link>
            </div>
          }
          width={this.tweetW}  x={this.state.tweetX} y={this.state.tweetY}
          />

        <div className="bottomBar">
          <div className="bar-vid">
            <Button variant="contained"><FontAwesomeIcon icon={faVideo} /></Button>
            <Button variant="contained"><FontAwesomeIcon icon={faMicrophoneAlt} /></Button>
          </div>
          <div className="bar-emojis">
            <Button variant="contained" onClick={() => this.addEmoji(0)}><img src={window.AWS + "/waveforms/emojis/prayer.png"} /></Button>
            <Button variant="contained" onClick={() => this.addEmoji(1)}><img src={window.AWS + "/waveforms/emojis/communion.png"} /></Button>
            <Button variant="contained" onClick={() => this.addEmoji(2)}><img src={window.AWS + "/waveforms/emojis/praise.png"} /></Button>

            <Button variant="contained" onClick={() => this.addEmoji(3)}><img src={window.AWS + "/waveforms/emojis/open.png"} /></Button>
          </div>
          <div className="bar-good-bad">
            <Button variant="contained" ><img src={window.AWS + "/waveforms/emojis/halo.png"} /></Button>
            <Button variant="contained" ><img src={window.AWS + "/waveforms/emojis/devil.png"} /></Button>
          </div>
        </div>
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
        }},
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

        export default WaveForms;
