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
var limes = [];
var tubes = [];
var duckies = [];
var camera;
var water;
var addedTubeWater = false;

var start;
var changed = false;

var scaler = 4;
var seed = 13;

class HardDrives extends React.Component {

  constructor(props) {
    super(props);

    this.sky = "https://www.google.com/maps/embed?pb=!4v1591820298439!6m8!1m7!1sCAoSLEFGMVFpcFBTYW9SYVFBMmR0QjhoeTVaSUs5R3lQaGJBNVB5dVhFQ2o0UVdW!2m2!1d-17.3611139!2d177.1339841!3f315.493974142352!4f79.53485037853946!5f0.4125900490817119";
    this.water = "https://www.google.com/maps/embed?pb=!4v1591820453080!6m8!1m7!1sCAoSLEFGMVFpcE5UM1c2VUdrLWNWengzbEVjZUpXUUpOVGFBcnBrRmxOX0RWWFFt!2m2!1d-16.87437024377152!2d168.5315829096921!3f255.14238198590843!4f31.088706413108227!5f0.7820865974627469";
    this.desert = "https://www.google.com/maps/embed?pb=!4v1591823417725!6m8!1m7!1sCAoSLEFGMVFpcFA2ZXdsLTdfUDVzcjhSb0hILXlPV2cxQlBpTm40dmd2MjZGQ2h0!2m2!1d24.432972!2d54.651138!3f12.11108208350993!4f-8.57353950629367!5f0.7820865974627469"
    this.beaches =  [
      "https://www.google.com/maps/embed?pb=!4v1591730465198!6m8!1m7!1sCAoSLEFGMVFpcFBTYW9SYVFBMmR0QjhoeTVaSUs5R3lQaGJBNVB5dVhFQ2o0UVdW!2m2!1d-17.3611139!2d177.1339841!3f99.14217177224654!4f16.212409154729073!5f0.5970117501821992",
      "https://www.google.com/maps/embed?pb=!4v1591731061550!6m8!1m7!1s14MaFqgTRTaDiBSsL39GpQ!2m2!1d-3.870455013319621!2d-32.43747623434356!3f169.18860029370475!4f3.8811831878503256!5f0.4000000000000002",
      "https://www.google.com/maps/embed?pb=!4v1591731152367!6m8!1m7!1sCAoSLEFGMVFpcE1TWTlDY19DbTZKS3o2a1JwTGVWWkp2cnJKTG9fVERiTDBxb3BZ!2m2!1d9.47087!2d100.053962!3f131.34!4f21.040000000000006!5f0.4000000000000002",

    ];

    this.islandURLs = {
      aus: {
        sv:"https://www.google.com/maps/embed?pb=!4v1591730465198!6m8!1m7!1sCAoSLEFGMVFpcFBTYW9SYVFBMmR0QjhoeTVaSUs5R3lQaGJBNVB5dVhFQ2o0UVdW!2m2!1d-17.3611139!2d177.1339841!3f99.14217177224654!4f16.212409154729073!5f0.5970117501821992",
        waterAnimal: "https://media.giphy.com/media/VwTPbIxJyN1w4/giphy.gif",
        skyAnimal: "https://media.giphy.com/media/l3Uchq9s6Hx0aK8F2/giphy.gif",
        underAnimal: "https://media.giphy.com/media/3o7btWuHdqixPYqKuQ/giphy.gif"
      },
      amazon: {
        sv: "https://www.google.com/maps/embed?pb=!4v1591729810341!6m8!1m7!1s8KHDdWjHmX-5VUuLadhpoA!2m2!1d-3.138365217661719!2d-60.49319170993962!3f183.4533009061596!4f4.597270194924249!5f0.7820865974627469",
        waterAnimal: "https://media.giphy.com/media/hPLft0bT2HxEA/giphy.gif",
        skyAnimal: "https://media.giphy.com/media/Tk1C1v8qWBocm9ryWx/giphy.gif",
        underAnimal: "https://media.giphy.com/media/r4rma1tDoGRFK/giphy.gif"
      },
      nordic: {
        sv:"https://www.google.com/maps/embed?pb=!4v1591725274284!6m8!1m7!1sCAoSLEFGMVFpcE5WMEpaUDVLcHVJcXl3YmhTcE56d2pOMnRtNkR5OFdWbzhMVDlM!2m2!1d80.1174164!2d17.0557976!3f105.0036195370437!4f0.19994726177958455!5f0.7820865974627469",
        waterAnimal: "https://media.giphy.com/media/2Y8tvawHjIygnQnqVo/giphy.gif",
        skyAnimal: "https://media.giphy.com/media/MRELXooGA4FXOxnoXL/giphy.gif",
        underAnimal: "https://media.giphy.com/media/pJuWoH6laWXN6/giphy.gif"
      }
    };




    this.state = {
      island : this.beaches[0],
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      urlIndex: 0,
      birds: this.initBirds()
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
    // addInnerTubes(1, scene);
    // addLimes(scene);
    // addDuckies(scene);


    // Ground
    var groundTexture = new Texture(process.env.PUBLIC_URL+"/assets/shared/black_sand.jpg", scene);
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
    water.bumpTexture = new Texture(process.env.PUBLIC_URL+"/assets/shared/waterbump.png", scene);
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

    // Skybox
    // var skyW = 1000;
    // var skybox = Mesh.CreateBox("skyBox", skyW, scene);
    // var skyboxMaterial = new StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new CubeTexture(process.env.PUBLIC_URL+"/assets/shared/sky/moon/moon", scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;
    // water.addToRenderList(skybox);

    addBottles(scene, water);



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
    let dir = d > .5 ? 1: -1;
    // let wBirds = (num+1)*xSpace;

    for (var i = 0; i < num; i++) {
      let mid = num/2;

      let dx = i * xSpace + Math.random()*30;
      if (i >= mid) dx = (num - i) * xSpace + Math.random()*30;
      if (num%2 == 0 && i>= mid) dx += xSpace/2;

      let dy = i * ySpace + Math.random()*10;

      let x0 = dir == 1 ? dx-300 : window.innerWidth+dx*-1+300;
      let y0 = dy;
      birds.push({x: x0, y: y0, x0: x0, y0: y0, xd: dir, yd: 1});
    }
    return birds;
  }

  updateBirds() {
    var inc = 5;
    let {birds} = this.state;
    let numReset = 0;
    for (var i = 0; i < birds.length; i++) {
      let bird = birds[i];
      // bird.x += bird.xd*inc;
      // bird.y += bird.yd*inc;

      bird.x += bird.xd*inc;
      bird.y = bird.y0+50*Math.sin(bird.x/100);
      bird.y = Math.floor(bird.y);

      if (bird.xd == 1 && bird.x > window.innerWidth+300) {
        numReset++;
      }
      else if (bird.xd == -1 && bird.x < -300) {
        numReset++;
      }
      // else if (bird.x < 0) {
      //   bird.xd = 1;
      //   bird.x = 0;
      // }
      // if (bird.y > window.innerHeight-100) {
      //   bird.yd = -1;
      //   bird.y = window.innerHeight-100;
      // }
      // else if (bird.y < 0) {
      //   bird.yd = 1;
      //   bird.y = 0;
      // }
    }
    if (numReset === birds.length) birds = this.initBirds();
    this.setState({birds: birds})
  }

  getBird(index) {
    return (
      <FrameSimple title="" content={
          <div className={"bird " + (this.state.birds[index].xd === 1 ?"flippedX":"")}></div>
        }
        width={78+2} key={index} windowStyle={{background: "transparent"}} height={60} px={this.state.birds[index].x} py={this.state.birds[index].y}
        />
    )
  }

  addBirds(ind=0) {
    return (
      <div className="birds">
        {this.state.birds.map((pos, index) => {
          // if (index%2 == ind)
          return this.getBird(index);
        })};
      </div>
    );
  }


  render() {
    return (
      <div className="HardDrives Sketch">
        {/* <div className="Frame-box">*/}
        <BabylonScene antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />

        <Frame title="hard drives on seashores" content={
            <iframe title="island view" src={this.state.island} width={this.svFrame.w} height={this.svFrame.h} frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
          }
          width={this.svFrame.w} height={this.svFrame.h} x={this.svFrame.x} y={this.svFrame.y}
          />
        {this.addBirds()}
        {/*</div>*/}
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
  skyboxMaterial.reflectionTexture = new CubeTexture(process.env.PUBLIC_URL+"/assets/hardDrives/skybox/skybox", scene);
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
    // var tubeTex = new Texture(process.env.PUBLIC_URL+"/assets/shared/black_sand.jpg", scene);
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

export default HardDrives;
