import React from 'react';
import Frame from '../../shared/Frame/Frame';
import DesktopIcon from '../../shared/DesktopIcon/DesktopIcon';
// import FrameSimple from '../../shared/Frame/FrameSimple';
import './Loop.css';
// import ReactScrollWheelHandler from "react-scroll-wheel-handler";
// import Balloon from './assets/balloonsprite.png';
// import cloudsVid from  "../MacbookAir/assets/clouds3d.mp4";
// import folder from  "./assets/folder.png";

// Babylon
import { Scene, AnaglyphUniversalCamera, UniversalCamera,PostProcess, Effect, HemisphericLight, Vector3, Vector2, SceneLoader,AssetContainer, MeshBuilder, StandardMaterial,  VideoTexture, CubeTexture, Color3,Color4, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx';
import { WaterMaterial } from 'babylonjs-materials';


var camera, water, waterMesh;
var tubes = [];
var seed = 1;



class Loop extends React.Component {
  // https://codepen.io/JohJakob/pen/YPxgwo
  constructor(props) {
    super(props);

    // this.imgW = 350;
    this.numFrames = 15;
    this.imgW = 450;
    this.imgH = 254;
    this.state = {
      deltaX: 0,
      deltaY: 0,
      startX: (window.innerWidth-this.numFrames*15-this.imgW*1-50)/2,
      startY: (window.innerHeight-this.numFrames*15+50)/2,
      imageIndex: 0,
      mapDivs: []
    }

    this.divRef = React.createRef();
    this.preventDefault = e => e.preventDefault()

    this.numImages = 51;

    this.wheel = this.wheel.bind(this);
    this.setImages = this.setImages.bind(this);
  }


  componentDidMount() {
    this.divRef.current.addEventListener('wheel', this.preventDefault);
    this.setImages();
  }

  componentWillUnmount() {
    this.divRef.current.removeEventListener('wheel', this.preventDefault);
  }


  setImages() {
    const {imageIndex} = this.state;
    let {mapDivs} = this.state;
    for (let i = 0; i < this.numFrames; i++) {
      mapDivs[i] = this.mod((imageIndex+i*2)* this.imgW, this.imgW*this.numImages);
    }
    this.setState({mapDivs});
  }

  wheel(e) {
    let {deltaY, imageIndex, mapDivs} = this.state;
    deltaY += e.deltaY;

    imageIndex = deltaY / 40;
    imageIndex = Math.floor(imageIndex);
    imageIndex = this.mod(imageIndex, this.numImages);

    this.setState({deltaY, imageIndex});
    this.setImages();

    // console.log(imageIndex);
    return false;
  }

  mod(a, b) {
    return (((a % b) + b) % b);
  }

  onSceneReady(scene) {
    // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
    camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0,8, -5), 0.033, scene);
    scene.clearColor = new Color4(0, 0, 0, 0);
    camera.setTarget(new Vector3(11, 3, -2));

    const canvas = scene.getEngine().getRenderingCanvas();
    // camera.attachControl(canvas, true);

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;



    // Water
    waterMesh = Mesh.CreateGround("waterMesh", 512, 512, 32, scene, false);
    waterMesh.position.y = -9;
    water = new WaterMaterial("water", scene, new Vector2(1024, 1024));
    water.backFaceCulling = true;
    water.bumpTexture = new Texture(window.AWS+"/shared/waterbump.png", scene);
    water.windForce = -5;
    water.waveHeight = 0.8;
    water.bumpHeight = 0.3;
    water.waveLength = 0.3;
    water.colorBlendFactor = 0;
    waterMesh.material = water;

    // Skybox
    // var skyW = 1000;
    // var skybox = Mesh.CreateBox("skyBox", skyW, scene);
    // var skyboxMaterial = new StandardMaterial("skyBox", scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new CubeTexture(window.AWS+"/shared/sky/moon/moon", scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new Color3(0, 0, 0);
    // skyboxMaterial.disableLighting = true;
    // skybox.material = skyboxMaterial;
    // water.addToRenderList(skybox);


    // Ground
    var groundTexture = new Texture(window.AWS+"/shared/sand2.jpg", scene);
    groundTexture.vScale = groundTexture.uScale = 10;
    var groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = groundTexture;
    var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
    ground.position.y = -10;
    ground.material = groundMaterial;
    water.addToRenderList(ground);



    // drain
    // var drainTex = new BABYLON.Texture(window.AWS+"/mars/drain1.png", scene);
    // addDrain(scene);
    // loadWhale(scene);
    // addInnerTubes(4, scene, water);
    // addSwimmer(scene);

    // Effect.ShadersStore["customFragmentShader"] = `
    // #ifdef GL_ES
    // precision highp float;
    // #endif
    //
    // // Samplers
    // varying vec2 vUV;
    // uniform sampler2D textureSampler;
    //
    // // Parameters
    // uniform vec2 screenSize;
    // uniform float threshold;
    //
    // void main(void)
    // {
    //   vec2 texelSize = vec2(1.0 / screenSize.x, 1.0 / screenSize.y);
    //   vec4 baseColor = texture2D(textureSampler, vUV);
    //
    //
    //   if (baseColor.r < threshold) {
    //     gl_FragColor = baseColor;
    //   } else {
    //     gl_FragColor = vec4(0);
    //   }
    // }
    // `;
    //
    // var postProcess = new PostProcess("My custom post process", "custom", ["screenSize", "threshold"], null, 0.25, camera);
    // postProcess.onApply = function (effect) {
    //   effect.setFloat2("screenSize", postProcess.width, postProcess.height);
    //   effect.setFloat("threshold", 0.8);
    // };
  }


  onRender(scene) {
    let divFps = document.getElementById("fps");
    if (divFps) divFps.innerHTML = scene.getEngine().getFps().toFixed() + " fps";
  }



  render() {

    let mapDivs = [];


    return (
      <div className="Loop Sketch" ref={this.divRef} onWheel = {(e) => this.wheel(e)}>
        {/*   <video ref={this.cloudsRef} autoPlay muted loop className="backgroundCover">
        <source src={cloudsVid} type="video/mp4" ></source>
        Your browser does not support HTML5 video.
        </video>*/}

        { <BabylonScene  className="noSelect backgroundCover" antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />}


        {this.state.mapDivs.map((balloonX, i) => {
          const opac = (i+1)*(1/this.numFrames);
          // console.log();
          return(<Frame windowStyle={{opacity:opac}} content={
            <div className="balloon" style={{backgroundPosition: `${balloonX}px 0px`, width: this.imgW, height:this.imgH}}></div>
          }
          key={i} width={this.imgW} height={this.imgH} isControlled={false} x={this.state.startX+i*15} y={this.state.startY-i*15}
          />
      );

    })}

  {/*   <DesktopIcon x={100} y={100} width={60} height={90} title="dip" content={
        <img src={folder} width={60} height={60} />
      }
      />
    <DesktopIcon x={100} y={220} width={60} height={90} title="dive" content={
        <img src={folder} width={60} height={60} />
      }
      />

    <DesktopIcon x={100} y={340} width={60} height={90} title="descend" content={
        <img src={folder} width={60} height={60} />
      }
      />*/}
  </div>
);
}

}




export default Loop;
