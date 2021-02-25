import React from 'react';
import "./ClickMe.css";

import { AnaglyphUniversalCamera, HemisphericLight, TextureLoader, MeshPhongMaterial, MeshBasicMaterial, Vector3, SceneLoader, MeshBuilder, StandardMaterial, PhotoDome, CubeTexture, Color3, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx'; // import the component above linking to file we just created.

import Frame from '../../shared/Frame/Frame';
// import FrameSimple from '../../Universal/Frame/FrameSimple';

import Sketch from './ClickMeSketch';


// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// palm https://poly.google.com/view/ficLBIjGliK

// var loaded = true;
// var this.face;
// var hands = [];
// var handMat;
// var scene;
// var currentHandIndex = 0;

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
    // addSkybox(scene);

    this.addFace(this.scene);

    // var mat = new StandardMaterial("handMat", scene);
    // mat.diffuseTexture = new Texture("assets/s3-bucket/clickMe/frame.png", scene);
    // mat.diffuseTexture.hasAlpha = true; 
    // var plane = MeshBuilder.CreatePlane("plane1", {width: 100, height:70 }, scene);
    // plane.material = mat;
    // plane.position.set(0, 10, 100);
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

  addFace = (scene) => {

    var mat = new StandardMaterial("dog", scene);
    mat.diffuseTexture = new Texture("/assets/s3-bucket/clickMe/face/rainbow.png", scene);
    // mat.diffuseTexture.hasAlpha = true;
    mat.backFaceCulling = true;
    mat.diffuseTexture.uScale = 1;
    mat.diffuseTexture.vScale = 1;
    this.loadFace(mat);

    // var cylinder = Mesh.CreateCylinder("rebarGrayZAxis", 400, 100, 100, 60, scene, false);
    // cylinder.material = mat;
    // cylinder.position.z = 405;
  }

  loadFace = (myMaterial) => {
    var url = "/assets/s3-bucket/clickMe/face/";
    var gThis = this;
    SceneLoader.LoadAssetContainer(url, "blockydebb.obj", this.scene, function (container) {
      var meshes = container.meshes;
      // console.log(meshes)
      gThis.face = meshes[0];


      // this.face.rotation.y = Math.random()*Math.PI*2;
      gThis.face.rotation.x = -1.3;
      // this.face.rotation.z = (-.3+Math.random()*.6);

      gThis.face.position.y = -140;
      gThis.face.position.x = 0;
      gThis.face.position.z = 405;
      let sc = 2;
      gThis.face.scaling = new Vector3(sc, sc, sc);

      // Create materials


      //////////////
      // var myMaterial = new StandardMaterial("myMaterial", scene);
      // myMaterial.diffuseColor = new Color3(.7, .7, .7);
      // myMaterial.specularColor = new Color3(0.5, 0.5, .5);
      // // myMaterial.emissiveColor = new Color3(1, 1, 1);
      // myMaterial.ambientColor = new Color3(0.5, .5, 0.53);
      /////////////


      gThis.face.material = myMaterial;
      // this.face.material.wireframe = true;

      container.addAllToScene();  // Adds all elements to the scene

      gThis.loaded = true;

    });
  }

 
  onRender = (scene) => {

    if (this.face) {
      this.face.rotation.y = Math.PI * .4 * Math.sin((new Date()).getTime() / 1200) + .3;
    }

    // moveHands(scene);
  }

  // handUp = () => {
  //   console.log("hand up")

  //   clearTimeout(this.handTimer);
  //   this.setState({ handId: null, showHands: false, toolID: "hand" })
  // }

  // handDown = () => {
  //   console.log("hand down")

  //   this.setState({ handId: null, handT: new Date() })
  //   this.handTimer = setTimeout(this.showHandMenu, 1500);
  // }

  // handLeave = () => {
  //   console.log("leave hand")
  //   if (!this.state.showHandMenu) {
  //     clearTimeout(this.handTimer);
  //   }
  // }

  // checkHand = () => {
  //   if (this.state.handId && new Date - this.state.handT) {
  //     this.setState({ showHands: true })
  //   }
  // }

  // showHandMenu = () => {
  //   console.log("show hands")
  //   this.setState({ showHands: true });
  // }

  // getHandMenu = () => {
  //   if (this.state.showHands) {
  //     let hands = ["🖐🏿", "🖐🏾", "🖐🏽", "🖐🏼", "🖐🏻"];
  //     return (
  //       <div className="handBox">
  //         {hands.map((hand, i) =>
  //           <button>{hand}</button>
  //         )}
  //       </div>
  //     )
  //   }
  //   return null;
  // }

  setCursor = (id) => {
    this.setState({ cursor: id });
  }

  getClickMenu = () => {
    let hands = [0, 0, 0, 0, 0];
    return (
      <Frame title="" content={
        <div className="hands">

          {/* {hands.map((hand, i) => {
            let h = i;
            return(
              <button key={i} onClick={() => this.setCursor("point" + h)}>
                <img src={"/assets/s3-bucket/clickMe/cursors/point" + h + ".png"} width={80} height={80} />
              </button>
            )
          })} */}
          <button
            className="hand"
            onClick={() => this.setCursor("kiss")}
          >
            <img className="buttonImg" src={window.AWS + "/clickMe/cursorImages/kiss.png"} />
          </button>
          <button
            className="hand"
            onClick={() => this.setCursor("erase")}
          >
            <img className="buttonImg" src={window.AWS + "/clickMe/cursorImages/eraser.png"} />
          </button>
        </div>
      }
        width={80} height={400} x={window.innerWidth - 100} y={(window.innerHeight - 80 - 97 * hands.length) / 2}
      />
    );
  }

  handChange = (index) => {
    console.log(index);
  }



  render() {
    return (
      <div className={"ClickMe Sketch " + this.state.cursor}>
        <BabylonScene className="noSelect backgroundCover" antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />

        {this.getSketch(true)}
        {this.getClickMenu()}
        {/* {this.getFrame()} */}
        {/* {this.getHandMenu()} */}
      </div>
    )
  }

  getSketch = (fullS) => {
    return (
      <Sketch
        className="p5sketch"
        w={800}
        h={800}
        fullS={fullS}
        cursor={this.state.cursor}
      />
    )
  }

  getFrame = () => {
    return (
      <Frame title="" content={
        this.getSketch(false)
      }
        width={800} height={800} y={100} x={100}
      />
    )
  }

}

// function startHand() {
//   hands[currentHandIndex].isVisible;
//   hands[currentHandIndex].position.z = 0;
//   currentHandIndex++;
//   currentHandIndex %= hands.length;
// }

// function moveHands(scene) {
//   for (const hand of hands) {
//     if (hand.isVisible) {
//       hand.position.z += 10;
//       if (hand.position.z > 3000) {
//         hand.isVisible = false;
//       }
//     }
//   }
// }

// function addHands(scene) {
//   handMat = new StandardMaterial("handMat", scene);
// 	handMat.diffuseTexture = new Texture("assets/s3-bucket/clickMe/pointer.png", scene);
// 	handMat.alpha = 0.5;	

//   for (let i = 0; i < 100; i++) {
//     var plane = MeshBuilder.CreatePlane("plane1", {}, scene);
// 	  plane.material = handMat;
//     plane.position.z = 0;
//     plane.isVisible = false;
//     hands.push(plane);
//   }


// }




export default ClickMe;
