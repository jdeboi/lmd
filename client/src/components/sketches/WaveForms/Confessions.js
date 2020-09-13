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
// import txt from './assets/Canned/txt.png';

import { faEye,faRetweet, faVideo, faMicrophoneAlt, faMicrophoneAltSlash } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const processString = require('react-process-string');


class Confessions extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);



    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      confessions: this.initConfessions(),
      tweets: [{id: "1234", author_id:"@onhigh", author_name: "Joy Totheworld", text: "praise be to God, lord almighty", time: 0, likes: 0, comments: 0, rts: 0}],

    };


    this.fetchTweets = this.fetchTweets.bind(this);
    this.addTweet = this.addTweet.bind(this);
    this.getTweet = this.getTweet.bind(this);

    this.updateDimensions = this.updateDimensions.bind(this);
    this.moveConfessions = this.moveConfessions.bind(this);
  }


  componentDidMount() {
    this.interval = setInterval(this.moveConfessions, 30);
    this.fetchTweets();
    alert("Thanks for your confession. Uploading to the cloud...");
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  updateDimensions() {

    // this.setState({windowX, windowY, tweetX, tweetY})
  }

  async fetchTweets() {
    // const query = encodeURI("\#confession");
    // console.log("WERERE", query);
    const url = `/api/get/%23confession`;
    const response = await fetch(url);
    const initialRes = await response.json();

    if (initialRes.tweets.data) {
      // const mode = Math.floor(Math.random()*3);
      // let id = 0;//getMostEngagement(mode, initialRes.tweets.data); //Math.floor(Math.random()*10);
      // const tweet = initialRes.tweets.data[id];
      // const user = initialRes.tweets.includes.users[id];
      // this.addTweet(tweet, user);
      let i = 0;
      const users = initialRes.tweets.includes.users;

      console.log("USERS", users);
      for (const tweet of initialRes.tweets.data) {
        const id = tweet.author_id;
        const findUserByID = users.filter(user => {
          return user.id == id
        })
        if (findUserByID[0] && tweet) this.addTweet(i++, tweet, findUserByID[0]);
      }

    }
    else {
      console.log("NO TWEETS");
    }

    console.log("DONE", this.state.tweets);
  }

  getTweet(id) {
    const {tweets, confessions} = this.state;
    if (tweets[id]) {
      const {text, name, username, url, likes, rts, replies, time, tweetID} = tweets[id];
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
      return <div>{confessions[id].txt}</div>
    }


    addTweet(i, tweetObj, user) {
      // console.log("TWEET", tweetObj);
      // console.log("USER", user);

      let {tweets} = this.state;
      const tweet = {};
      tweet.text = getTweetContent(tweetObj.text);
      tweet.time = "5s"; //getTweetTime(tweetObj.created_at);
      tweet.tweetID = tweetObj.id;
      tweet.name = user.name;
      tweet.url = user.profile_image_url;
      tweet.username = user.username;
      tweet.likes = tweetObj.public_metrics.like_count;
      tweet.rts = tweetObj.public_metrics.retweet_count;
      tweet.replies = tweetObj.public_metrics.reply_count;
      if (i === 0) tweets[0] = tweet;
      else tweets.push(tweet);
      this.setState({tweets});
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
      const {confessions, tweets} = this.state;

      return (
        <div className="WaveForms Sketch">
          {confessions.map((confession, i) => {
            const box={x: 100+i*20, y:100+i*20, w:400};
            return <DesktopIcon key={i} title={"#confession"} ondblclick={this.ondblclick.bind(this)} x={0} y={confession.y} dx={confession.x} dy={confession.y} box={box}
              content={
                <img src={window.AWS+"/waveforms/txt.png"} width={80} height={80} />
              }
              frameContent={
                <div className="confession-txt">{this.getTweet(i)}</div>
              }
              />
          })}
          <Glasses y={30} />
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
        fn: (key, result) =>  {
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
          }
        ];

        let processed = processString(config)(string);
        return processed;
      }

      export default Confessions;
