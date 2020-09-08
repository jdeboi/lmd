import React from 'react';
import "./WetStreams.css";

///////////////////// Babylon
// import { Scene, AnaglyphUniversalCamera, UniversalCamera,PBRMaterial, HemisphericLight, Vector3, Vector2, SceneLoader,AssetContainer, MeshBuilder, StandardMaterial,  VideoTexture, CubeTexture, Color3,Color4, Mesh, Texture } from 'babylonjs';
// import BabylonScene from '../../Universal/Babylon.jsx'; // import the component above linking to file we just created.
// import { WaterMaterial } from 'babylonjs-materials';

///////////////////// other components
import Frame from '../../shared/Frame/Frame';
// import FrameSimple from '../../shared/Frame/FrameSimple';
// import ReactPlayer from 'react-player';
import Playbar from "./Playbar";

///////////////////// p5.js
import P5Wrapper from 'react-p5-wrapper';
import sketch from './wetSketch';
// import Stair from './Stair';

// palm https://poly.google.com/view/ficLBIjGliK
import Glasses from '../../shared/Glasses/Glasses';

class WetStreams extends React.Component {

  constructor(props) {
    super(props);

    this.startW = window.innerWidth;
    this.startH = window.innerHeight;

    // this.spacing = 15;
    // const availH = window.innerHeight -34 -2*26-3*this.spacing;
    const dim = 300; //Math.max(availH/2, 300);
    this.spacing = 15; //(window.innerHeight -30 -2*26-dim*2)/3;
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      showerFrame: {
        w: dim,
        h: dim,
        x: (window.innerWidth-dim*3 - this.spacing*2)/2,
        y: Math.max((window.innerHeight -34 -2*26-dim*2-this.spacing)/2, this.spacing)

      },
      deltaPositions: [
        {x: 0, y: 0},
        {x: 0, y: 0},
        {x: 0, y: 0},
        {x: 0, y: 0},
        {x: 0, y: 0},
        {x: 0, y: 0}
      ],
      isPlaying0: true,
      isPlaying1: true,
      percent0: 0,
      percent1: 1,
      playingStreams: [true, true, true, true, true, true]
    }
    // this.onRender = this.onRender.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.playStreamReset = this.playStreamReset.bind(this);
    this.toggleHandler = this.toggleHandler.bind(this);
  }

  handleDrag = (index, ui) => {
    let dx = ui.deltaX;
    let dy = ui.deltaY;
    // 1. Make a shallow copy of the items
    let dps = [...this.state.deltaPositions];
    // 2. Make a shallow copy of the item you want to mutate
    let dp = {...dps[index]};
    // 3. Replace the property you're intested in
    dp.x += dx;
    dp.y += dy;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    dps[index] = dp;
    // 5. Set the state to our new copy
    this.setState({deltaPositions:dps});
  };


  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.interval = setInterval(this.playStreamReset, 4000);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    clearInterval(this.interval);
  }

  updateDimensions() {
    let {showerFrame} = this.state;
    // const availH = window.innerHeight -30 -2*26-3*this.spacing;
    // const dim = Math.max(availH/2, 300);
    // showerFrame.w = dim;
    // showerFrame.h = dim;
    showerFrame.x = (window.innerWidth-showerFrame.w*3 - this.spacing*2)/2
    showerFrame.y = Math.max((window.innerHeight -34 -2*26-showerFrame.h*2-this.spacing)/2, this.spacing)

    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    this.setState({showerFrame: showerFrame});
  }

  playStreamReset() {
    const {playingStreams} = this.state;
    for (let i = 0; i < playingStreams.length; i++) {
      playingStreams[i] = Math.random()>.5;
    }
    this.setState({playingStreams})
  }

  toggleHandler(id, state) {
    let {playingStreams} = this.state;
    playingStreams[id] = state;
    this.setState({playingStreams});
  }

  render() {
    let {windowWidth, windowHeight, showerFrame, playingStreams} = this.state;
    let origins = [];
    // let space = 40;
    let startX = showerFrame.x;
    // if (startX < 0) startX = 0;

    // let spaceV = 40;
    let startY = showerFrame.y; //(windowHeight-60-2*showerFrame.h-spaceV)/2;
    // if (startY < 0) startY = 0;

    for (let i = 0; i < 3; i++) {
      origins[i] = {x: startX + i*(showerFrame.w + this.spacing), y: startY};
      origins[i+3] = {x: startX + i*(showerFrame.w + this.spacing), y: startY + showerFrame.h + this.spacing + 26};
    }

    let imgs = [7, 1, 3, 4, 8, 10];
    let offsets = [{x:215,y:328}, {x:215,y:215}, {x:50,y:195}, {x:132,y:254}, {x:260,y:335}, {x:285,y:330}];
    for (const offset of offsets) {
      const scaler = showerFrame.w/400;
      offset.x *= scaler;
      offset.y *= scaler;
    }
    let velocities = [
      {velX: {min: -.8, max:5}, velY: {min: -.5, max:0}},
      {velX: {min: -5, max:2}, velY: {min: -.5, max:0}},
      {velX: {min: -5, max:.8}, velY: {min: -.5, max:0}},
      {velX: {min: -5, max:.8}, velY: {min: -.5, max:0}},
      {velX: {min: -5, max:5}, velY: {min: -.5, max:0}},
      {velX: {min: -.5, max:5}, velY: {min: -.5, max:0}}
    ];
    let degrees = [0, 60, 90, 80, 40, 0];

    return (
      <div className="WetStreams Sketch">


      {/* https://media.giphy.com/media/Kk4f3yrTot95K/giphy.gif*/}


        {imgs.map((img, i) => {
          let title = "";
          if (i === 1) title = "wet streams";
          let dx = (this.state.windowWidth - this.startW)/2;
          let dy = (this.state.windowHeight - this.startH)/2;
          const isPlaying = playingStreams[i];
          return getShower(i, origins[i].x, origins[i].y, dx, dy, showerFrame.w, showerFrame.h, img, this.handleDrag, (state) => {this.toggleHandler(i, state)}, title, isPlaying);
        })};


        <P5Wrapper className="p5sketch" sketch={sketch}
        origins={origins}
        offsets={offsets}
        velocities={velocities}
        deltas={this.state.deltaPositions}
        degrees={degrees}
        isPlaying={playingStreams}
        />

        <Glasses />
        </div>
      )
    }
  }

  function getShower(id, x, y,dx, dy, w, h, img, dragHandler, toggleHandler, title, isPlaying ) {
    //"./assets/images/tub/" + img + ".png"

    return(
      <Frame key={id} id={id} onDrag={dragHandler} title={title} content={
        <div className={id===5?"showerhead flippedX":"showerhead"}>
        <img src={require("./assets/showerHeads/" + img + ".png")} style={{width:w +"px", height:h+"px"}} alt="shower head" />
        <Playbar isPlaying={isPlaying} onToggle={toggleHandler} />
        </div>
      }
      width={w} height={h} x={x} y={y} dx={dx} dy={dy}
      />
    )

  }




  export default WetStreams;
