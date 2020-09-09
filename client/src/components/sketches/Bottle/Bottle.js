import React from 'react';
import "./Bottle.css";

import { AnaglyphUniversalCamera, HemisphericLight, Axis, Space, MeshBuilder, Vector3, Vector2, AssetContainer, SceneLoader, StandardMaterial, CubeTexture, Color3, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx'; // import the component above linking to file we just created.
import { WaterMaterial } from 'babylonjs-materials';
import 'babylonjs-loaders';

import Frame from '../../shared/Frame/Frame';
import FrameSimple from '../../shared/Frame/FrameSimple';

import Glasses from '../../shared/Glasses/Glasses';

// palm https://poly.google.com/view/ficLBIjGliK

var bottles = [];
var camera;
var water;
var seed = 13;

class Bottle extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      tweets: []
    }

    this.onRender = this.onRender.bind(this);


  }


  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log)
  }

  componentWillUnmount() {

  }

  onSceneReady(scene) {
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
    // Water
    addWater(scene);

    addSkybox(scene);

    addBottles(scene, water);
    addBoat();
  }


  onRender(scene) {

    bottles.map((bot, i) => {
      // let time = water._lastTime / 100000;
      // let x = botMesh.position.x;
      // let z = botMesh.position.z;
      bot.position.y = 3+.5*Math.sin((new Date()).getTime()/800);//Math.abs((Math.sin(((x / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.x * 5.0) + (Math.cos(((z / 0.05) +  time * water.waveSpeed)) * water.waveHeight * water.windDirection.y * 5.0));
      // bot.position.z += .005;
      // if (i%2 == 0) bot.position.x += .002;
      // else bot.position.x -= .002;

    });

    for (let i = 0; i < trees.length; i++) {
      var sign = i % 2=== 0 ? 1 : -1;
      trees[i].rotation.y += .005 * sign;
    }

    // for (let i = 0; i < limes.length; i++) {
    //   // limes[i].l.position.y = 3+.3*Math.sin((new Date()).getTime()/800);
    // }

    let r = 280;
    for (let i = 0; i < duckies.length; i++) {
      let angle = (new Date()).getTime()/10000 - getRandomNum(i+3)+i/2;
      // from 0 to PI/2, turn PI/2
      // from PI/2 to PI, turn PI
      // from PI to 1.5PI, PI
      duckies[i].position.x = duckies[i].position.x0 + r * Math.cos(angle);
      duckies[i].position.z = getRandomNum(i+10)*120 + r * Math.sin(angle);
      duckies[i].rotation.y = -angle;//Math.atan2(duckies[i].position.y, duckies[i].position.x);
      duckies[i].position.y = -6+1*Math.sin((new Date()).getTime()/800);
    }

    // for (let i = 0; i < tubes.length; i++) {
    //   tubes[i].position.y = 3+.3*Math.sin((new Date()).getTime()/800);
    //   if (!addedTubeWater) {
    //     water.addToRenderList(tubes[i]);
    //   }
    //   if (!addedTubeWater && i === tubes.length-1) addedTubeWater = true;
    // }

    let t = new Date();
    if (!changed && t - start > 5000) {
      // onInsta();
      changed = true;
    }

    let divFps = document.getElementById("fps");
    if(divFps) divFps.innerHTML = scene.getEngine().getFps().toFixed() + " fps";
  }


  // getIslandButton() {
  //   return (
  //     <Frame title="" content={
  //         <div className="controller-bar">
  //           <Button className="islandButton" onClick={this.nextIsland.bind(this)} variant="outlined">🏝️</Button>
  //         </div>
  //       }
  //       width={this.controller.w} height={this.controller.h} x={this.controller.x} y={this.controller.y}
  //       />
  //   );
  // }


  render() {
    return (
      <div className="Bottles">
        <div className="Frame-box">
          <BabylonScene antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />

          // {this.addBirds(0)}
          <Frame title="message in a bottle" content={
              <div></div>
            }
            width={100} height={100} x={100} y={100}
            />
          {this.addBirds()}
        </div>
        {/*<Glasses /> */}
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
  var url = process.env.PUBLIC_URL + "/assets/hardDrives/Corona/"
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


    for (let i = 1; i < 50; i++) {
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
  var url = process.env.PUBLIC_URL + "/assets/hardDrives/palm/";
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

function addLimes(scene) {
  var container = new AssetContainer(scene);
  var url = process.env.PUBLIC_URL + "/assets/hardDrives/lime/";
  SceneLoader.LoadAssetContainer(url, "lime.obj", scene, function (container) {
    var meshes = container.meshes;
    console.log("mmm", meshes)
    let positions = [
      {x: -25, z: 70},
      {x: 15, z: 55},
      {x: 4, z: -10},
      {x: -20, z: -10},
      {x: -4, z: -60},
    ];
    let scal = 5;

    for (let i = 0; i < 3; i++) {
      meshes[i].rotation.y = 0;
      meshes[i].scaling = new Vector3(scal, scal, scal);
      meshes[i].position.x = positions[0].x; //*scaler;
      meshes[i].position.y = 3; //positions[0].y*scaler;
      meshes[i].position.z = positions[0].z; //*scaler;
      meshes[i].rotation.x = -.20; //getRandomNum(2)*Math.PI;
      meshes[i].rotation.y = -2.3;
      meshes[i].rotation.z = -.1;
      water.addToRenderList(meshes[i]);
    }
    limes.push(meshes);

    container.addAllToScene();  // Adds all elements to the scene

    // water.addToRenderList(rind);

    for (let i = 1; i < positions.length; i++) {
      let copy = container.instantiateModelsToScene().rootNodes[1];
      copy.rotation.y = Math.PI*1.5;
      copy.position.x = positions[i].x*scaler;
      copy.position.z = positions[i].z*scaler;
      water.addToRenderList(copy);

      let copyR = container.instantiateModelsToScene().rootNodes[0];
      copyR.rotation.y = Math.PI*1.5;
      copyR.position.x = positions[i].x*scaler;
      copyR.position.z = positions[i].z*scaler;
      water.addToRenderList(copyR);
      limes.push({l: copy, r: copyR});
    }

  });

}

function addDuckies(scene) {
  var container = new AssetContainer(scene);
  var url = process.env.PUBLIC_URL + "/assets/hardDrives/duck/";
  SceneLoader.LoadAssetContainer(url, "duck.obj", scene, function (container) {
    var meshes = container.meshes;
    console.log("mmm", meshes)
    let positions = [
      {x: -25, z: 200},
      {x: 15, z: 55},
      {x: 4, z: -10},
      {x: -20, z: -10},
      // {x: -4, z: -60},
      // {x: -4, z: -60},
    ];
    // let scal = 2.5;
    let scal = 15;

    let ducky = meshes[0];
    ducky.rotation.y = 0;
    ducky.scaling = new Vector3(scal, scal, scal);
    ducky.position.x = positions[0].x; //*scaler;
    ducky.position.y = -2; //positions[0].y*scaler;
    ducky.position.z = positions[0].z; //*scaler;
    ducky.rotation.x = 0; //getRandomNum(2)*Math.PI;
    ducky.rotation.y = -2.3;
    ducky.rotation.z = -.1;
    ducky.position.x0 = 0;
    ducky.position.z0 = 0;
    water.addToRenderList(ducky);
    duckies.push(ducky);
    // limes.push(meshes);

    container.addAllToScene();  // Adds all elements to the scene

    // water.addToRenderList(rind);

    for (let i = 1; i < positions.length; i++) {
      let copy = container.instantiateModelsToScene().rootNodes[0];
      copy.rotation.y = Math.PI*1.5;
      copy.position.x = positions[i].x*scaler;
      copy.position.z = positions[i].z*scaler;
      copy.position.x0 = 0;
      copy.position.z0 = 0;
      water.addToRenderList(copy);
      duckies.push(copy);
    }

  });
}

function addInnerTubes(num, scene, water) {
  for (let i = 0; i < num; i++) {

    var tubeMat = new StandardMaterial("groundMaterial", scene);
    tubeMat.diffuseColor = new Color3(getRandomNum(i+2), getRandomNum(i+3), getRandomNum(i+4));
    tubeMat.specularColor = new Color3(0.5, 0.6, 0.87);
    tubeMat.emissiveColor = new Color3(.1, .1, .1);
    tubeMat.ambientColor = new Color3(0.23, 0.98, 0.53);
    tubeMat.alpha = 0.8;

    // texture
    // var tubeTex = new Texture(window.AWS+"/shared/black_sand.jpg", scene);
    // tubeTex.vScale = groundTexture.uScale = 20.0;
    // tubeMat.diffuseTexture = groundTexture;

    var tube = MeshBuilder.CreateTorus("torus", {diameter: 35, thickness: 10}, scene);
    tube.position.y = 2;
    tube.rotation.y = Math.PI/2;
    tube.position.x = i*50 -50;
    tube.position.z = 80;
    tube.material = tubeMat;
    if (water) water.addToRenderList(tube);

    tubes.push(tube);
  }

}

export default Bottle;
