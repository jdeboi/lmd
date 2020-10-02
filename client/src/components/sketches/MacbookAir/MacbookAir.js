import React from 'react';
import Frame from '../../shared/Frame/Frame';
import './MacbookAir.css';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
// import indigo from '@material-ui/core/colors/indigo';

import ReactPlayer from 'react-player'
// import mainVid from  "./assets/noframe.mp4";
// import cloudsVid from  "./assets/clouds3d.mp4";

import Glasses from '../../shared/Glasses/Glasses';

class MacbookAir extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.state = {
      videoSpeed : 1.0,


    }

    this.sliderOG= {x: 0, y: 0};
    this.mainOG= {x: 0, y: 0};

    this.cloudsRef = React.createRef();

    this.setSpeed = this.setSpeed.bind(this);
    this.getDimensions = this.getDimensions.bind(this);
    this.getMainWindow = this.getMainWindow.bind(this);
    this.getSliderWindow = this.getSliderWindow.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.resetPlayer, 22000);
    this.props.userSetRoom("macbook-air");
    console.log(window.AWS + "/macbookAir/noframe.mp4");
    // window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    // window.removeEventListener("resize", this.updateDimensions.bind(this));
    clearInterval(this.interval);
    this.props.userLeaveRoom("macbook-air");
  }

  setSpeed(speed) {
    this.cloudsRef.current.playbackRate = speed;
    this.setState({videoSpeed: speed});
  }

  getDimensions() {
    var headerH = 34;
    var toolbarH = 28;
    var {windowWidth, device, windowHeight} = this.props.dimensions;
    // var {} = this.props.dimensions;
    windowHeight -= headerH;

    const originalDim = {w: 840, h: 540};
    const aspectRatio = originalDim.w/originalDim.h;
    let minSpacing = Math.min(windowWidth*.05, 50);//windowWidth*.05;
    const windowAspectRatio = window.innerWidth/window.innerHeight;
    if (device === "desktop") return getPortraitDimensions();
    // else if (availableHeight >= originalDim.h) return getPortraitDimensions();
    else if (windowAspectRatio < 1) return getPortraitDimensions();
    else return getLandscapeDimensions();


    function getLandscapeDimensions() {
      windowHeight-=toolbarH;
      let windowDim = {w: originalDim.w, h: originalDim.h, x:0, y: 0};
      let sliderDim = {w: 80, h: windowDim.h, x: 0, y: 0, vertical:true};
      let availableHeight = windowHeight-minSpacing*2;
      let availableWidth = windowWidth - minSpacing*3 - sliderDim.w; // width of slider
      const windowAspectRatio = availableWidth/availableHeight;
      // should we max out the height or width in the available space?
      if (windowAspectRatio > aspectRatio) {
        // max device height out
        windowDim.h = availableHeight;
        windowDim.w = originalDim.w * windowDim.h/originalDim.h;
      } else {
        // max device height width
        windowDim.w = availableWidth;
        windowDim.h = originalDim.h * windowDim.w/originalDim.w;
      }
      let spacingFinal = (windowHeight-windowDim.h)/2;
      windowDim.x = (windowWidth - windowDim.w-sliderDim.w)/3;
      windowDim.y = spacingFinal; //(windowHeight - windowDim.h - 21 - 30)/2-5;

      // slider
      sliderDim.h = windowDim.h;
      let remainingSpace = windowWidth - windowDim.w - windowDim.x;
      let buffer = (remainingSpace - sliderDim.w)/2;
      sliderDim.x = windowDim.w + windowDim.x + buffer;
      sliderDim.y = windowDim.y;//(windowHeight-30- sliderDim.h-21)/2;

      return [windowDim, sliderDim];
    }
    function getPortraitDimensions() {
      windowHeight-= 2*toolbarH;
      let sliderDim = {w: 250, h: 64, x: 0, y: 0, vertical:false};
      // let availableHeight = windowHeight-60-85-minSpacing*3;
      let availableHeight = windowHeight-sliderDim.h-minSpacing*3;
      let availableWidth = windowWidth - minSpacing*2;
      let windowAspectRatio = availableWidth/availableHeight;

      let windowDim = {w: originalDim.w, h: originalDim.h, x:0, y: 0};

      if (windowAspectRatio > aspectRatio) {
        // max device height out
        windowDim.h = Math.min(availableHeight, originalDim.h);
        windowDim.w = Math.min(originalDim.w * windowDim.h/originalDim.h, originalDim.w);
      } else {
        // max device height width
        windowDim.w = Math.min(availableWidth, originalDim.w);
        windowDim.h = Math.min(originalDim.h * windowDim.w/originalDim.w, originalDim.h);
      }

      let spacingFinal = (windowHeight-sliderDim.h-windowDim.h)/3;
      // console.log(sliderDim.h, sliderspacingFinal)
      windowDim.x = windowWidth/2 - windowDim.w/2-2;
      windowDim.y = spacingFinal;//(windowHeight - windowDim.h)/4;

      // slider
      sliderDim.x = (windowWidth - sliderDim.w)/2;
      // let remainingSpace = windowHeight - windowDim.h - windowDim.y;
      // let buffer = (remainingSpace - sliderDim.h - 21)/2;
      sliderDim.y = windowDim.y + windowDim.h + toolbarH + spacingFinal;

      return [windowDim, sliderDim];
    }
  }


  getMainWindow(windowDim) {
    let dx = this.props.dimensions.flipped?-this.mainOG.x + windowDim.x: 0;
    let dy =  this.props.dimensions.flipped?-this.mainOG.y + windowDim.y: 0;

    if (this.props.dimensions.windowWidth <= 0 || windowDim.w <= 0) {
      return (<div></div>);
    }
    else {
      if (this.mainOG.x === 0) {
        this.mainOG.x = windowDim.x;
        this.mainOG.y = windowDim.y;
      }
      return (
        <Frame title="macbook air" content={
            /*<video width={dimW-2} height={dimH} muted loop autoPlay><source src={videoDimURL} type="video/mp4"></source></video>*/
            <ReactPlayer
              className={"react-player mainContent"}
              playing
              muted
              loop
              width={windowDim.w}
              height={windowDim.h}
              url={window.AWS + "/macbookAir/noframe.mp4"}
              playbackRate={this.state.videoSpeed}
              />
          }
          width={windowDim.w+2} height={windowDim.h} x={windowDim.x} y={windowDim.y} px={windowDim.x} py={windowDim.y}
          />
      )
    }
  }

  getSliderWindow(sliderDim) {

    // let offsetMain = {
    let dx = this.props.dimensions.flipped?100: 0;
    let dy =  this.props.dimensions.flipped?400: 0;


    // }
    if (this.props.dimensions.windowWidth <= 0) {
      return(<div></div>);
    }
    else {
      return(
        <Frame title="" icon="&#58160;" content={<div className="sliderBox"><ContinuousSlider callback={this.setSpeed} orientation={sliderDim.w<200?"vertical":"horizontal"} /></div>}
          width={sliderDim.w} height={sliderDim.h} x={sliderDim.x} y={sliderDim.y} px={sliderDim.x} py={sliderDim.y}
          />
      );
    }

  }

  render() {

    const frameDimensions = this.getDimensions();
    const windowDim = frameDimensions[0];
    const sliderDim = frameDimensions[1];

    return (
      <div className="MacbookAir Sketch">
          {/*<ReactPlayer
            className={"react-player backgroundCover"}
            playing
            muted
            loop
            width="100%"
            height="100%"
            url={cloudsVid}
            playbackRate={this.state.videoSpeed}
            />*/}
            <video ref={this.cloudsRef} autoPlay muted loop className="backgroundCover">
              <source src={window.AWS + "/macbookAir/clouds3d.mp4"} type="video/mp4" ></source>
              Your browser does not support HTML5 video.
            </video>
            {this.getMainWindow(windowDim)}
            {this.getSliderWindow(sliderDim)}
          <Glasses />
        </div>
      );
    }

  }


  function ContinuousSlider(props) {
    // const classes = useStyles();
    const [value, setValue] = React.useState(1.0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
      props.callback(newValue);
    };

    let style = {};
    style.height = props.orientation==="vertical"?"80px":"auto";
    style.width = props.orientation==="vertical"?"auto":"100px";

    return (
      <div className="Slider">
        <Grid container spacing={2}>
          <Grid item className="emoji-slider">
            <div className="cloud-emoji" aria-label="cloud"></div>
          </Grid>
          <Grid item xs>
            <Slider value={value} onChange={handleChange} orientation={props.orientation} style={style} color='primary' aria-labelledby="continuous-slider" step={0.1} min={0.0} max={2.0} defaultValue={1.0} />
          </Grid>
          <Grid item className="emoji-slider">
            <div className="gust-emoji" aria-label="dashing away"></div>
          </Grid>
        </Grid>
      </div>
    );
  }

  export default MacbookAir;
