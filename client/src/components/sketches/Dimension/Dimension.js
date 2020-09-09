import React from 'react';
import "./Dimension.css";

import { AnaglyphUniversalCamera, HemisphericLight, MeshBuilder, PhotoDome, Vector3, Vector2, AssetContainer, SceneLoader, StandardMaterial, CubeTexture, Color3, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx'; // import the component above linking to file we just created.
import { WaterMaterial } from 'babylonjs-materials';
import 'babylonjs-loaders';

import Frame from '../../shared/Frame/Frame';
import FrameSimple from '../../shared/Frame/FrameSimple';
import Stair from './components/Stair';

import Castle from './components/Castle';

import Glasses from '../../shared/Glasses/Glasses';

// palm https://poly.google.com/view/ficLBIjGliK

var camera;
var water;
var castleBox;
var seed = 13;

class Dimension extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    }


    this.onRender = this.onRender.bind(this);

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
    camera = new AnaglyphUniversalCamera("af_cam", new Vector3(-10, 30, 20), 0.033, scene);
    scene.clearColor = Color3.Black();
    scene.collisionsEnabled = true;
    camera.setTarget(new Vector3(20, 20, 30));

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);
    // camera.inputs.clear();
    // camera.inputs.removeMouse();
    // camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    // light.diffuse = new Color3(1, 0, 0);
    // light.specular = new Color3(0, 1, 0);
    // light.groundColor = new Color3(0, 1, 0);
    // light.intensity = 2.7;

    // addWater(scene);
    addSkybox(scene);
    // addGround(scene);

    let castle = new Castle(30, window.innerWidth/30, window.innerHeight/30);
    castleBox = new Mesh.CreateBox("myparent", 1, scene);
    castleBox.position = new Vector3(0, 0, 0);
    castle.render(scene, castleBox);
  }


  onRender(scene) {
    castleBox.position.y = 1*Math.sin(new Date().getTime()/500);
    let divFps = document.getElementById("fps");
    if (divFps) divFps.innerHTML = scene.getEngine().getFps().toFixed() + " fps";
  }

  render() {
    let stairS = 100;
    let stairsURL = "https://media.giphy.com/media/13i9MA8PmVZMzu/giphy.gif";
    return (
      <div className="Dimension">
        <div className="Frame-box">
          <BabylonScene antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />
          <Frame title="dimension" content={<div>test</div>}
            width={260} height={100} x={100} y={100}
            />
          <Stair x={200} y={300} stepW={stairS} stepH={stairS} numSteps={5} stepDown={stairS*.75} url={stairsURL} />
          <Stair x={200} y={100} stepW={stairS} stepH={stairS*.7} numSteps={5} stepDown={stairS*.75} url={stairsURL} />

        </div>
        <Glasses />
      </div>
    )
  }

}



function addWater(scene) {
  var waterMesh = Mesh.CreateGround("waterMesh", 512, 512, 32, scene, false);
  water = new WaterMaterial("water", scene, new Vector2(1024, 1024));
  water.backFaceCulling = true;
  water.bumpTexture = new Texture(window.AWS+"/shared/waterbump.png", scene);
  water.windForce = -5;
  water.waveHeight = 0.8;
  water.bumpHeight = 0.3;
  water.waveLength = 0.3;
  // water.colorBlendFactor = 0;
  water.waterColor = new Color3(0, 0, .1);
  water.colorBlendFactor = 0;
  // water.addToRenderList();
  waterMesh.material = water;
}

function addSkybox(scene) {
  var skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
  var skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  // skyboxMaterial.reflectionTexture = new CubeTexture(process.env.PUBLIC_URL+"/textures/skybox/TropicalSunnyDay", scene);
  skyboxMaterial.reflectionTexture = new CubeTexture(window.AWS+"/shared/sky/galaxy/galaxy", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;

  // var dome = new PhotoDome("textureName", window.AWS+"/shared/sky/dome/hubble2.png", {resolution: 32, size: 1000}, scene);
}

function addGround(scene) {
  var groundTexture = new Texture(window.AWS+"/shared/grid.jpg", scene);
  groundTexture.vScale = groundTexture.uScale = 2.0;

  var groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseTexture = groundTexture;

  var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
  ground.position.y = -1;
  ground.rotation.y = Math.PI/2;
  ground.material = groundMaterial;
}

function getRandomNum(val) {
  var x = Math.sin(val) * 10000;
  return x - Math.floor(x);
}

export default Dimension;
