import React from 'react';
import "./Mars.css";
import Frame from '../../shared/Frame/Frame';

// Babylon
import { Scene, AnaglyphUniversalCamera, UniversalCamera,PBRMaterial, HemisphericLight, Vector3, Vector2, SceneLoader,AssetContainer, MeshBuilder, StandardMaterial,  VideoTexture, CubeTexture, Color3,Color4, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx';
import { WaterMaterial } from 'babylonjs-materials';

import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



// import poolVid0 from './assets/pool/mars_0.mp4';
// import poolVid1 from './assets/pool/mars_1.mp4';
// import poolVid2 from './assets/pool/mars_2.mp4';
// import poolVid3 from './assets/pool/mars_3.mp4';


import Glasses from '../../shared/Glasses/Glasses';


var camera, water, waterMesh;
var tubes = [];
var seed = 1;

class Mars extends React.Component {

  constructor(props) {
    super(props);

    this.poolVid0 = window.AWS+"/mars/pool/mars_0.mp4"
    this.poolVid1 = window.AWS+"/mars/pool/mars_1.mp4"
    this.poolVid2 = window.AWS+"/mars/pool/mars_2.mp4"
    this.poolVid3 = window.AWS+"/mars/pool/mars_3.mp4"


    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      chairY: 0,
      radioValue: "5ft",
      poolVid: this.poolVid1
    }

    this.buttonClick = this.buttonClick.bind(this);
    this.chairUpdate = this.chairUpdate.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);

    this.changeWater = this.changeWater.bind(this);

  }


  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.inverval = setInterval(this.chairUpdate, 50);
    this.intervalWater = setInterval(this.changeWater, 2300);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    clearInterval(this.interval);
    clearInterval(this.intervalWater);
  }

  updateDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  chairUpdate() {
    let {chairY} = this.state;
    chairY+=2;
    this.setState({chairY});
  }

  changeWater() {
    const num = Math.floor(Math.random()*4);
    this.buttonClick(num);
  }

  onSceneReady(scene) {
    // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
    camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 8, -5), 0.033, scene);
    scene.clearColor = new Color4(0, 0, 0, 0);
    camera.setTarget(new Vector3(4, -8, -2));

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Skybox
    var skyW = 1000;
    var skybox = Mesh.CreateBox("skyBox", skyW, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture(window.AWS+"/mars/skybox/grid", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    // Water
    waterMesh = Mesh.CreateGround("waterMesh", 512, 512, 32, scene, false);
    waterMesh.position.y = -9;
    water = new WaterMaterial("water", scene, new Vector2(1024, 1024));
    water.backFaceCulling = true;
    water.bumpTexture = new Texture(window.AWS+"/shared/waterbump.png", scene);
    waterGo();
    water.colorBlendFactor = 0;
    water.addToRenderList(skybox);
    waterMesh.material = water;

    // drain
    // var drainTex = new BABYLON.Texture(window.AWS+"/mars/drain1.png", scene);
    // addDrain(scene);
    // loadWhale(scene);
    // addInnerTubes(4, scene, water);
    // addSwimmer(scene);
  }


  buttonClick(num) {
    let vids = [this.poolVid0, this.poolVid1, this.poolVid2, this.poolVid3];
    this.setState({poolVid: vids[num]});
  }

  onRender(scene) {
    let divFps = document.getElementById("fps");
    if (divFps) divFps.innerHTML = scene.getEngine().getFps().toFixed() + " fps";
  }

  render() {
    const toolbarH = 26;
    const spacing = 25;

    const dimensions = this.props.dimensions;
    const pool = {
      x: 100,
      h:  640,//Math.max(window.innerHeight-30-toolbarH-spacing*2, 500),
      y: spacing,
      w: 0
    };
    pool.w =  548/1080 * pool.h;

    const chairs = {
      w: 200,
      h: 600,
      x: pool.x + pool.w + spacing,
      y: pool.y
    };

    const tank ={
      w: 300,
      h: pool.h - chairs.h - toolbarH - spacing,
      x: chairs.x,
      y: chairs.y + chairs.h + toolbarH + spacing
    }


    // const xStart = window.innerWidth-wPool-spacing*2;
    // <div className="smallCrater"></div>
    let {chairY} = this.state;
    const chairStyle = {color: "red", backgroundPosition: `0px ${chairY}px`};
    // const chairStyle = {color: "red", backgroundPosition: `${chairY}px 0`};
    return (
      <div className="Mars Sketch">
        <Frame title="mars esc" content={
            <div className="bigCrater" style={{height: `${pool.h}px`, backgroundSize: `${pool.w}px ${pool.h}px`}}>
              <video playsInline key={this.state.poolVid} style={{height: `${pool.h}px`, width: `${pool.w}px`}} autoPlay muted loop>
                <source src={this.state.poolVid} type="video/mp4" ></source>
                Your browser does not support HTML5 video.
              </video>
            </div>
          }
          width={pool.w} height={pool.h} x={pool.x} y={pool.y}
          />

        <Frame title="" content={
            <div className="tank">
              <button onClick={() => {this.buttonClick(3)}}><span className="swimSign">0</span>ft</button>
              <button onClick={() => {this.buttonClick(2)}}><span className="swimSign">3</span>ft</button>
              <button onClick={() => {this.buttonClick(1)}}><span className="swimSign">5</span>ft</button>
              <button onClick={() => {this.buttonClick(0)}}><span className="swimSign">8</span>ft</button>
            </div>
          }
          width={tank.w} height={tank.h} x={tank.x} y={tank.y}
          />
        <Frame title="" content={<div className="blueChair" style={chairStyle}></div>} width={chairs.w} height={chairs.h} x={chairs.x} y={chairs.y}  />

        <Glasses />
      </div>
    )
  }

  getLabel(num) {
    return <div><span className="swimSign">{num}</span>ft</div>;
    }

    handleRadioChange(event) {
      this.setState({radioValue: event.target.value});
      console.log(event.target.value);
    };
  }

  function waterGo() {
    water.windForce = -5;
    water.waveHeight = 0.8;
    water.bumpHeight = 0.3;
    water.waveLength = 0.3;
  }

  function waterStop() {
    // water.windForce*=2;
    water.waveHeight=0;
    water.bumpHeight*=2;
    // water.waveLength *=2;
  }

  function addSwimmer(scene) {
    for (let i = 0; i < 2; i++) {
      var scaler = 3;
      var swimmer = MeshBuilder.CreatePlane("plane", {}, scene);
      // var disc = MeshBuilder.CreateSphere("sphere", {}, scene);
      swimmer.scaling = new Vector3(scaler, scaler, scaler);
      swimmer.position.x = 11-i*6;
      swimmer.position.y = -14;
      swimmer.position.z = -4+i*4;
      swimmer.rotation.x = Math.PI/2;
      var tex = new Texture(window.AWS+"/mars/swimmers/swimmer" + (i+1) + ".png", scene);
      swimmer.material  = new StandardMaterial("myMaterial", scene);
      // swimmer.material.diffuseColor = new Color3(1,1,1);
      swimmer.material.diffuseTexture = tex;
      swimmer.material.diffuseTexture.hasAlpha = true;
      // disc.material.ambientColor = new Color3(1,1,1);
      water.addToRenderList(swimmer);
    }

  }

  function addDrainBottom(scene) {

    var disc = MeshBuilder.CreateDisc("disc", scene);
    var scaler = 8.5;
    // var disc = MeshBuilder.CreateSphere("sphere", {}, scene);
    disc.scaling = new Vector3(scaler, scaler, scaler);
    disc.position.x = 11;
    disc.position.y = -14;
    disc.position.z = -4;
    disc.rotation.x = Math.PI/2;
    disc.material  = new StandardMaterial("myMaterial", scene);
    disc.material.diffuseColor = new Color3(1,1,1);
    // disc.material.ambientColor = new Color3(1,1,1);
    water.addToRenderList(disc);
  }

  function loadWhale(scene) {
    var container = new AssetContainer(scene);

    var url = process.env.PUBLIC_URL + "/assets/mars/Whale/";
    SceneLoader.LoadAssetContainer(url, "Whale.glb", scene, function (container) {
      var meshes = container.meshes;
      console.log(meshes);
      var scaler = .5;
      for (const mesh of meshes) {
        mesh.scaling = new Vector3(scaler, scaler, scaler);
        // mesh.position.x = positions[0].x*scaler;
        mesh.position.y = -5;
        var material = new StandardMaterial("whale", scene);
        material.diffuseColor = new Color3(0, 0, 1);
        mesh.material = material;
        //   mesh.position.z = positions[0].z*scaler;
        water.addToRenderList(mesh);
      }
      // var mesh = meshes[1];

      // water.addToRenderList(meshes[1]);

      // }
      container.addAllToScene();  // Adds all elements to the scene



    });
  }

  function addDrain(scene) {
    var container = new AssetContainer(scene);

    var url = process.env.PUBLIC_URL + "/assets/mars/Drain/";
    SceneLoader.LoadAssetContainer(url, "FloorDrain.obj", scene, function (container) {
      var meshes = container.meshes;
      var scaler = 4;
      let positions = [{x: 2.5, y: -3, z: -1}];
      // 9
      for (var mesh of meshes) {
        // var mesh = meshes[9];
        mesh.rotation.y = 0;
        mesh.scaling = new Vector3(scaler, scaler, scaler);
        mesh.position.x = positions[0].x*scaler;
        mesh.position.y = positions[0].y*scaler;
        mesh.position.z = positions[0].z*scaler;
        water.addToRenderList(mesh);
      }

      addDrainBottom(scene);
      container.addAllToScene();  // Adds all elements to the scene



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

      var tube = MeshBuilder.CreateTorus("torus", {diameter: 6/3, thickness: 2/3}, scene);
      tube.position.y = 2;
      tube.rotation.y = Math.PI/2;
      tube.position.x = getRandomNum(50+i)*20-10;
      tube.position.z = getRandomNum(10+i)*20-10;
      tube.material = tubeMat;
      water.addToRenderList(tube);

      tubes.push(tube);
    }

  }

  function getRandom() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  function getRandomNum(val) {
    var x = Math.sin(val) * 10000;
    return x - Math.floor(x);
  }

  export default Mars;
