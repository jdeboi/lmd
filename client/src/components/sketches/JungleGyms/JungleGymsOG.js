import React from 'react';
import { AnaglyphUniversalCamera, UniversalCamera, HemisphericLight, Vector3, VideoDome, SceneLoader,MeshBuilder, StandardMaterial, VideoTexture, CubeTexture, Color3,Color4, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx'; // import the component above linking to file we just created.
import 'babylonjs-loaders';

// import { GridMaterial } from 'babylonjs-materials';
import "./JungleGyms.css";
import Frame from '../../shared/Frame/Frame';
// import InstagramEmbed from 'react-instagram-embed';
import ReactPlayer from 'react-player'

import Glasses from '../../shared/Glasses/Glasses';


// palm https://poly.google.com/view/ficLBIjGliK

var trees = [];
var myPlaneL, myPlaneR;
var start;
var changed = false;

const onSceneReady = scene => {
  start = new Date();
  // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
  const camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 1, -25), 0.033, scene);
  scene.clearColor = new Color4(0, 0, 0, 0);
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;


  ///////////////////////////////////////////////////////////////////////////////

  // var url = process.env.PUBLIC_URL + "/models/vines/"
  // SceneLoader.Append(url, 'Vines.obj', scene, function (scene2) {
  //   // scene.meshes[scene.meshes.length-3].scaling = new Vector3(5, 5, 5);
  //   scene.meshes[scene.meshes.length-5].position.x = -5;
  //   scene.meshes[scene.meshes.length-5].position.y = 3;
  //   scene.meshes[scene.meshes.length-5].position.z = -2;
  // });

  // var url = process.env.PUBLIC_URL + "/models/monitor/"
  var url = process.env.PUBLIC_URL + "/assets/jungleGyms/monitor/";
  SceneLoader.LoadAssetContainer(url, "Monitor.obj", scene, function (container) {
    var meshes = container.meshes;
    // var materials = container.materials;
    meshes[1].rotation.z = 0;
    meshes[1].rotation.y = -Math.PI+Math.PI/4;
    meshes[1].position.y = -5;
    meshes[1].position.z = -1;
    meshes[1].position.x = 8;
    meshes[1].scaling = new Vector3(.05, .05, .05);

    container.addAllToScene();
    //
    // let copyL = container.instantiateModelsToScene().rootNodes[1];
    // copyL.rotation.y = Math.PI-Math.PI/4;
    // copyL.position.x = -5;
  });



  var factor = .01;
  var vw = 1920*factor;
  var vh = 1080*factor;



  var vidurl = process.env.PUBLIC_URL + "/assets/jungleGyms/gym.mp4";
  // var vidurlswings = process.env.PUBLIC_URL + "/videos/swings.mp4";
  // var vidurlivy = process.env.PUBLIC_URL + "/videos/ivy.mp4";
  // var vidurlad = process.env.PUBLIC_URL + "/videos/adrienne480.mov";
  // var vidurlgymshark = process.env.PUBLIC_URL + "/videos/gymshark.mp4";


  // var myPlaneC2 = BABYLON.MeshBuilder.CreatePlane("myPlane", {width: 640*factor*2, height: 400*factor*2}, scene);

  myPlaneL = MeshBuilder.CreatePlane("myPlane", {width: vw, height: vh}, scene);
  myPlaneR = MeshBuilder.CreatePlane("myPlane", {width: vw, height: vh}, scene);
  // var myPlaneT = MeshBuilder.CreatePlane("myPlane", {width: vw*3, height: vh*3}, scene);
  var myPlaneB = MeshBuilder.CreatePlane("myPlane", {width: vw*3, height: vh*3}, scene);
  // var myPlaneC = MeshBuilder.CreatePlane("myPlane", {width: vw, height: vh}, scene);

  var gymMat = new StandardMaterial("material",scene);
  gymMat.diffuseTexture = new VideoTexture("video", vidurl, scene, true);
  gymMat.diffuseTexture.video.muted = true;
  gymMat.diffuseTexture.video.autoplay = true;
  gymMat.emissiveColor = new Color3(1,1,1);

  // var yogaTex = StandardMaterial("material",scene);
  // yogaTex.material.diffuseTexture = new Texture("/textures/yogamat_gr.png", scene);
  // yogaTex.material.diffuseTexture.uScale = 5;
  // yogaTex.material.diffuseTexture.vScale = 5;

  // myPlaneC.material = gymMat;

  // myPlaneC.position.z = 4;
  // myPlaneC.material = yogaTex;


  myPlaneL.rotation.y = -Math.PI/4;
  myPlaneL.position.x = -Math.sqrt(2)*vw/2/2;
  myPlaneL.position.z = 0;
  myPlaneL.scaling.x = -1;
  myPlaneL.material = gymMat;
  // myPlaneL.position.y = 2;

  myPlaneR.rotation.y = Math.PI/4;
  myPlaneR.position.x = Math.sqrt(2)*vw/2/2 + 1;
  myPlaneR.position.z = -1;
  myPlaneR.scaling.x = 1;
  myPlaneR.material = gymMat;
  myPlaneR.position.y = 3.4;

  // myPlaneT.rotation.x = -Math.PI/2;
  // myPlaneT.position.y = vh/2;
  // myPlaneT.position.z = -vh/2;
  // myPlaneT.scaling.x = -1;
  // myPlaneT.material = new StandardMaterial("material",scene);
  // // myPlaneT.material.diffuseTexture = new VideoTexture("video", vidurlivy, scene, true);
  // myPlaneT.material.diffuseTexture = new Texture("/textures/yogamat_gr.png", scene);
  // myPlaneT.material.diffuseTexture.uScale = 5;
  // myPlaneT.material.diffuseTexture.vScale = 5;
  // myPlaneT.material.emissiveColor = new Color3(1,1,1);

  myPlaneB.rotation.x = Math.PI/2;
  myPlaneB.position.y = -vh/2;
  myPlaneB.position.z = -vh/2;
  myPlaneB.material = new StandardMaterial("material",scene);
  myPlaneB.material.diffuseTexture = new Texture(window.AWS+"/jungleGyms/yogamat_gr.png", scene);
  myPlaneB.material.diffuseTexture.uScale = 5;
  myPlaneB.material.diffuseTexture.vScale = 5;
  myPlaneB.material.alpha = 0.6;
  //new VideoTexture("video", vidurlivy, scene, true);
  myPlaneB.material.emissiveColor = new Color3(1,1,1);

  // var ground = Mesh.CreateGroundFromHeightMap("ground", process.env.PUBLIC_URL +"/textures/heightMap.png", 20, 20, 20, 0, 10, scene, false);
  // ground.material = new StandardMaterial("material",scene);
  // ground.material.diffuseTexture =  new Texture("/textures/yogamat.jpg", scene);
  // ground.material.diffuseTexture.uScale = 2;
  // ground.material.diffuseTexture.vScale = 2;
  // //new VideoTexture("video", vidurlivy, scene, true); //new GridMaterial("groundMaterial", scene);
  // ground.position.y = -8;
  // ground.position.z = -5;
  // ground.position.x = -3;

  // addSkybox(scene);
  // addVideoDome(scene);

}


const onRender = scene => {
  for (let i = 0; i < trees.length; i++) {
    var sign = i % 2=== 0 ? 1 : -1;
    trees[i].rotation.y += .005 * sign;
  }

  let t = new Date();
  if (!changed && t - start > 5000) {
    // onInsta();
    changed = true;
  }
}

// function onInsta() {
//   console.log("ok")
//   var vidurlgymshark = process.env.PUBLIC_URL + "/assets/jungleGyms/gymshark.mp4";
//   var gymMat2 = new StandardMaterial("material",myscene);
//   gymMat2.diffuseTexture = new VideoTexture("video", vidurlgymshark, myscene, true);
//   gymMat2.diffuseTexture.video.muted = true;
//   gymMat2.diffuseTexture.video.autoplay = true;
//   gymMat2.emissiveColor = new Color3(1,1,1);
//
//   myPlaneL.material = gymMat2;
//   myPlaneR.material = gymMat2;
// }

const factor = .3;
const dimW = 1080*factor;
const dimH = 1920*factor;
const dimX = (window.innerWidth - dimW)/2;
const dimY = (window.innerHeight - dimH)/2;

const dimW2 = dimW*.8;
const dimH2 = dimH*.8;
const dimX2 = (window.innerWidth - dimW2)/2;
const dimY2 = (window.innerHeight - dimH2)/2;

const dimW3 = dimW2*.8;
const dimH3 = dimH2*.8;
const dimX3 = (window.innerWidth - dimW3)/2;
const dimY3 = (window.innerHeight - dimH3)/2;

// const videoBackgroundURL = process.env.PUBLIC_URL + "/assets/jungleGyms/swings.mp4";
// const videoInsta = process.env.PUBLIC_URL + "/videos/clouds.mp4";
// const amzRivSrc="https://www.google.com/maps/embed?pb=!4v1590509408426!6m8!1m7!1sp6tCl3Zc9lfZsb_DPK6k9Q!2m2!1d-5.266725221834397!2d-60.55707408855312!3f41.30506748771662!4f14.732341091107244!5f0.7820865974627469";
// const forestSrc = "https://www.google.com/maps/embed?pb=!4v1590511194403!6m8!1m7!1sP1fAR2hq8C8bOsiSbctSNA!2m2!1d-5.745324306454626!2d-60.46283649726701!3f341.2!4f72.58000000000001!5f0.7820865974627469";

function addSkybox(scene) {
  var skybox = MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
  skybox.infiniteDistance = true;

  var skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new CubeTexture(window.AWS+"/jungleGyms/galaxy", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.renderingGroupId = 0;
  skybox.material = skyboxMaterial;
}

function addVideoDome(scene) {
  let videoDome = new VideoDome(
    "videoDome",
    [window.AWS+"/jungleGyms/gym.mp4"], {
        resolution: 64,
        clickToPlay: true,
        halfDomeMode: false,
        fovMultiplier : 0,
        size: 4000
    },
    scene
);
}

export default () => (

  <div className="JungleGyms">
    <BabylonScene antialias onSceneReady={onSceneReady} onRender={onRender} id='babylon-canvas' />
    {getFrame(dimW, dimH, dimX, dimY, "jungle gyms", "swings.mp4")}
    {getFrame(dimW2, dimH2, dimX2, dimY2, "", "swings.mp4")}
    {getFrame(dimW3, dimH3, dimX3, dimY3, "", "swings.mp4")}

    {/*   <ReactPlayer
      className={"react-player insta"}
      playing
      muted
      loop
      width="100%"
      height="100%"
      url={videoInsta}
      />
      */}
      <Glasses />
    </div>
  )


  function getFrame(dimW, dimH, dimX, dimY, tit, vid) {
    return (
      <Frame title={tit} content={
          <ReactPlayer
            className={"react-player gym"}
            playing
            muted
            loop
            width={Math.floor(dimW) + "px"}
            height={Math.floor(dimH+1) + "px"}
            url={process.env.PUBLIC_URL + "/assets/jungleGyms/" + vid}
            />
        }
        width={dimW+2} height={dimH} x={dimX} y={dimY}
        />
    )

  }
