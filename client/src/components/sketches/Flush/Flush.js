import React from 'react';
import Frame from '../../shared/Frame/Frame';
import './Flush.css';

import { connect } from 'react-redux';
import { setSketchMusic } from '../../../store/actions/music';

// Babylon
import { AnaglyphUniversalCamera, HemisphericLight, Vector3, StandardMaterial, VideoTexture, Color4, Mesh } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx';
import Emoji from './Emoji';

// helpers
import { mapVal, constrain } from '../../shared/Helpers/Helpers';

class Flush extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    // this.imgW = 350;

    this.state = {
      handleDown: false,
      isFlushing: true,
      isStopping: false
    }

  }


  componentDidMount() {
    this.props.setSketchMusic("flush", 0, .2);
  }

  componentWillUnmount() {

  }


  mod(a, b) {
    return (((a % b) + b) % b);
  }


  onSceneReady = (scene) => {
    // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
    this.scene = scene;
    this.camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 0, -5), 0.033, this.scene);

    this.scene.clearColor = new Color4(0, 0, 0, 0);
    this.camera.setTarget(new Vector3(0, 0, 10));

    // const canvas = this.scene.getEngine().getRenderingCanvas();
    // this.camera.attachControl(canvas, true);

    const light = new HemisphericLight("light1", new Vector3(0, 0, -1), this.scene);
    light.intensity = .5;



    this.emojis = [];
    for (let i = 0; i < 150; i++) {
      this.emojis[i] = new Emoji(this.scene);
    }


    var mat = new StandardMaterial("groundMaterial", this.scene);
    this.vidTex = new VideoTexture("video", window.AWS + "/vorTech/whirl2.mp4", this.scene, true);
    this.vidTex.video.volume = 0;
    // this.vidTex.video.play(); // is this needed?
    mat.diffuseTexture = this.vidTex;

    var plane = Mesh.CreateGround("plane", 512, 512, 32, this.scene, false);
    // plane.position.y = -10;
    plane.position.z = 180;
    plane.rotation.x = -Math.PI / 2;
    plane.material = mat;

    this.lastVolume = 0;
  }


  onRender = (scene) => {
    for (const emoji of this.emojis) {
      // if (isFlushing)
      emoji.update(this.state.isStopping);
      // else emoji.hide();
    }
    if (this.props.music.volume !== this.lastVolume) {
      this.vidTex.video.volume = 0; //this.props.music.volume * .2;
      this.lastVolume = 0; //this.props.music.volume;
    }

    // for mobile??
    if (this.vidTex.video && !this.isVideoPlaying()) {
      this.vidTex.video.play();
    }
  }

  isVideoPlaying = () => {
    let vid = this.vidTex.video;
    return !!(vid.currentTime > 0 && !vid.paused && !vid.ended && vid.readyState > 2);
  }

  flushToilet = () => {
    // this.setState({isFlushing: true});
    if (this.vidTex.video && !this.isVideoPlaying()) {
      this.vidTex.video.play();
    }
    const isFlushing = true;
    const handleDown = true;
    const isStopping = false;
    this.setState({ isFlushing, handleDown, isStopping })
    for (const emoji of this.emojis) {
      // if (isFlushing)
      emoji.startFlush();
      // else emoji.hide();
    }
    setTimeout(this.stopFlush, 5000);
    setTimeout(this.handleUp, 1000);
  }

  stopFlush = () => {
    const isFlushing = false;
    const isStopping = true;
    this.setState({ isFlushing, isStopping })
    // this.setState({isFlushing: false});
  }

  handleUp = () => {
    const handleDown = false;
    this.setState({ handleDown })
  }

  render() {

    const deg = this.state.handleDown ? "rotate(-20deg)" : "rotate(0deg)";
    let maxF = 1.3;
    let factor = mapVal(this.props.ui.contentW, 1400, 2500, 1, maxF);
    factor = constrain(factor, 1, maxF);
    const w = Math.floor(150 * factor);
    const h = Math.floor(60 * factor);
    return (
      <div className="Flush Sketch" ref={this.divRef} >

        { <BabylonScene className="noSelect" antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />}
        <Frame title=""
          x={100}
          y={100}
          width={w}
          height={h}
          windowStyle={{ background: "transparent" }}
          content={
            <div className="flush">
              <button onClick={this.flushToilet}
                style={{ transform: deg, width: w, height: h }}>
                <img
                  alt="toilet flush handle"
                  src={window.AWS + "/vorTech/flush2.png"}
                />
              </button>
            </div>
          }
        />
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    music: state.music
  }
}

const mapDispatchToProps = () => {
  return {
    // doneLoadingApp
    setSketchMusic
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Flush);

