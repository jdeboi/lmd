import React from 'react';
import "./Blinds.css";

import Sketch from './p5/BlindsSketch';

// store
import { connect } from 'react-redux';
import { doneLoadingApp } from '../../../store/actions';

// Babylon
// import { AnaglyphUniversalCamera, HemisphericLight, Vector3, Vector2, StandardMaterial, Color3, Skybox, CubeTexture, Color4, Mesh, Texture } from 'babylonjs';
// import BabylonScene from '../../shared/Babylon.jsx';
// import { WaterMaterial } from 'babylonjs-materials';
// var camera;

import { Scene, AnaglyphUniversalCamera, UniversalCamera, PostProcess, Effect, HemisphericLight, Vector3, Vector2, SceneLoader, AssetContainer, MeshBuilder, StandardMaterial, VideoTexture, CubeTexture, Color3, Color4, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx';
import { WaterMaterial } from 'babylonjs-materials';
var camera, water, waterMesh;
var face;
var loaded = false;




class Blinds extends React.Component {

  constructor(props) {
    super(props);


  }
  onSceneReady(scene) {
    // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
    camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 8, -5), 0.033, scene);
    scene.clearColor = new Color4(0, 0, 0, 0);
    // camera.setTarget(new Vector3(11, 4, -2));
    camera.setTarget(new Vector3(0, 8, 0));


    const canvas = scene.getEngine().getRenderingCanvas();
    // camera.attachControl(canvas, true);

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;



    // Water
    // waterMesh = Mesh.CreateGround("waterMesh", 512, 512, 32, scene, false);
    // waterMesh.position.y = -9;
    // water = new WaterMaterial("water", scene, new Vector2(1024, 1024));
    // water.backFaceCulling = true;
    // water.bumpTexture = new Texture(window.AWS + "/shared/waterbump.png", scene);
    // water.windForce = -5;
    // water.waveHeight = 0.8;
    // water.bumpHeight = 0.3;
    // water.waveLength = 0.3;
    // water.colorBlendFactor = 0;
    // waterMesh.material = water;

    // Skybox
    // var skyW = 1000;
    // var skybox = Mesh.CreateBox("skyBox", skyW, scene);
    // var skyboxMaterial = new StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new CubeTexture(window.AWS + "/shared/sky/moon/moon", scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;
    // water.addToRenderList(skybox);


    // Ground
    // var groundTexture = new Texture(window.AWS + "/shared/black_sand.jpg", scene);
    // groundTexture.vScale = groundTexture.uScale = 10;
    // var groundMaterial = new StandardMaterial("groundMaterial", scene);
    // groundMaterial.diffuseTexture = groundTexture;
    // var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
    // ground.position.y = -10;
    // ground.material = groundMaterial;
    // water.addToRenderList(ground);



    // drain
    // var drainTex = new BABYLON.Texture(window.AWS+"/mars/drain1.png", scene);
    // addDrain(scene);
    // loadWhale(scene);
    // addInnerTubes(4, scene, water);
    // addSwimmer(scene);

    // Effect.ShadersStore["customFragmentShader"] = `
    //  #ifdef GL_ES
    //  precision highp float;
    //  #endif

    //  // Samplers
    //  varying vec2 vUV;
    //  uniform sampler2D textureSampler;

    //  // Parameters
    //  uniform vec2 screenSize;
    //  uniform float threshold;

    //  void main(void)
    //  {
    //    vec2 texelSize = vec2(1.0 / screenSize.x, 1.0 / screenSize.y);
    //    vec4 baseColor = texture2D(textureSampler, vUV);


    //    if (baseColor.r < threshold) {
    //      gl_FragColor = baseColor;
    //    } else {
    //      gl_FragColor = vec4(0);
    //    }
    //  }
    //  `;

    // var postProcess = new PostProcess("My custom post process", "custom", ["screenSize", "threshold"], null, 0.25, camera);
    // postProcess.onApply = function (effect) {
    //   effect.setFloat2("screenSize", postProcess.width, postProcess.height);
    //   effect.setFloat("threshold", 0.8);
    // };

    // addFace(scene);

    var materialforbox = new StandardMaterial("texture1", scene);
    var box = Mesh.CreateBox("box", 3, scene);
    box.material = materialforbox;
    materialforbox.wireframe = true;
  }

  onSceneReady2(scene) {
    // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
    camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 8, -5), 0.033, scene);
    scene.clearColor = new Color4(0, 0, 0, 0);
    camera.setTarget(new Vector3(11, 3, -2));

    const canvas = scene.getEngine().getRenderingCanvas();
    // camera.attachControl(canvas, true);

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


    // Skybox
    var skyW = 1000;
    var skybox = Mesh.CreateBox("skyBox", skyW, scene);
    var skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture(window.AWS + "/shared/sky/moon/moon", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;


    // Ground
    // var groundTexture = new Texture(window.AWS + "/shared/sand2.jpg", scene);
    // groundTexture.vScale = groundTexture.uScale = 10;
    // var groundMaterial = new StandardMaterial("groundMaterial", scene);
    // groundMaterial.diffuseTexture = groundTexture;
    // var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
    // ground.position.y = -10;
    // ground.material = groundMaterial;



  }


  onRender(scene) {
    if (face) {
      face.rotation.y = Math.PI * .4 * Math.sin((new Date()).getTime() / 800) + .3;
    }
  }


  render() {

    return (
      <div className="Blinds Sketch" >
        <BabylonScene className="noSelect backgroundCover" antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' style={{ pointerEvents: "none" }} />

        <Sketch
          className="p5sketch"
        />


      </div>
    )
  }


}







function addFace(scene) {

  var url = "/assets/s3-bucket/clickMe/face/"
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




const mapStateToProps = (state) => {
  return {
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    doneLoadingApp,
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Blinds);
