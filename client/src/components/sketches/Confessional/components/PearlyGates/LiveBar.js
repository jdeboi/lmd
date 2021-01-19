import React from 'react';
import './LiveStream.css';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LiveBar extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    const timeInc = Math.floor(Math.random() * 300);

    this.state = {
      timeInc: timeInc,
      time: this.getTime(timeInc),
      watchers: Math.floor(Math.random() * 200),
    }
  }

  componentDidMount() {
    this.intervalTimer = setInterval(this.updateTime, 1000);
    this.intervalWatcher = setInterval(this.updateWatchers, 2200);
  }

  componentWillUnmount() {
    clearInterval(this.intervalTimer);
    clearInterval(this.intervalWatcher);
  }

  render() {
    const { time, watchers } = this.state;
    const {x, y} = this.props;
    const style = {
      top: y,
      left: x,
      width: 190
    }
    return (
      <div className="liveStream" style={style}><span className="live">LIVE</span><span className="time">{time}</span><span className="eye"><FontAwesomeIcon icon={faEye} /> {watchers}</span></div>
    );
  }


  getTime = (timeInc) => {
    let sec = timeInc % 60;
    let min = Math.floor(timeInc / 60);
    let hr = Math.floor(min / 60);
    // if (min < 10) min = "0" + min;
    if (hr < 10) hr = "0" + hr;
    if (sec < 10) sec = "0" + sec;

    let time = min + ":" + sec;
    return time;
  }

  updateTime = () => {
    // let {time, timeInc} = this.state;
    // timeInc++;
    const timeInc = this.state.timeInc + 1;
    const time = this.getTime(timeInc);
    this.setState({ time, timeInc });
  }

  updateWatchers = () => {
    const watchers = this.state.watchers;
    if (Math.random() < .3) {
      this.setState({ watchers: watchers + 1 })
    }
    else if (Math.random() < .6) {
      if (watchers - 1 < 1) this.setState({ watchers: 1 });
      else this.setState({ watchers: watchers - 1 })
    }
  }
}



export default LiveBar;
