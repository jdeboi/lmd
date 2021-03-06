import React from 'react';

import './MacbookAir.css';

// components
import Frame from '../../shared/Frame/Frame';
import Slider from '@material-ui/core/Slider';

// store
import { connect } from 'react-redux';
import { doneLoadingApp } from '../../../store/actions/';
import { setSketchMusic, setNoSketchMusic, setSketchVolume } from '../../../store/actions/music';

// helpers
import { constrain, mapVal } from '../../shared/Helpers/Helpers';

class MacbookAir extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      videoSpeed: 1.0,

    }

    this.sliderOG = { x: 0, y: 0 };
    this.mainOG = { x: 0, y: 0 };

    this.cloudsRef = React.createRef();
    this.fanRef = React.createRef();

    this.setSpeed = this.setSpeed.bind(this);
    this.getDimensions = this.getDimensions.bind(this);
    this.getMainWindow = this.getMainWindow.bind(this);
    this.getSliderWindow = this.getSliderWindow.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.resetPlayer, 22000);
    this.props.doneLoadingApp();
    this.props.setSketchMusic("cloud", 0, .5);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
    const { ui } = this.props;
    if (ui.compositionStarted && !prevProps.ui.compositionStarted) {
      this.fanRef.current.play();
      this.cloudsRef.current.play();
    }
  }

  setSpeed(speed) {
    this.cloudsRef.current.playbackRate = speed;
    this.props.setSketchVolume(speed);
    this.fanRef.current.playbackRate = speed;
    // this.setState({ videoSpeed: speed });
  }

  getDimensions() {
    var ui = { ...this.props.ui };
    var toolbarH = ui.toolbarH;
    var windowWidth = ui.contentW;
    var windowHeight = ui.contentH;
    var aspectRatio = ui.contentW / ui.contentH;
    var minSpacing = 20;

    const originalDim = { w: 840, h: 540 };
    let maxF = 1.3;
    let factor = mapVal(ui.contentW, 1400, 2500, 1, maxF);
    factor = constrain(factor, 1, maxF);
    originalDim.w = Math.floor(originalDim.w * factor);
    originalDim.h = Math.floor(originalDim.h * factor);

    if (ui.hasFooter && ui.orientation === "landscape")
      return getLandscapeDimensions();
    return getPortraitDimensions();


    function getLandscapeDimensions() {
      let minSpacingX = 120;
      let minSpacingY = 40;
      let minSpacingMiddle = 20;
      windowHeight -= toolbarH;
      let windowDim = { w: originalDim.w, h: originalDim.h, x: 0, y: 0 };
      let sliderDim = { w: 80, h: windowDim.h, x: 0, y: 0, vertical: true };
      let availableHeight = windowHeight - minSpacingY * 2;
      let availableWidth = windowWidth - minSpacingX * 2 - minSpacingMiddle - sliderDim.w; // width of slider
      const windowAspectRatio = availableWidth / availableHeight;

      // should we max out the height or width in the available space?
      // in this case, there's more available width than the original image; 
      // max out height
      if (windowAspectRatio > aspectRatio) {
        windowDim.h = availableHeight;
        windowDim.w = originalDim.w * windowDim.h / originalDim.h;
      } else {
        // max device height width
        windowDim.w = availableWidth;
        windowDim.h = originalDim.h * windowDim.w / originalDim.w;
      }
      let spacingFinal = (windowHeight - windowDim.h) / 2;
      windowDim.x = (windowWidth - windowDim.w - sliderDim.w - minSpacingMiddle) / 2;
      windowDim.y = spacingFinal;

      // slider
      sliderDim.h = windowDim.h;
      sliderDim.x = windowDim.w + windowDim.x + minSpacingMiddle;
      sliderDim.y = windowDim.y;
      return [windowDim, sliderDim];
    }

    function getPortraitDimensions() {
      windowHeight -= 2 * toolbarH;
      minSpacing = 20;
      let sliderDim = { w: 250, h: 64, x: 0, y: 0, vertical: false };
      // let availableHeight = windowHeight-60-85-minSpacing*3;
      let availableHeight = windowHeight - sliderDim.h - minSpacing * 3 - 36;
      if (ui.hasFooter) availableHeight -= 60;
      let availableWidth = windowWidth - minSpacing * 2;
      let windowAspectRatio = availableWidth / availableHeight;

      let windowDim = { w: originalDim.w, h: originalDim.h, x: 0, y: 0 };

      if (windowAspectRatio < aspectRatio) {
        // max device height out
        windowDim.h = Math.min(availableHeight, originalDim.h);
        windowDim.w = Math.min(originalDim.w * windowDim.h / originalDim.h, originalDim.w);
      } else {
        // max device height width
        windowDim.w = Math.min(availableWidth, originalDim.w);
        windowDim.h = Math.min(originalDim.h * windowDim.w / originalDim.w, originalDim.h);
      }

      let spacingFinal = (windowHeight - sliderDim.h - windowDim.h) / 3;
      // console.log(sliderDim.h, sliderspacingFinal)
      windowDim.x = windowWidth / 2 - windowDim.w / 2 - 2;
      windowDim.y = spacingFinal;//(windowHeight - windowDim.h)/4;

      // slider
      sliderDim.x = (windowWidth - sliderDim.w) / 2;
      // let remainingSpace = windowHeight - windowDim.h - windowDim.y;
      // let buffer = (remainingSpace - sliderDim.h - 21)/2;
      sliderDim.y = windowDim.y + windowDim.h + toolbarH + spacingFinal;
      return [windowDim, sliderDim];
    }
  }


  getMainWindow(windowDim) {
    const { ui } = this.props;
    if (ui.width <= 0 || windowDim.w <= 0) {
      return null;
    }
    else {
      if (this.mainOG.x === 0) {
        this.mainOG.x = windowDim.x;
        this.mainOG.y = windowDim.y;
      }

      const title = "";//(ui.isMobile || ui.hasFooter)?"":"macbook air";
      return (
        <Frame title={title} content={
          <video
            ref={this.fanRef}
            width={windowDim.w}
            height={windowDim.h}
            muted
            loop
            playsInline
            autoPlay>
            <source src={window.AWS + "/macbookAir/noframe.mp4"} type="video/mp4"></source>
          </video>
        }
          width={windowDim.w + 2} height={windowDim.h} x={windowDim.x} y={windowDim.y} px={windowDim.x} py={windowDim.y}
        />
      )
    }
  }

  getSliderWindow(sliderDim) {

    if (this.props.ui.width <= 0) {
      return null;
    }
    else {
      return (
        <Frame title="" icon="&#58160;" content={
          <div className="sliderBox">
            {sliderDim.w < 200 ?
              <ContinuousSliderVert callback={this.setSpeed} h={sliderDim.h} w={sliderDim.w} /> : <ContinuousSliderHoriz callback={this.setSpeed} w={sliderDim.w} h={sliderDim.h} />}
          </div>
        }
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
        <video ref={this.cloudsRef} autoPlay muted playsInline loop className="backgroundCover">
          <source src={window.AWS + "/macbookAir/clouds3d.mp4"} type="video/mp4" ></source>
              Your browser does not support HTML5 video.
            </video>
        {this.getMainWindow(windowDim)}
        {this.getSliderWindow(sliderDim)}
        {/*Glasses />*/}
      </div>
    );
  }

}


function ContinuousSliderVert(props) {
  // const classes = useStyles();
  const [value, setValue] = React.useState(1.0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.callback(newValue);
  };

  let style = {};
  style.height = props.h - 12 * 2;
  style.width = "auto";
  let sliderStyle = { width: style.width, height: style.height - 105 }
  return (
    <div className="emoji-slider-vert emoji-slider" style={style}>
      <div className="emoji gust-emoji top" aria-label="dashing away"></div>
      <div className="slider"><Slider value={value} onChange={handleChange} orientation={"vertical"} style={sliderStyle} color='primary' aria-labelledby="continuous-slider" step={0.1} min={0.0} max={2.0} defaultValue={1.0} /></div>

      <div className="emoji cloud-emoji" aria-label="cloud"></div>
    </div>
  );
}

function ContinuousSliderHoriz(props) {
  // const classes = useStyles();
  const [value, setValue] = React.useState(1.0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.callback(newValue);
  };

  let style = {};
  style.height = "auto";
  style.width = 100;

  return (
    <div className="emoji-slider emoji-slider-horiz" style={{ height: "auto", width: props.w }}>
      <div className="cloud-emoji emoji left" aria-label="cloud"></div>
      <Slider value={value} onChange={handleChange} orientation="horizontal" style={style} color='primary' aria-labelledby="continuous-slider" step={0.1} min={0.0} max={2.0} defaultValue={1.0} />
      <div className="gust-emoji emoji" aria-label="dashing away"></div>
    </div>
  );
}



const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    music: state.music
  }
}

const mapDispatchToProps = () => {
  return {
    doneLoadingApp,
    setSketchMusic,
    setSketchVolume,
    setNoSketchMusic,
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(MacbookAir);

