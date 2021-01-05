import React from 'react';
import Frame from '../../shared/Frame/Frame';
import './VorTech.css';

import { connect } from 'react-redux';

// Babylon
import { Scene, AnaglyphUniversalCamera, UniversalCamera, PostProcess, Effect, HemisphericLight, Vector3, Vector2, SceneLoader, AssetContainer, MeshBuilder, StandardMaterial, VideoTexture, CubeTexture, Color3, Color4, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx';
import Emoji from './Emoji';

var camera, water, waterMesh;
var lastVolume = 0;
var tubes = [];
var seed = 1;
var emojis = [];
var isFlushing = false;
var isStopping = false;
var handleDown = false;
var vidTex;

class VorTech extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    // this.imgW = 350;

    this.state = {
      // isFlushing : false
    }

  }


  componentDidMount() {

  }

  componentWillUnmount() {

  }


  mod(a, b) {
    return (((a % b) + b) % b);
  }

  onSceneReady(scene) {
    // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
    camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 0, -5), 0.033, scene);
    scene.clearColor = new Color4(0, 0, 0, 0);
    camera.setTarget(new Vector3(0, 0, 10));

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    const light = new HemisphericLight("light1", new Vector3(0, 0, -1), scene);
    light.intensity = .5;



    // Skybox
    // var skyW = 1000;
    // var skybox = Mesh.CreateBox("skyBox", skyW, scene);
    // var skyboxMaterial = new StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new CubeTexture(window.AWS+"/shared/sky/moon/moon", scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;

    for (let i = 0; i < 150; i++) {
      emojis[i] = new Emoji(scene);
    }


    var mat = new StandardMaterial("groundMaterial", scene);
    vidTex = new VideoTexture("video", window.AWS + "/vorTech/whirl2.mp4", scene, true);
    vidTex.video.volume = 0;
    vidTex.video.play();
    mat.diffuseTexture = vidTex;

    var plane = Mesh.CreateGround("plane", 512, 512, 32, scene, false);
    // plane.position.y = -10;
    plane.position.z = 180;
    plane.rotation.x = -Math.PI / 2;
    plane.material = mat;

  }


  onRender = (scene) => {
    for (const emoji of emojis) {
      // if (isFlushing)
      emoji.update(isStopping);
      // else emoji.hide();
    }
    if (this.props.music.volume != lastVolume) {
      vidTex.video.volume = this.props.music.volume*.2;
      lastVolume = this.props.music.volume;
    }


  }

  flushToilet = () => {
    // this.setState({isFlushing: true});
    isFlushing = true;
    handleDown = true;
    isStopping = false;
    for (const emoji of emojis) {
      // if (isFlushing)
      emoji.startFlush();
      // else emoji.hide();
    }
    setTimeout(this.stopFlush, 5000);
    setTimeout(this.handleUp, 1000);
  }

  stopFlush = () => {
    isFlushing = false;
    isStopping = true;
    // this.setState({isFlushing: false});
  }

  handleUp = () => {
    handleDown = false;
  }

  render() {

    const deg = handleDown ? "rotate(-20deg)" : "rotate(0deg)";
    return (
      <div className="VorTech Sketch" ref={this.divRef} >

        { <BabylonScene className="noSelect backgroundCover" antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />}
        <Frame title="" x={100} y={100} width={150} height={60} windowStyle={{ background: "transparent" }} content={
          <div className="flush">
            <button onClick={this.flushToilet} style={{ transform: deg }}><img src={window.AWS + "/vorTech/flush2.png"} /></button>
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
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(VorTech);

