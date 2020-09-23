import React from 'react';
import "./HardDrives.css";

import { AnaglyphUniversalCamera, HemisphericLight, Axis, Effect, PostProcess, Space, MeshBuilder, Vector3, Vector2, AssetContainer, SceneLoader, StandardMaterial, CubeTexture, Color3, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx'; // import the component above linking to file we just created.
import { WaterMaterial } from 'babylonjs-materials';
import 'babylonjs-loaders';

import Frame from '../../shared/Frame/Frame';
import FrameSimple from '../../shared/Frame/FrameSimple';

import Glasses from '../../shared/Glasses/Glasses';

// palm https://poly.google.com/view/ficLBIjGliK

var trees = [];
var bottles = [];
var camera;
var water;

var start;
var changed = false;

var scaler = 4;
var seed = 13;

class HardDrives extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      island : "https://www.google.com/maps/embed?pb=!4v1591730465198!6m8!1m7!1sCAoSLEFGMVFpcFBTYW9SYVFBMmR0QjhoeTVaSUs5R3lQaGJBNVB5dVhFQ2o0UVdW!2m2!1d-17.3611139!2d177.1339841!3f99.14217177224654!4f16.212409154729073!5f0.5970117501821992",
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      urlIndex: 0,
      birdInitialsX: [],
      birdInitialsY: [],
      flyIndex: 0,
      flyDirection: true
    }

    this.svFrame = {};
    const f = .8;
    this.svFrame.w = 600*f;
    this.svFrame.h = 450*.8*f;
    this.svFrame.x = (window.innerWidth - this.svFrame.w)*.3;
    this.svFrame.y = (window.innerHeight - this.svFrame.h-30)*.4;

    this.controller = {};
    this.controller.w = 250;// 350;
    this.controller.h = 60;
    // let bottomRemaining = window.innerHeight - (this.svFrame.y + this.svFrame.h);
    this.controller.y = this.svFrame.h + this.svFrame.y + 30; //this.svFrame.y + this.svFrame.h + (bottomRemaining-(this.controller.h+20))/2;
    this.controller.x =  (window.innerWidth - this.controller.w)/2;

    this.onRender = this.onRender.bind(this);

    this.getBird = this.getBird.bind(this);
    this.updateBirds = this.updateBirds.bind(this);
    this.addingBirds = true;

  }


  componentDidMount() {
    this.updateDimensions();
    this.initBirds();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    if (this.addingBirds) this.interval = setInterval(this.updateBirds, 50);
    // console.log("Thanks to Jarlan Perez for the lime: https://poly.google.com/view/4Ddq9357jQ-");
    console.log("https://poly.google.com/view/3NwnG7YRk7A")
    console.log("Thanks to Slanted Studios for the bird gif: https://giphy.com/media/l3Uchq9s6Hx0aK8F2/giphy.gif");
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));

    if(this.addingBirds) clearInterval(this.interval);
  }

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  onSceneReady(scene) {
    start = new Date();
    // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
    camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 8*scaler, -5*scaler), 0.033, scene);
    scene.clearColor = Color3.Black();
    camera.setTarget(new Vector3(0, 8*scaler, 0));

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);
    // camera.inputs.clear();
    // camera.inputs.removeMouse();
    camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 1.7;


    ///////////////////////////////////////////////////////////////////////////////
    addPalms(scene);

    // Ground
    var groundTexture = new Texture(window.AWS+"/shared/black_sand.jpg", scene);
    groundTexture.vScale = groundTexture.uScale = 20.0;

    var groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = groundTexture;

    var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
    ground.position.y = -1;
    ground.rotation.y = Math.PI/2;
    ground.material = groundMaterial;

    // Water
    var waterMesh = Mesh.CreateGround("waterMesh", 512*scaler, 512*scaler, 32, scene, false);
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
    water.addToRenderList(ground);
    // water.addToRenderList();

    waterMesh.material = water;

    addSkybox(scene);

    addBottles(scene, water);

  }


  onRender(scene) {

    for (let i = 0; i < trees.length; i++) {
      var sign = i % 2=== 0 ? 1 : -1;
      trees[i].rotation.y += .005 * sign;
    }

    let t = new Date();
    if (!changed && t - start > 5000) {
      // onInsta();
      changed = true;
    }

    let divFps = document.getElementById("fps");
    if(divFps) divFps.innerHTML = scene.getEngine().getFps().toFixed() + " fps";
  }

  nextIsland() {
    let islandIndex = this.state.urlIndex;
    islandIndex++;
    islandIndex %= this.beaches.length;
    console.log("beaches", this.beaches[islandIndex], islandIndex)
    this.setState({urlIndex: islandIndex, island: this.beaches[islandIndex]});
  }

  initBirds() {
    let birds = [];
    let xSpace = 100;
    let ySpace = 80;
    let num = Math.floor(4*Math.random()+2);
    let d =  Math.random();
    const dir = true;
    const birdInitialsX = [];
    const birdInitialsY = [];

    for (var i = 0; i < num; i++) {
      let mid = num/2;

      let dx = i * xSpace + Math.random()*30;
      if (i >= mid) dx = (num - i) * xSpace + Math.random()*30;
      if (num%2 == 0 && i>= mid) dx += xSpace/2;

      let dy = i * ySpace + Math.random()*10;

      let x0 = dx-300;
      let y0 = dy;
      birdInitialsX[i] = x0;
      birdInitialsY[i] = y0;
    }
    this.setState({birdInitialsX, birdInitialsY, flyDirection: dir});
  }

  updateBirds() {
    const maxW = this.state.windowWidth+600;
    const {flyIndex, flyDirection} = this.state;
    if (flyIndex > maxW) {
      this.setState(prevState => ({
        flyDirection: !prevState.flyDirection,
        flyIndex: 0
      }));
    }
    else {
      const inc = 5;
      this.setState({flyIndex: this.state.flyIndex+inc});
    }
  }

  getBird(index) {
    const bird = this.getBirdLocation(index);
    return (
      <FrameSimple title="" content={
          <div className={"bird " + (this.state.flyDirection?"flippedX":"")}></div>
        }
        width={78+2} key={index} windowStyle={{background: "transparent"}} height={60} px={bird.x} py={bird.y}
        />
    )
  }

  getBirdLocation(index) {
    const {flyIndex, flyDirection, birdInitialsX, birdInitialsY, windowWidth} = this.state;
    const bird = {};
    if (flyDirection) {
      bird.x = flyIndex + birdInitialsX[index];
      bird.y = birdInitialsY[index]+50*Math.sin(bird.x/100);
      bird.y = Math.floor(bird.y);
    } else {
      bird.x = (windowWidth+100) - (flyIndex + birdInitialsX[index]);
      bird.y = birdInitialsY[index]+50*Math.sin(bird.x/100);
      bird.y = Math.floor(bird.y);
    }
    return bird;
  }

  addBirds(ind=0) {
    return (
      <div className="birds">
        {this.state.birdInitialsX.map((pos, index) => {
          return (this.getBird(index))
        })}
      </div>
    );
  }


  render() {
    return (
      <div className="HardDrives Sketch">
        <BabylonScene antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />

        <Frame title="hard drives on seashores" content={
            <iframe title="island view" src={this.state.island} width={this.svFrame.w} height={this.svFrame.h} frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
          }
          width={this.svFrame.w} height={this.svFrame.h} x={this.svFrame.x} y={this.svFrame.y}
          />
        {this.addBirds()}
        <Glasses />
      </div>
    )
  }

}

function addSkybox(scene) {
  // Skybox
  var skybox;
  skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
  var skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  // skyboxMaterial.reflectionTexture = new CubeTexture(process.env.PUBLIC_URL+"/textures/skybox/TropicalSunnyDay", scene);
  skyboxMaterial.reflectionTexture = new CubeTexture(window.AWS+"/hardDrives/skybox/skybox", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;
  if (skybox) water.addToRenderList(skybox);
  // var dome = new PhotoDome("textureName", process.env.PUBLIC_URL+"/textures/skybox/sky-10.png", {resolution: 32, size: 1000}, scene);

}
function printBottles(bottles) {
  let bots = [];
  for (let i = 0; i< bottles.length; i++) {
    let bottle = bottles[i];
    let {x, y, z} = bottle.position;
    let pos = {x: x, y:y, z: z};

    let rot ={x: bottle.rotation.x, y:bottle.rotation.y, z: bottle.rotation.z};
    bots.push({id: i, pos:  pos, rot: rot});
  }
  console.log(JSON.stringify(bots));
}

function getRandom() {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
function getRandomNum(val) {
  var x = Math.sin(val) * 10000;
  return x - Math.floor(x);
}

function addBottles(scene, water) {
  // var container = new AssetContainer(scene);
  var url = window.AWS + "/hardDrives/Corona/"
  SceneLoader.LoadAssetContainer(url, "Corona2.obj", scene, function (container) {
    var meshes = container.meshes;
    // var materials = container.materials;

    // console.log("meshes", meshes);

    var bottle = meshes[1];
    var diam = 280;
    // bottle.rotation.y = Math.random()*Math.PI*2;
    // bottle.rotation.x = Math.PI;
    // bottle.rotation.z = (-.3+Math.random()*.6);
    // bottle.position.y = 2//Math.abs((Math.sin(((x / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.x * 5.0) + (Math.cos(((z / 0.05) +  time * water.waveSpeed)) * water.waveHeight * water.windDirection.y * 5.0));
    // bottle.position.x = Math.random()*diam-diam/2;
    // bottle.position.z = Math.random()*diam-diam/2;
    // bottle.scaling = new Vector3(.15, .15, .15);
    // bottles.push(bottle);

    container.addAllToScene();  // Adds all elements to the scene
    water.addToRenderList(bottle);

    let bottleVectors = [
      {},
      {"id":0,"pos":{"x":88,"y":0,"z":128},"rot":{"x":0,"y":0,"z":0}},
      {"id":1,"pos":{"x":38,"y":0,"z":78},"rot":{"x":0,"y":0,"z":0}},
      {"id":2,"pos":{"x":68,"y":0,"z":108},"rot":{"x":0,"y":0,"z":0}},
      {"id":3,"pos":{"x":0,"y":0,"z":108},"rot":{"x":0,"y":0,"z":0}},
      {"id":4,"pos":{"x":-88,"y":0,"z":98},"rot":{"x":0,"y":0,"z":0}},
      {"id":5,"pos":{"x":-78,"y":0,"z":68},"rot":{"x":0,"y":0,"z":0}},
      {"id":6,"pos":{"x":3,"y":0,"z":148},"rot":{"x":0,"y":0,"z":0}},
      {"id":7,"pos":{"x":4,"y":0,"z":28},"rot":{"x":0,"y":0,"z":0}},
      {"id":8,"pos":{"x":-40,"y":0,"z":-98},"rot":{"x":0,"y":0,"z":0}}, // back
      {"id":8,"pos":{"x":-70,"y":0,"z":98},"rot":{"x":0,"y":0,"z":0}},

      // back (repeat)
      {"id":0,"pos":{"x":88,"y":0,"z":-128},"rot":{"x":0,"y":0,"z":0}},
      {"id":1,"pos":{"x":38,"y":0,"z":-78},"rot":{"x":0,"y":0,"z":0}},
      {"id":2,"pos":{"x":68,"y":0,"z":-108},"rot":{"x":0,"y":0,"z":0}},
      {"id":3,"pos":{"x":0,"y":0,"z":-108},"rot":{"x":0,"y":0,"z":0}},
      {"id":4,"pos":{"x":-88,"y":0,"z":-98},"rot":{"x":0,"y":0,"z":0}},
      {"id":5,"pos":{"x":-78,"y":0,"z":-68},"rot":{"x":0,"y":0,"z":0}},
      {"id":6,"pos":{"x":3,"y":0,"z":-148},"rot":{"x":0,"y":0,"z":0}},


      // left
      {"id":0,"pos":{"x":188,"y":0,"z":48},"rot":{"x":0,"y":0,"z":0}},
      {"id":1,"pos":{"x":138,"y":0,"z":28},"rot":{"x":0,"y":0,"z":0}},
      {"id":2,"pos":{"x":168,"y":0,"z":0},"rot":{"x":0,"y":0,"z":0}},
      {"id":3,"pos":{"x":100,"y":0,"z":-20},"rot":{"x":0,"y":0,"z":0}},


      // right
      {"id":0,"pos":{"x":-188,"y":0,"z":30},"rot":{"x":0,"y":0,"z":0}},
      {"id":1,"pos":{"x":-138,"y":0,"z":20},"rot":{"x":0,"y":0,"z":0}},
      {"id":2,"pos":{"x":-168,"y":0,"z":0},"rot":{"x":0,"y":0,"z":0}},
      {"id":3,"pos":{"x":-100,"y":0,"z":-18},"rot":{"x":0,"y":0,"z":0}},
    ]





    for (let i = 1; i < bottleVectors.length; i++) {
      let copy = container.instantiateModelsToScene().rootNodes[0];
      copy.rotation.y = getRandom()*Math.PI*2;
      copy.rotation.x = Math.PI;
      copy.rotation.z = (-.3+getRandom()*.6);
      copy.position.y = 2; //Math.abs((Math.sin(((x / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.x * 5.0) + (Math.cos(((z / 0.05) +  time * water.waveSpeed)) * water.waveHeight * water.windDirection.y * 5.0));
      // copy.position.x = getRandom()*diam-diam/2;
      // copy.position.z = getRandom()*diam-diam/2;

      // copy.rotation.x = bottleVectors[i].rot.x;
      // copy.rotation.y = bottleVectors[i].rot.y;
      // copy.rotation.z = bottleVectors[i].rot.z;
      copy.position.x = bottleVectors[i].pos.x;
      // copy.position.y = bottleVectors[i].pos.y;
      copy.position.z = bottleVectors[i].pos.z;

      bottles.push(copy);
      water.addToRenderList(copy);
    }

    // printBottles(bottles);
  });

}

function addPalms(scene) {
  var container = new AssetContainer(scene);
  var url = window.AWS + "/hardDrives/palm/";
  SceneLoader.LoadAssetContainer(url, "QueenPalmTree.obj", scene, function (container) {
    var meshes = container.meshes;

    let positions = [{x: -5, y: 0, z: -2},{x: 5, y: 0, z: -2}, {x: 4, y: 0, z: -10}, {x: -4, y: 0, z: -10}]

    meshes[1].rotation.y = 0;
    meshes[1].scaling = new Vector3(scaler, scaler, scaler);
    meshes[1].position.x = positions[0].x*scaler;
    meshes[1].position.y = positions[0].y*scaler;
    meshes[1].position.z = positions[0].z*scaler;

    trees.push(meshes[1]);

    container.addAllToScene();  // Adds all elements to the scene
    water.addToRenderList(trees[0]);

    for (let i = 1; i < positions.length; i++) {
      let copy = container.instantiateModelsToScene().rootNodes[1];
      copy.rotation.y = Math.PI*1.5;
      copy.position.x = positions[i].x*scaler;
      copy.position.z = positions[i].z*scaler;
      trees.push(copy);
      water.addToRenderList(copy);
    }

  });

}


export default HardDrives;
