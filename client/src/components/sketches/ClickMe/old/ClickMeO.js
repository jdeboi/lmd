import React from 'react';
import "./ClickMe.css";

import { AnaglyphUniversalCamera, HemisphericLight, TextureLoader, MeshPhongMaterial, MeshBasicMaterial, Vector3, SceneLoader, MeshBuilder, StandardMaterial, PhotoDome, CubeTexture, Color3, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx'; // import the component above linking to file we just created.

import Frame from '../../shared/Frame/Frame';
// import FrameSimple from '../../Universal/Frame/FrameSimple';

import Sketch from './ClickMeSketch';
import Chat from './Chat';

// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



class ClickMe extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      handT: 0,
      handId: null,
      showHands: false,
      cursor: "point0"
    }

    this.loaded = false;
    this.face = null;
  }


  componentDidMount() {
  }

  componentWillUnmount() {
  }



  onSceneReady = (scene) => {
    // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
    this.camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 8, -5), 0.033, scene);
    this.scene = scene;
    scene.clearColor = Color3.Black();
    // scene.fogMode = Scene.FOGMODE_LINEAR;
    // scene.fogStart = 520.0;
    // scene.fogEnd = 560.0;
    // scene.fogColor = new Color3(0);

    this.camera.setTarget(new Vector3(0, 8, 0));

    const canvas = this.scene.getEngine().getRenderingCanvas();
    this.camera.attachControl(canvas, true);
    // camera.inputs.clear();
    // camera.inputs.removeMouse();
    // camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 1.7;


    ///////////////////////////////////////////////////////////////////////////////

    // Skybox
    // var dome = new PhotoDome("textureName", "/textures/metal.jpg", {resolution: 32, size: 1000}, scene);
    // dome.fovMultiplier = 2;

    // Ground
    // var groundTexture = new Texture("/textures/grid_blk.jpg", scene);
    // groundTexture.vScale = groundTexture.uScale = 20.0;
    //
    // var groundMaterial = new StandardMaterial("groundMaterial", scene);
    // groundMaterial.diffuseTexture = groundTexture;
    //
    // var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
    // ground.position.y = -1;
    // ground.rotation.y = Math.PI/2;
    // ground.material = groundMaterial;

    // addHands(scene);
    // this.addSkybox(scene);


  }


  addSkybox = (scene) => {
    var skybox;
    skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", this.scene);
    skyboxMaterial.backthis.faceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture(process.env.PUBLIC_URL + "/textures/skybox/emoji/emoji_wall", scene);
    // skyboxMaterial.reflectionTexture = new CubeTexture("/textures/skybox/invert/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
  }


 
  onRender = (scene) => {

  }




  render() {
    return (
      <div className="ClickMe Sketch">
        <BabylonScene className="noSelect backgroundCover" antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />

      </div>
    )
  }

}






export default ClickMe;
