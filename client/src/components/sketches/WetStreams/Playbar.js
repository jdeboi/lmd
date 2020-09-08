import React from 'react';
import "./Playbar.css";
import Frame from '../../shared/Frame/Frame';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
class Playbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      oldPercent: 0,
      percent: 0,
      loadPercent: 100,
      loadRate: this.props.loadRate | 1,
      playRate: this.props.playRate | 1,
      isPlaying: this.props.isPlaying | true,
      isLoading: true,
      sliderDragged: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.updateLoadRate = this.updateLoadRate.bind(this);
    this.update = this.update.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.onPercentChange = this.onPercentChange.bind(this);
    this.sliderUp = this.sliderUp.bind(this);
  }

  componentDidMount() {
    // this.timer = setInterval(this.updateLoadRate, 500);
    this.play = setInterval(this.update, 50);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.play);
  }

  handleChange(event, newValue) {
    this.setState({percent: newValue, loadPercent: Math.max(newValue,this.state.loadPercent), isLoading: true, sliderDragged: true});
    this.onPercentChange();
  };


  update() {
    let {isPlaying, isLoading, percent, loadPercent, playRate} = this.state;
    if (isPlaying && !isLoading && !this.state.sliderDragged) {
      percent += playRate;
      if (percent > loadPercent) {
        percent = loadPercent;
        isLoading = true;
      }
      else if (percent > 100) {
        percent = 100;
        isPlaying = false;
      }

      this.setState({isPlaying: isPlaying, isLoading: isLoading, percent: percent });
      this.onPercentChange();
    }
  }

  onPercentChange() {
    if (this.props.onPercentChange) {
      this.props.onPercentChange(this.state.percent);
    }
  }

  updateLoadRate() {
    let {oldPercent, loadPercent} = this.state;

    if (loadPercent === 100) {
      this.setState({oldPercent: 100, loadPercent: 100, isLoading: false});
    }
    else {
      const diff = Math.random() * 10;
      loadPercent = Math.min(loadPercent + diff, 100);
      this.setState({loadPercent: loadPercent, isLoading: false});
    }

  }

  sliderUp() {
    this.setState({sliderDragged:false});
  }

  toggleButton() {
    let state = this.state.isPlaying;
    this.setState({isPlaying: !state}, () => {
      this.props.onToggle(!state);
    });
  }

  render() {
    return (
      <div className="Playbar" >
      <Grid  container spacing={1}>
      <Grid item>
      <Button className="playIcon" onClick={this.toggleButton}>
      <i className={this.state.isPlaying?"fa fa-pause":"fa fa-play"} aria-hidden="true"></i>
      </Button>
      </Grid>
      <Grid item >
      <div className="track">
      {/* onMouseUp={this.sliderUp} <LinearProgress className="progress" variant="determinate" value={this.state.loadPercent} />*/}
      <Slider className="playback" value={this.state.percent} onChange={this.handleChange} aria-labelledby="continuous-slider" />
      </div>
      </Grid>

      </Grid>
      </div>
    );
  }

}

// <div className="Playbar">
//   <div className="track">
//     <div className="playButton"></div>
//     <div className="track-loaded"></div>
//     <div className="track-played"></div>
//     <div className="knob"></div>
//   </div>
// </div>

export default Playbar;
