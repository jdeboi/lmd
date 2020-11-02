import React from 'react';
import Frame from '../../shared/Frame/Frame';

// import FrameSimple from '../../shared/Frame/FrameSimple';
import './WaveForms.css';
import ReactPlayer from 'react-player'

import ReactAudioPlayer from 'react-audio-player';

import {getRandomNum, getNewZIndices} from '../../shared/Helpers/Helpers';
import {getTweetContent, initConfessions, initZIndicesIcons, initZIndicesFrames} from './components/Helpers';
import Confession from './components/Confession';
// import mainVid from  "./assets/waves2_lines.mp4";
// import dove from  "./assets/dove_t.gif";
// import shellSound from "./assets/shell_sound.wav";

import Glasses from '../../shared/Glasses/Glasses';



// import txt from './assets/Canned/txt.png';

import { faEye,faRetweet, faVideo, faMicrophoneAlt, faMicrophoneAltSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Confessions extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.state = {
      confessions: initConfessions(),
      tweets: [],
      time: 0,
      zIndicesIcons: initZIndicesIcons(),
      zIndicesFrames: initZIndicesFrames()
    };


    this.fetchTweets = this.fetchTweets.bind(this);
    this.addTweet = this.addTweet.bind(this);
  }


  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 30);
    this.fetchTweets();
    // this.props.userSetRoom("confessions");
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    // this.props.userLeaveRoom("confessions");
  }


  async fetchTweets() {
    // const query = encodeURI("\#confession");
    // console.log("WERERE", query);
    const url = `/api/get/tweets/%23confession`;
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




  addTweet = (i, tweetObj, user) => {
    // console.log("TWEET", tweetObj);
    // console.log("USER", user);

    let tweets = [...this.state.tweets];
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



  newIconToTop = (id) => {
    console.log("id", id)
    const newZ = getNewZIndices(id, this.state.zIndicesIcons);
    this.setState({zIndicesIcons: newZ});
    // console.log("ZZZ", this.state.zIndices);
  }


  newFrameToTop = (id) => {
    const newZ = getNewZIndices(id, this.state.zIndicesFrames);
    this.setState({zIndicesFrames: newZ});
    // console.log("ZZZ", this.state.zIndices);
  }

  onDblClick = (id) => {
    // console.log(id);
    this.newFrameToTop(id);
  }

  render() {
    const {confessions, tweets, time, zIndicesIcons, zIndicesFrames} = this.state;

    return (
      <div className="WaveForms Sketch">
        {
          confessions.map((confession, i) => {
            const props = {
              zIcon: zIndicesIcons[i],
              zFrame: zIndicesFrames[i],
              time: time,
              tweet: tweets[i],
              confession: confessions[i],
              onDblClick: this.onDblClick,
              newFrameToTop: this.newFrameToTop,
              newIconToTop: this.newIconToTop,
            }
            return(<Confession key={i} i={i}  {...props}/>)
          })
        }
        <Glasses y={30} />
      </div>
    );
  }
}



export default Confessions;
