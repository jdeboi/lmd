import React from 'react';
import { connect } from 'react-redux';
import './Confessional.css';

// components
import Confession from './components/ConfessionIcon/Confession';
import TweetModal from './components/ConfessionIcon/Tweet/TweetModal';

// helpers
import { getNewZIndices } from '../../shared/Helpers/Helpers';
import { getNumConfessions, getTweetContent, initConfessions, initZIndicesIcons, initZIndicesFrames } from './components/Helpers';

class Confessions extends React.Component {

  constructor(props) {
    super(props);

    const numConfessions = getNumConfessions();
    
    this.state = {
      confessions: initConfessions(numConfessions),
      tweets: [],
      time: 0,
      zIndicesIcons: initZIndicesIcons(numConfessions),
      zIndicesFrames: initZIndicesFrames(numConfessions),
      modalTweetHidden: true,
      modalTweet: null,
      modalTweetConfession: null
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

      // console.log("USERS", users);
      for (const tweet of initialRes.tweets.data) {
        const id = tweet.author_id;
        const findUserByID = users.filter(user => {
          return user.id == id
        })
        if (findUserByID[0] && tweet) this.addTweet(i++, tweet, findUserByID[0]);
      }

    }
    else {
      // console.log("NO TWEETS");
    }

    // console.log("DONE", this.state.tweets);
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
    this.setState({ tweets });
  }



  newIconToTop = (id) => {
    // console.log("id", id)
    const newZ = getNewZIndices(id, this.state.zIndicesIcons);
    this.setState({ zIndicesIcons: newZ });
    // console.log("ZZZ", this.state.zIndices);
  }


  newFrameToTop = (id) => {
    const newZ = getNewZIndices(id, this.state.zIndicesFrames);
    this.setState({ zIndicesFrames: newZ });
    // console.log("ZZZ", this.state.zIndices);
  }

  onDblClick = (id) => {
    console.log(id);
    this.newFrameToTop(id);
  }


  setTweetModal = (tweet, confession) => {
    this.setState({ modalTweetHidden: false, modalTweet: tweet, modalTweetConfession: confession })
  }

  hideTweetModal = () => {
    this.setState({ modalTweetHidden: true });
  }

  render() {
    const { confessions, tweets, time, zIndicesIcons, zIndicesFrames } = this.state;


    return (
      <div className="Confessional Sketch">
        {
          confessions.map((confession, i) => {
            const props = {
              zIcon: zIndicesIcons[i],
              zFrame: zIndicesFrames[i],
              time: time,
              tweet: tweets[i],
              confession: confessions[i],
              setTweetModal: this.setTweetModal,
              onDblClick: this.onDblClick,
              newFrameToTop: this.newFrameToTop,
              newIconToTop: this.newIconToTop
            }
            // if (this.props.ui.width > 500)
              return (<Confession key={i} i={i}  {...props} />)
            // else if (i < 5)
            //   return (<Confession key={i} i={i}  {...props} />)
            return null;
          })
        }
        {
          this.props.ui.isMobile ?
            <TweetModal
              isHidden={this.state.modalTweetHidden}
              onHide={this.hideTweetModal}
              tweet={this.state.modalTweet}
              confession={this.state.modalTweetConfession}
              ui={this.props.ui}
            />
            : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    // doneLoadingApp
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Confessions);
