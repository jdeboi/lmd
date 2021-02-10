import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Chat.css';
import Grid from '@material-ui/core/Grid';
// import Icon from '@material-ui/core/Icon';
import BackspaceIcon from '@material-ui/icons/Backspace';

class Chat extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.emojis = {
      response: [
        ["🖐","✋🏻","🖐🏼","🖐🏽","🖐🏾","🖐🏿"],
        ["👋","👋🏻","👋🏼","👋🏽","👋🏾","👋🏿"],
        ["👐","👐🏻","👐🏼","👐🏽","👐🏾","👐🏿"],
        ["🙌","🙌🏻","🙌🏼","🙌🏽","🙌🏾","🙌🏿"],
        ["🤲","🤲🏻","🤲🏼","🤲🏽","🤲🏾","🤲🏿"],
        ["✌️","✌🏻","✌🏼","✌🏽","✌🏾","✌🏿"],
        ["👆","👆🏻","👆🏼","👆🏽","👆🏾","👆🏿"],
        ["👉","👉🏻","👉🏼","👉🏽","👉🏾","👉🏿"]
      ],
      responseOG : ["🍆", "🍑","👌🏿","👆🏿","🌮","🌭","💦","🍩","🍌","🥕","🍯","👅","🖐","🦵","👐🏻","✌🏽","👋🏽","👙","💋","👄","🎆","🦴","😈"],
      other: ["🍆","🍑","🌮","🌭","💦","🍩","🍌","🥕","🍯","👅"],
      love : ["😍", "💗","😘", "💘","🥰","💋","😗","💖","😙","👄","😚","💓", "💝"],
      orgasm : ["😈","😮","🍆","🌭","🤪","😛","💦","😜","😝","🌮","🍌","🍩","💦","🤤","😱","🥕","🍯","🎆","💥","👅","👙","🤩"],
      typing:  {
        heart: "❤️",
        devil: "👹",
        heating: "🔥",
        touch: "👋",
        thinking: "💭",
        like: "💖",
        hands: "👐🏿",
        wut: "😱"
      }
    }

    this.state = {
      typing: false,
      emojiMessages: [],
      messages: [
        {id: "me", txt: "I like it when you use your " + this.emojis.typing.hands}
      ],
      messageIndex : 0
    }

    this.emojiClick = this.emojiClick.bind(this);
    this.emojiRemove = this.emojiRemove.bind(this);
    this.submitEmoji = this.submitEmoji.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.addEllipses = this.addEllipses.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }



  render() {

    const items = []
    var index = 0;
    for(var c = 5; c > 0; c--) {
      // items.push(<div className="row">);
      for(var r = 0; r < this.emojis.response.length; r++) {
        let value = this.emojis.response[r][c];
        items.push(<Button variant="outlined" key={index} onClick={() => this.emojiClick(value)}><Emoji value={value} /></Button>)
        index++;
      }
      // items.push(</div>);
    }

    //{// <div className="Chat-header">😳</div>}
    return (
      <div className="Chat">

        <div className="Chat-message-box">
          <div className="Chat-messages">
            <div className="Chat-messages-bounding">
              {this.state.messages.map((value, index) => {
                return <div className={"bubbleContainer " + value.id} key={index}>
                  <div className="bubble" key={index} >{value.txt}</div>
                </div>
              })}
            </div>
          </div>
        </div>
        <div className="Chat-input">
          <Grid container spacing={1}>
            <Grid item xs={7}>
              <div className="emojiBar">{this.state.emojiMessage}</div>
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" onClick={this.emojiRemove}><BackspaceIcon /></Button>
            </Grid>
            <Grid item xs={3}>
              <Button variant="outlined" onClick={this.submitEmoji}>Submit</Button>
            </Grid>
          </Grid>



        </div>
        <div className="Chat-buttons">
          {// {this.emojis.response.map((value, index) => {
            //   return <Button variant="contained" key={index} onClick={() => this.emojiClick(value)}><Emoji value={value} /></Button>
            // })}
          }
          {items}
        </div>
      </div>

    );
  }

  getEllipses(typing) {
    if(this.state.typing) {
      return <div className="me">...</div>
    }
  }

  emojiRemove() {
    var emojis = this.state.emojiMessages;
    if (emojis.length > 0) emojis.pop();
    // console.log("DELETE", msg);
    this.setState({emojiMessage: emojis});
  }

  emojiClick(value) {
    if (this.state.emojiMessages.length < 8) {
      var emojis = this.state.emojiMessages;
      emojis.push(value);
      this.setState({emojiMessage: emojis});
    }
  }

  submitEmoji() {
    if (this.state.emojiMessages.length > 0) {
      var messages = this.state.messages;
      var str = "";
      this.state.emojiMessages.forEach(emoji => {
        str += emoji;
      });
      messages.push({id:"you", txt: str})
      this.setState({messages: messages});
      var empty = this.state.emojiMessages;
      empty.splice(0, empty.length)
      this.setState({emojiMessages: empty});
      this.setState({typing: true})
      setTimeout(this.addEllipses, 500);
    }
    else {
      // console.log("enter a message")
    }
  }

  addEllipses() {
    var messages = this.state.messages;
    messages.push({id: "me", txt: "..."});
    this.setState({messages: messages})
    setTimeout(this.addMessage, 1500);
  }

  addMessage() {
    var messages = this.state.messages;
    messages[messages.length-1].txt= this.getMessage();
    this.setState({typing: false})
  }

  closeFrame() {

  }

  getMessage() {

    // let's warm up a little first?
    // I [like] that.
    // I'm [heating] up.
    // [Touch] me like that again
    // I like it when you use your [hands]
    // Is that what you're [thinking]? You dirty [devil]
    var messages = [
      `${this.emojis.typing.wut} ${this.emojis.typing.wut} im getting ${this.emojis.typing.heating}`,
      `${this.emojis.typing.touch} me like that again.`,
      `I ${this.emojis.typing.like} that.`,
      "I'm stuck in a silicon wafer. 👊🏿 me out???",
      "🤲 a cup of wind through the passenger window. I'd like to drink it.",
      "I'd trade 10 🐜 bites for your 🤝.",
      "Tell me more!",
      "I like the cut of your 💅🏾.",
      "Oh, more 👋🏿 please.",
      "Do you like using your 👐🏼?",
      "read my 🤲🏾. what do you see?",
      "stick an 👆🏾 in the outline of my right clavicle. What do you feel?",
      "you know, I could really go for a good wipe down.",
      "yes!",
      "💋 me with leathery 👄, ideally blistering. Let me feel the pealing dead skin.",
      "What are you thinking?",
      "Claw me with unclipped 💅🏼. Does that turn you on?",
      "my neck knots could use a " + this.getRandomHandEmoji(),
      "A good handful of pit hair. Would you braid it for me?",
      "Why don't you use those ✌🏿 to plug my 👃🏽? I'm sick of empty smells."
    ];

    messages.sort(function (a, b) { return 0.5 - Math.random() })

    var r = Math.random();
    if (r > .5) {
      this.state.messageIndex++;
      return messages[this.state.messageIndex%messages.length];
    }
    else if (r > .2) {
      return this.getRandomTouch();
    }
    else if (r > .1) {
      return this.getRandomOrgasmEmoji();
    }
    else {
      return this.getRandomLoveEmoji();
    }
  }


  getRandomOrgasmEmoji() {
    let r2 = Math.floor(Math.random()*this.emojis.orgasm.length);
    let num = Math.floor(Math.random()*4+1);
    let str = "";
    while (num > 0) {
      str += this.emojis.orgasm[(r2+num)%this.emojis.orgasm.length];
      num--;
    }
    return str;
  }

  getRandomHandEmoji() {
    let r =  Math.floor(Math.random()*this.emojis.response.length);
    let c =  Math.floor(Math.random()*this.emojis.response[0].length);
    return this.emojis.response[r][c];
  }

  getRandomLoveEmoji() {
    let r2 = Math.floor(Math.random()*this.emojis.love.length);
    let num = Math.floor(Math.random()*4+1);
    let str = "";
    while (num > 0) {
      str += this.emojis.love[(r2+num)%this.emojis.love.length];
      num--;
    }
    return str;
  }

  getRandomTouch() {
    let verbs = ["Touch", "Rub", "Grab", "Massage", "Crack", "Press", "Iron out", "Compress"];
    let parts = ["elbows", "knees", "hamstrings", "nostrils", "left shoulder blade", "spine", "belly fat", "ear cartilege", "knuckles"]
    let ends = [", please?", ", would you?", " before I forget the meaning of " + this.getRandomHandEmoji(), " aggressively", " gingerly", " with untrimmed nails"];
    let str = "";
    if (Math.random() > .5) str += verbs[Math.floor(Math.random()*verbs.length)];
    else str += this.getRandomHandEmoji();
    str += " my ";
    str += parts[Math.floor(Math.random()*parts.length)];
    str += ends[Math.floor(Math.random()*ends.length)];
    return str;
  }
}





function Emoji(props) {
  return (
    <span className="emoji-button" role="img" aria-label="">{props.value}</span>
  )
}

export default Chat
