import React from 'react';

class Clock extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      currentTimeString: 0
    }

    this.updateClock = this.updateClock.bind(this);
  }

  componentDidMount() {
    this.updateClock();
    this.interval = setInterval(this.updateClock, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  updateClock() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;

    // var currentSeconds = currentTime.getSeconds();
    // currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

    var timeOfDay = (currentHours < 12) ? "AM" : "PM";
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
    currentHours = (currentHours === 0) ? 12 : currentHours;

    var shortDays = [
      'Sun', //Sunday starts at 0
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ];
    var x = currentTime.getDay(); //This returns a number, starting with 0 for Sunday
    var day = (shortDays[x]);

    var currentTimeString = day + " " + currentHours + ":" + currentMinutes + " " + timeOfDay;

    this.setState({currentTimeString: currentTimeString});
  }


  render() {
    return(
      <span id="clock">{this.state.currentTimeString}</span>
    )
  }


}


export default Clock;
