import React from 'react';
const processString = require('react-process-string');

export function initConfessions() {
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
  return confessions;
}

export function initZIndicesIcons() {
  const zind = [];
  for (let i = 0; i < 8; i++) {
    zind[i] = i; // icons
  }
  return zind;
}

export function initZIndicesFrames() {
  const zind = [];
  for (let i = 0; i < 8; i++) {
    zind[i] = i+100; // icons
  }
  return zind;
}

export function getTweetContent(string) {
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

// function urlify(text) {
//   var urlRegex = /(https?:\/\/[^\s]+)/g;
//   return text.replace(urlRegex, function(url) {
//     return '<a href="' + url + '">' + url + '</a>';
//   })
// }