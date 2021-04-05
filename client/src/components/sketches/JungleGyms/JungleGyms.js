import React from 'react';
// import ReactDOM from "react-dom";

import "./JungleGyms.css";

import * as THREE from "three";
import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Frame from '../../shared/Frame/Frame';

// store
import { connect } from 'react-redux';
import { setSketchMusic } from '../../../store/actions/music';

import Pipe from './Pipe';



class JungleGyms extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      firstLoad: true
    }

    this.videoSwings = React.createRef();
    this.videoGym = React.createRef();
  }

  componentDidMount() {
    this.interval = setInterval(this.reset, 20000);
    window.addEventListener('resize', this.handleWindowResize);

    this.setupScene();
    this.startAnimationLoop();

    this.props.setSketchMusic("jungleGyms", 0, .5);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
    clearInterval(this.interval);
    // this.props.userLeaveRoom("jungle-gyms");
  }

  componentDidUpdate(prevProps) {
    const { ui } = this.props;
    if (ui.compositionStarted && !prevProps.ui.compositionStarted) {
      this.videoSwings.current.play();
      this.videoGym.current.play();
    }
  }

  handleWindowResize = () => {
    const width = window.innerWidth; //this.el.clientWidth;
    const height = window.innerHeight; //this.el.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  setupScene = () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(this.renderer.domElement);


    this.effect = new AnaglyphEffect(this.renderer);
    this.effect.setSize(window.innerWidth, window.innerHeight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 1;
    this.controls.maxDistance = 80;

    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    this.scene.add(ambientLight);
    this.addLight(-10, 2, 4);
    this.addLight(1, -10, -2);

    this.addScreenCube(this.videoGym.current, 1920, 1080, .01, [0, 0, -8], [0, 0, 0], 47);
    this.addScreenCube(this.videoSwings.current, 1080, 1920, .01, [6, 0, -20], [0, -Math.PI / 2, 0], 20);

    this.pipes = [];
    this.vines = [];
    this.nodes = {};

    this.addWallPaper();
    this.addVines();
    this.look();
  }

  startAnimationLoop = () => {
    // this.renderer.render( this.scene, this.camera );
    for (let i = 0; i < this.pipes.length; i++) {
      this.pipes[i].update();
    }
    if (this.pipes.length === 0) {
      for (let i = 0; i < 1 + (1 + chance(1 / 10)); i++) {
        this.pipes.push(new Pipe(this.nodes, this.scene));
      }
    }
    for (let i = 0; i < 3; i++) {
      if (this.vines[i]) this.vines[i].position.y = -10 - i * 5 + Math.sin(new Date().getTime() / 1000);
    }

    if (this.controls) this.controls.update();
    this.effect.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);

  };


  reset = () => {
    // const {pipes} = this.state;
    this.renderer.clear();
    for (var i = 0; i < this.pipes.length; i++) {
      this.scene.remove(this.pipes[i].object3d);
    }
    this.pipes = [];
    this.nodes = {};
    this.look();
  }

  addLight = (...pos) => {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...pos);
    this.scene.add(light);
  }

  addScreenCube = (video, pW, pH, fac, pos, rot, boxLen) => {
    var videoTex = new THREE.VideoTexture(video);
    pW *= fac;
    pH *= fac;

    videoTex.minFilter = THREE.LinearFilter;
    videoTex.magFilter = THREE.LinearFilter;
    videoTex.format = THREE.RGBFormat;
    var geometry = new THREE.PlaneGeometry(pW, pH, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, map: videoTex });
    var plane = new THREE.Mesh(geometry, material);
    plane.position.set(...pos);
    plane.rotation.set(...rot);
    this.scene.add(plane);


    var geometry = new THREE.BoxGeometry(pW, pH, boxLen);
    var material = new THREE.MeshPhongMaterial({ color: 0x00aa00, opacity: .3, transparent: true, side: THREE.DoubleSide }); //
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(...pos);
    cube.rotation.set(...rot);
    this.scene.add(cube);

    var geometry = new THREE.BoxBufferGeometry(pW, pH, boxLen);
    var edges = new THREE.EdgesGeometry(geometry);
    var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 24 }));
    line.position.set(...pos);
    line.rotation.set(...rot);
    this.scene.add(line);
  }

  addWallPaper = () => {
    const url = window.AWS + "/jungleGyms/wallpaper3.jpg";
    var wall = new THREE.TextureLoader().load(url);
    wall.wrapS = THREE.RepeatWrapping;
    wall.wrapT = THREE.RepeatWrapping;
    wall.repeat.set(4, 4);
    var geometry = new THREE.PlaneGeometry(200, 100, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, map: wall });
    var plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, -14);
    // scene.add( plane );
    this.scene.background = wall;
  }

  addVines = () => {
    var self = this;
    var modelPath = window.AWS + "/jungleGyms/vines/";
    var model = "Vines";
    var onProgress = function (xhr) {
      if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        // console.log(Math.round(percentComplete, 2) + '% downloaded');
      }
    }
    var onError = function () { };
    var manager = new THREE.LoadingManager();
    manager.addHandler(/\.dds$/i, new DDSLoader());
    new MTLLoader(manager)
      .setPath(modelPath)
      .load(model + '.mtl', function (materials) {

        materials.preload();

        new OBJLoader(manager)
          .setMaterials(materials)
          .setPath(modelPath)
          .load(model + '.obj', function (vine) {
            vine.rotation.set(0, Math.PI, 0);
            vine.position.set(-10, -10, -10);
            vine.scale.set(5, 5, 5);
            self.vines.push(vine);

            var newVine = vine.clone();
            newVine.position.set(0, -15, 0);
            vine.rotation.set(0, 0, 0);
            self.vines.push(newVine);

            var newVine2 = vine.clone();
            newVine2.rotation.set(0, -Math.PI / 2, 0);
            self.vines.push(newVine2);
            self.scene.add(vine);
            self.scene.add(newVine);
            self.scene.add(newVine2);

          }, onProgress, onError);

      });

    //
  }

  look = () => {
    // TODO: never don't change the view (except maybe while clearing)
    if (this.state.firstLoad || chance(1 / 2)) {
      // head-on view

      this.camera.position.set(0, 0, 14);
      this.setState({ firstLoad: false });
    } else {
      // random view

      var vector = new THREE.Vector3(30, 0, 0);

      var axis = new THREE.Vector3(random(-1, 1), random(-1, 1), random(-1, 1));
      var angle = Math.PI / 2;
      var matrix = new THREE.Matrix4().makeRotationAxis(axis, angle);

      vector.applyMatrix4(matrix);
      this.camera.position.copy(vector);
    }
    // camera.position.set(0, 0, 14);
    var center = new THREE.Vector3(0, 0, 0);
    this.camera.lookAt(center);
    // camera.updateProjectionMatrix(); // maybe?
    this.controls.update();
  }

  getControlsFrame = () => {
    const w = 230;
    return (
      <Frame title="jungle gyms" content={
        <div className="jungleControls">
          <button>left</button>
          <button>right</button>
          <button>+</button>
          <button>-</button>
        </div>
      }
        width={w} height={50} x={window.innerWidth - w - 50} y={window.innerHeight - 124}
      />
    )
  }

  render() {
    const gymUrl = window.AWS + "/jungleGyms/gym.mp4"
    return (
      <div className="JungleGyms Sketch">
        <div className="threeCanvas" ref={ref => (this.mount = ref)} />
        <video
          playsInline
          crossOrigin="anonymous"
          ref={this.videoGym}
          autoPlay
          muted
          loop
          className="gym" >
          <source src={gymUrl} type="video/mp4" ></source>
          Your browser does not support HTML5 video.
        </video>
        <video
          playsInline
          crossOrigin="anonymous"
          ref={this.videoSwings}
          autoPlay
          muted
          loop
          className="gym" >
          <source src={window.AWS + "/jungleGyms/swings.mp4"} type="video/mp4" ></source>
          Your browser does not support HTML5 video.
        </video>

        {/* { this.getControlsFrame()} */}
        {/*Glasses />*/}
      </div>
    )
  }
}

function random(x1, x2) {
  return Math.random() * (x2 - x1) + x1;
}
function chance(value) {
  return Math.random() < value;
}

function shuffleArrayInPlace(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function showElementsIf(selector, condition) {
  Array.from(document.querySelectorAll(selector)).forEach(function (el) {
    if (condition) {
      el.removeAttribute("hidden");
    } else {
      el.setAttribute("hidden", "hidden");
    }
  });
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui
  }
}

const mapDispatchToProps = () => {
  return {
    // doneLoadingApp
    setSketchMusic
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(JungleGyms);
