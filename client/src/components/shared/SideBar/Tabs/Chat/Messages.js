import React from 'react';

class Messages extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    // console.log("MESSAGES", this.props.messages)
    return (
      <div>
      {this.props.messages.map((message, i) => {
        return (
          <div key={i}>{message.from} (to {message.to}): {message.message}</div>
        )
      })}
      </div>
    );
  }

}

export default Messages;
