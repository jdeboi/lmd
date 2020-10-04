import React from 'react';
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Tweet extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

  }

  render() {
    console.log("rendering tweeet");
    if (this.props.tweet) {
      return this.getTweet(this.props.tweet);
    }
    return <div>{this.props.confession.txt}</div>
  }

  getTweet = (tweet) => {
    const {text, username, url, likes, rts, replies, time, tweetID} = tweet;
    const tweetUri = `twitter.com/${username}/status/${tweetID}`;
    const profileUrl = "https://twitter.com/" + username;
    const tweetUriA = <a href={"https://"+tweetUri} target="_blank">{tweetUri.substring(0, 15) + "..."}</a>;
      var name = tweet.name;
      if (name.length > 24) name = name.substring(0, 24) + "...";
      return (
        <div className="tweet">
          <div className="tweet-top">
            <div className="tweeter-icon" style={{backgroundImage: `url(${url})`}}><div className="inner"></div></div>
            <div className="tweeter">
              <div className="person"><a href={profileUrl} target="_blank">{name}</a></div>
              <div className="tweet-handle"><a href={profileUrl} target="_blank">@{username}</a></div>
            </div>
            <div className="tweet-time">• {time}</div>
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

  }

  export default Tweet;
