import React from 'react';
import Frame from '../../shared/Frame/Frame';
import DesktopIcon from '../../shared/DesktopIcon/DesktopIcon';
import { connect } from 'react-redux';
// import FrameSimple from '../../shared/Frame/FrameSimple';
import './Xfinity.css';
import { mapVal } from '../../shared/Helpers/Helpers';

// import Carousel from '../../shared/Carousel/Carousel';
// import ReactScrollWheelHandler from "react-scroll-wheel-handler";
// import Balloon from './assets/balloonsprite.png';
// import cloudsVid from  "../MacbookAir/assets/clouds3d.mp4";
// import folder from  "./assets/folder.png";

// Babylon
import { AnaglyphUniversalCamera, HemisphericLight, Vector3, Vector2, StandardMaterial, Color4, Mesh, Texture } from 'babylonjs';
import BabylonScene from '../../shared/Babylon.jsx';
import { WaterMaterial } from 'babylonjs-materials';


var camera, water, waterMesh;



class Xfinity extends React.Component {
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
      startX: (window.innerWidth - this.numFrames * 15 - this.imgW * 1 - 50) / 2 -80,
      startY: (window.innerHeight - this.numFrames * 15 + 50) / 2,
      imageIndex: 0,
      touchS: 0,
      mapDivs: [],
      currentMobileDiv: 0
    }

    this.divRef = React.createRef();
    this.preventDefault = e => e.preventDefault()

    this.numImages = 51;

    // this.wheel = this.wheel.bind(this);
    // this.setImages = this.setImages.bind(this);
  }


  componentDidMount() {
    this.divRef.current.addEventListener('wheel', this.preventDefault);
    this.setImages();

    // this.props.userSetRoom("xfinity-depths");
  }

  componentWillUnmount() {
    this.divRef.current.removeEventListener('wheel', this.preventDefault);
    // this.props.userLeaveRoom("xfinity-depths");
  }


  setImages = () => {
    const { imageIndex } = this.state;
    const mapDivs = [...this.state.mapDivs];
    for (let i = 0; i < this.numFrames; i++) {
      mapDivs[i] = this.mod((imageIndex + i * 2) * this.imgW, this.imgW * this.numImages);
    }
    this.setState({ mapDivs });
  }

  wheel = (e) => {
    var deltaY = this.state.deltaY + e.deltaY;

    var imageIndex = deltaY / 40;
    imageIndex = Math.floor(imageIndex);
    imageIndex = this.mod(imageIndex, this.numImages);

    const mapDivs = [...this.state.mapDivs];
    for (let i = 0; i < this.numFrames; i++) {
      mapDivs[i] = this.mod((imageIndex + i * 2) * this.imgW, this.imgW * this.numImages);
    }

    this.setState({ deltaY, imageIndex, mapDivs });
    // this.setImages();

    // console.log(imageIndex);
    return false;
  }

  mod(a, b) {
    return (((a % b) + b) % b);
  }

  onSceneReady(scene) {
    // const camera = new UniversalCamera("UniversalCamera", new Vector3(0, 1, -25), scene);
    camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 8, -5), 0.033, scene);
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
    water.bumpTexture = new Texture(window.AWS + "/shared/waterbump.png", scene);
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
    var groundTexture = new Texture(window.AWS + "/shared/sand2.jpg", scene);
    groundTexture.vScale = groundTexture.uScale = 10;
    var groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = groundTexture;
    var ground = Mesh.CreateGround("ground", 512, 512, 32, scene, false);
    ground.position.y = -10;
    ground.material = groundMaterial;
    water.addToRenderList(ground);

    // SceneLoader.ImportMesh("", "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/loop/", "fish.glb", scene, function (meshes) {          
    //     // scene.createDefaultCameraOrLight(true, true, true);
    //     // scene.createDefaultEnvironment();
    //     meshes.forEach((m) => {
    //       m.position.x = 14;
    //       m.position.z = 20;
    //     })
    // });

  }


  onRender(scene) {
    let divFps = document.getElementById("fps");
    if (divFps) divFps.innerHTML = scene.getEngine().getFps().toFixed() + " fps";
  }

  getMouseWheel = (mouseX, mouseY, mouseW = 80) => {
    return (
      <Frame
        // windowStyle={{ boxShadow: "none" }}
        content={
          <div className="mouse">
            <div className="mouse-icon">
              <span className="mouse-wheel"></span>
            </div>
          </div>
        }
        width={mouseW}
        height={mouseW}
        bounded={true}
        x={mouseX}
        y={mouseY}
      // z={1}
      />
    )
  }

  getCascadeDivs = () => {
    return (
      this.state.mapDivs.map((balloonX, i) => {
        const opac = (i + 1) * (1 / this.numFrames);
        const val = this.state.imageIndex * this.imgW;
        return (

          <Frame
            windowStyle={{ opacity: opac }}
            content={
              <div className="balloon" style={{ backgroundPosition: `${val}px 0px`, width: this.imgW, height: this.imgH }}></div>
            }
            key={i}
            width={this.imgW}
            height={this.imgH}
            isControlled={false}
            x={this.state.startX + i * 15}
            y={this.state.startY - i * 15}
            z={1}
          />

        );

      })
    )
  }

  getDesktopDivs = () => {
    let mouseW = 80;
    let mouseX = this.state.startX + this.imgW + (this.state.mapDivs.length * 15) + 80;
    let mouseY = this.state.startY - (this.state.mapDivs.length * 15) + (this.imgH - mouseW) / 2 + this.props.ui.toolbarH;
    return (
      <React.Fragment>
        {this.getCascadeDivs()}
        {this.getMouseWheel(mouseX, mouseY, mouseW)}
      </React.Fragment>

    )
  }

  getMobileDivs = () => {
    const { ui } = this.props;
    let spacing = 15;
    let mouseW = 80;
   
    if (ui.orientation === "portrait") {

      var w = Math.min(this.props.ui.contentW - spacing * 2, this.imgW);
      var h = w / this.imgW * this.imgH;
      var x = (ui.contentW - w) / 2 - 2;
      var y = mapVal(ui.contentH, 568, 1300, 80, 240);
      var mouseY = y + h + ui.toolbarH + 50;
      var mouseX = (ui.contentW - mouseW) / 2;
    } else {
      
      let availW = ui.contentW - spacing*3 - mouseW;
      let availH = ui.contentH - spacing*2 - ui.toolbarH;
      let asp = availW/availH;
      let imgAsp = this.imgW/this.imgH;
      if (imgAsp > asp) {
        var w = Math.min(availW, this.imgW);
        var h = w/this.imgW * this.imgH;
      }
      else {
        var h = Math.min(availH, this.imgH);
        var w = h/this.imgH * this.imgW;
      }
      var x = (ui.contentW - mouseW - w) /3;
      var y = (ui.contentH - ui.toolbarH - h)/2;
      var mouseX = w + x + spacing;
      var mouseY = (ui.contentH - ui.toolbarH - mouseW) / 2;
    }

    const val = this.state.imageIndex * this.imgW;
    // let per = (w/this.imgW*100) + "%";
    return (
      <React.Fragment>


        <Frame
          windowStyle={{ opacity: 1 }}
          content={
            <div className="balloon"
              style={{
                backgroundPosition: `${val}px 0px`,
                width: w,
                height: h
              }}
            ></div>
          }
          width={w}
          height={h}
          isControlled={true}
          bounded={true}
          x={x}
          y={y}
        // z={1}
        />
        <div className="backgroundCover"
          style={{ touchAction: "none" }}
          onTouchStart={(e) => this.touchStart(e)}
          onTouchMove={(e) => this.touchMove(e)}
          onTouchEnd={(e) => this.touchEnd(e)}
        />
        {this.getMouseWheel(mouseX, mouseY, mouseW)}
        <div className="backgroundCover"
          style={{ touchAction: "none" }}
          onTouchStart={(e) => this.touchStart(e)}
          onTouchMove={(e) => this.touchMove(e)}
          onTouchEnd={(e) => this.touchEnd(e)}
        />
      </React.Fragment>
    )
  }

  touchStart = (e) => {
    // console.log(e.touches[0].clientY);
    this.setState({ touchS: e.touches[0].clientY })
  }

  touchMove = (e) => {
    var deltaY = e.touches[0].clientY + this.state.touchS;

    var imageIndex = deltaY / 10;
    imageIndex = Math.floor(imageIndex);
    imageIndex = this.mod(imageIndex, this.numImages);
    this.setState({ imageIndex });
  }

  touchEnd = (e) => {

  }

  render() {


    return (
      <div className="Xfinity Sketch"
        ref={this.divRef}
        onWheel={(e) => this.wheel(e)}
      >


        { <BabylonScene className="noSelect backgroundCover" antialias onSceneReady={this.onSceneReady} onRender={this.onRender} id='babylon-canvas' />}

        {this.props.ui.isMobile ? this.getMobileDivs() : this.getDesktopDivs()}


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

const mapStateToProps = (state) => {
  return {
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    // doneLoadingApp
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Xfinity);

