import React from 'react';

class Messages extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    if (this.props.isMobilie) 
      this.scrollToTop();
    else 
      this.scrollToBottom();
  }

  componentDidUpdate() {
    if (this.props.isMobilie) 
      this.scrollToTop();
    else 
      this.scrollToBottom();
  }

  getUserById = (id) => {
    const users = this.state.users;
    if (users) return users.find(o => o.id === id);
    return null;
  }

  getUserNameById = (id) => {
    const users = this.state.users;
    if (users) {
      let obj = users.find(o => o.id === id);
      if (obj) return obj.userName;
    }
    return "";
  }

  scrollToBottom = () => {
    if (this.messagesEnd) this.messagesEnd.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  scrollToTop = () => {
    if (this.messagesStart) this.messagesStart.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  render() {
    if (this.props.isMobile) {
      return this.renderMobile();
    }
    return this.renderDesktop();
  }

  renderDesktop() {
    // const avatar = this.props.avatar;
    return (
      <div className="Chat-messages-box">
        <div className="Chat-messages-inner-box">
          {this.props.messages.map((message, i) => {
            let classN = "chat-from-" + (message.from==="me"?"me":"other");
            // console.log("MESSAGE", message);
            let avatarHidden = message.from==="me"?"hidden":"";
            let messageToCol = message.to==="room"||message.to==="all"?"message-to-red":"message-to";
            return (
              <div key={i} className={"bubbleContainer " + classN }>
                <div className={"avatar" + " " + avatarHidden}>{message.avatar}</div>
                <div className={"bubble"} key={i}>
                  <div className="message-deets"><span className="message-from">{message.from}</span> <span className={messageToCol}>(to {message.to})</span>:</div>
                  <div className="message-txt">{message.message}</div>
                </div>

              </div>
            )
          })}
          <div className="dummyText" style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
      </div>
    );
  }

  renderMobile() {
    // const avatar = this.props.avatar;
    return (
      <div className="Chat-messages-box">
        <div className="Chat-messages-inner-box">
          <div className="dummyText" style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesStart = el; }}>
          </div>
          {this.props.messages.slice(0).reverse().map((message, i) => {
            let classN = "chat-from-" + (message.from==="me"?"me":"other");
            // console.log("MESSAGE", message);
            let avatarHidden = message.from==="me"?"hidden":"";
            let messageToCol = message.to==="room"||message.to==="all"?"message-to-red":"message-to";
            return (
              <div key={i} className={"bubbleContainer " + classN }>
                <div className={"avatar" + " " + avatarHidden}>{message.avatar}</div>
                <div className={"bubble"} key={i}>
                  <div className="message-deets"><span className="message-from">{message.from}</span> <span className={messageToCol}>(to {message.to})</span>:</div>
                  <div className="message-txt">{message.message}</div>
                </div>

              </div>
            )
          })}
          
        </div>
      </div>
    );
  }

}

export default Messages;
