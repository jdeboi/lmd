// note to self
// table for two
// bunch of faces, different times, times scatter around.
// young again
//try taking pic of dining room setup

// can you see my now?
// confessions of a narcisist

// body, flat face, replaced with texture. arms robotic drinking wine
import React from 'react';
import Frame from '../../shared/Frame/Frame';
// import DesktopIcon from '../../shared/DesktopIcon/DesktopIcon';
// import './Loop.css';
// Babylon
import { Scene, AnaglyphUniversalCamera, UniversalCamera,PostProcess, Effect, HemisphericLight, Vector3, Vector2, SceneLoader,AssetContainer, MeshBuilder, StandardMaterial,  VideoTexture, CubeTexture, Color3,Color4, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx';

import candles0 from './assets/candles0.gif';
import candles1 from './assets/candles1.gif';

var camera;
var seed = 1;
var bottle;
var bottles = [];

class Dinner extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    this.state = {
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
    camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0,2, 0), 0.033, scene);
    scene.clearColor = new Color4(0, 0, 0, 0);
    camera.setTarget(new Vector3(0, 1, 10));

    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;



    // Skybox
    var skyW = 500;
    var skybox = Mesh.CreateBox("skyBox", skyW, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture(process.env.PUBLIC_URL+"/assets/dinner/skybox/dinner", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;


    // Ground
    var groundTexture = new Texture(process.env.PUBLIC_URL+"/assets/dinner/table.jpg", scene);
    groundTexture.vScale = groundTexture.uScale = 1;
    var groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = groundTexture;
    var ground = Mesh.CreateGround("ground", 12, 8, 32, scene, false);
    ground.position.y = -1;
    ground.position.z = 10;
    ground.material = groundMaterial;


    var planeTop = Mesh.CreatePlane("sphere1", {width:5, height:1}, scene);
    planeTop.rotation.z = Math.PI;
    planeTop.rotation.y = -Math.PI/2;
    planeTop.position.x = -2;
    planeTop.position.z = 10;
    planeTop.position.y = 2;
    var matTop = new StandardMaterial("mat", scene);
    matTop.diffuseColor = new Color3(0, 0, 0);
    planeTop.material = matTop;

    var plane = Mesh.CreatePlane("sphere1", 5, scene);
    plane.rotation.z = Math.PI;
    plane.rotation.y = -Math.PI/2;
    plane.position.x = -5;
    plane.position.z = 10;
    plane.position.y = 2;

    var plane2 = Mesh.CreatePlane("sphere2", 5, scene);
    plane2.rotation.z = Math.PI;
    plane2.rotation.y = Math.PI/2;
    plane2.position.x = 5;
    plane2.position.z = 10;
    plane2.position.y = 2;

    // Move the sphere upward 1/2 its height

    var mat = new StandardMaterial("mat", scene);
    mat.diffuseColor = new Color3(.1, .1, .1);
    VideoTexture.CreateFromWebCam(scene, function(videoTexture) {
      // videoTexture.scaling.x = -1;
      mat.emissiveTexture = videoTexture;
      console.log(videoTexture);
      plane.material = mat;
      plane2.material = mat;
      plane2.scaling.x = -1;
    }, { maxWidth: 256, maxHeight: 256 });


    addBottles(scene);
  }


  onRender(scene) {
    let divFps = document.getElementById("fps");
    if (divFps) divFps.innerHTML = scene.getEngine().getFps().toFixed() + " fps";
  }



  render() {

    var candles=[1, 1, 1, 1, 1,1];
    return (
      <div className="Dinner Sketch" >
      {/*   <video ref={this.cloudsRef} autoPlay muted loop className="backgroundCover">
      <source src={cloudsVid} type="video/mp4" ></source>
      Your browser does not support HTML5 video.
      </video>*/}

      { <BabylonScene  className="noSelect backgroundCover" antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />}
      <Frame title="" x={400} y={400} width={400} content={
        <img src={candles0} width={"100%"} height={"100%"} />
      }

      />

      {candles.map((id, i) => {
        let y = 500+50*Math.sin(i*Math.PI/5);
        console.log(i, y);
        let w = 100 + 80*Math.sin(i*Math.PI/5);
        return (
          <Frame title="" x={500+i*80} y={y} width={100} content={
            <img src={candles1} width={"100%"} height={"100%"} />
          }

          />
        );
      })}


      </div>
    );
  }

}


function addBottles(scene) {
  var container = new AssetContainer(scene);
  var url = process.env.PUBLIC_URL + "/assets/dinner/bottle/"
  SceneLoader.LoadAssetContainer(url, "Wine_Bottle_Red.obj", scene, function (container) {
    var meshes = container.meshes;
    var materials = container.materials;

    bottle = meshes[0];
    bottle.scaling = new Vector3(4.0, 4.0, 4.0);

    container.addAllToScene();

    // var mat = new StandardMaterial("sphereMaterial", scene);
    // mat.specularTexture = new Texture("/textures/specularglossymap.png", scene);
    // mat.specularPower = 64;
    // mat.useGlossinessFromSpecularMapAlpha = true;
    // mat.diffuseColor = Color3.Black();
    // mat.roughness = 3;
    // mat.alpha = .7;

    // var skyReflect = new CubeTexture("/textures/TropicalSunnyDay", scene);
    // mat.reflectionTexture = skyReflect;

    // var mat = new StandardMaterial("blueMat", scene);
    // mat.diffuseColor = new Color3(1, 1, 1);
    // mat.alpha = 1;
    // bottle.material = mat;


    var newInstance = bottle.createInstance("0");
    newInstance.position.x = 0;
    newInstance.position.y = 1;
    newInstance.position.z = 3;
    // newInstance.rotation.y = Math.random()*Math.PI*2;
    // newInstance.rotation.x = 0;
    // newInstance.rotation.z = Math.PI/2;//+ (-.3+Math.random()*.6);
    bottles.push(newInstance);
  });

}


export default Dinner;
