import React from 'react';
import "./ClickMe.css";

import { AnaglyphUniversalCamera, HemisphericLight, Vector3, SceneLoader,AssetContainer, StandardMaterial, PhotoDome, CubeTexture, Color3,Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx'; // import the component above linking to file we just created.

import Frame from '../../shared/Frame/Frame';
// import FrameSimple from '../../Universal/Frame/FrameSimple';

// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Glasses from '../../shared/Glasses/Glasses';

// palm https://poly.google.com/view/ficLBIjGliK

var loaded = false;
var face;

class ClickMe extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      isLoading: true
    }

    this.onRender = this.onRender.bind(this);
    this.onSceneReady = this.onSceneReady.bind(this);
  }


  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  onSceneReady(scene) {
    // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
    var camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 8, -5), 0.033, scene);
    scene.clearColor = Color3.Black();
    // scene.fogMode = Scene.FOGMODE_LINEAR;
    // scene.fogStart = 520.0;
    // scene.fogEnd = 560.0;
    // scene.fogColor = new Color3(0);

    camera.setTarget(new Vector3(0, 8, 0));

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);
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


    // addSkybox(scene);
    addFace(scene);

  }





  onRender(scene) {

    let divFps = document.getElementById("fps");
    if(divFps) divFps.innerHTML = scene.getEngine().getFps().toFixed() + " fps";

    if(face) {
      console.log("ok")
      face.rotation.y = Math.PI*.4 * Math.sin((new Date()).getTime()/800)+.3;
    }
  }

  getClickMenu() {
    let hands = ["🖐🏿","🖐🏾","🖐🏽","🖐🏼","🖐🏻"];
    return (
      <Frame title="" content={
          <div className="hands">
            {hands.map((val, i) => {
              return <Button key={i} className="hand" onClick={this.handChange.bind(this, i)} variant="outlined">{val}</Button>
            })}
          </div>
        }
        width={80} height={97*hands.length} x={window.innerWidth-100} y={(window.innerHeight-80-97*hands.length)/2}
        />
    );
  }

  handChange(index) {
    console.log(index);
  }



  render() {
    return (
      <div className="ClickMe">
        <div className="Frame-box">
          <BabylonScene antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />
          {this.getClickMenu()}
        </div>
        <Glasses />
      </div>
    )
  }

}

function addSkybox(scene) {
  var skybox;
  skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
  var skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new CubeTexture(process.env.PUBLIC_URL+"/textures/skybox/emoji/emoji_wall", scene);
  // skyboxMaterial.reflectionTexture = new CubeTexture("/textures/skybox/invert/skybox", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;
}


function addFace(scene) {

  var url = process.env.PUBLIC_URL + "/assets/clickMe/face/"
  SceneLoader.LoadAssetContainer(url, "me2.obj", scene, function (container) {
    var meshes = container.meshes;

    face = meshes[0];

    // face.rotation.y = Math.random()*Math.PI*2;
    face.rotation.x = Math.PI;
    // face.rotation.z = (-.3+Math.random()*.6);

    face.position.y = 5;
    face.position.x = 0;
    face.position.z = 15;
    face.scaling = new Vector3(50, 50, 50);

    // Create materials
    var myMaterial = new StandardMaterial("myMaterial", scene);
    myMaterial.diffuseColor = new Color3(.4, .4, .4);
    myMaterial.specularColor = new Color3(0.1, 0.1, 1);
    // myMaterial.emissiveColor = new Color3(1, 1, 1);
    myMaterial.ambientColor = new Color3(0.5, .5, 0.53);

    face.material = myMaterial;
    // face.material.wireframe = true;

    container.addAllToScene();  // Adds all elements to the scene

    loaded = true;

  });
}


export default ClickMe;
