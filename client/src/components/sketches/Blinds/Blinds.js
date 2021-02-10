import React from 'react';
import "./Blinds.css";

import Sketch from './p5/BlindsSketch';

// store
import { connect } from 'react-redux';
import { doneLoadingApp } from '../../../store/actions';

import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
// import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe.js';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2.js';

var AnaglyphEffect = require('../../shared/3D/AnaglyphEffect')(THREE);


class Blinds extends React.Component {


  constructor(props) {
    super(props);

    this.mount = React.createRef();
  }


  componentDidMount() {

    this.scene = new THREE.Scene();
    this.columns = [];
    this.hercules = [];

    this.initCamera();
    this.initRenderer(this.mount);
    this.initControls();
    this.initLights();
    this.initFloor();
    this.initSkybox();
    this.initStatues();
    this.initEffect();

    window.addEventListener('resize', this.onWindowResize, false);

    this.startAnimationLoop();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  initCamera = () => {

    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene.add(this.camera);
    this.scene.fog = new THREE.FogExp2(0xccddbb, 0.002);//efd1b5
    this.camera.position.set(0, 100, 400);
    this.camera.lookAt(this.scene.position);

  }


  initRenderer = (mount) => {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(this.renderer.domElement);
    // renderer.setClearColor(0xffff00, 1);
  }

  initControls = () => {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  initLights = () => {
    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, 100);
    this.scene.add(light);
  }

  initFloor = () => {
    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture('/assets/s3-bucket/blinds/wallpaper/blkmar.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4);
    this.floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.BackSide });
    var floorGeometry = new THREE.PlaneGeometry(1000, 1500, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, this.floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    floor.position.z = - 200
    this.scene.add(floor);
  }

  initSkybox = () => {
    // SKYBOX
    // var skyTexture = new THREE.ImageUtils.loadTexture('/assets/s3-bucket/blinds/wallpaper/mar3.jpg');
    // skyTexture.wrapS = skyTexture.wrapT = THREE.RepeatWrapping;
    // skyTexture.repeat.set(4, 4);
    // var skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.DoubleSide });
    var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    // var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
    var skyBox = new THREE.Mesh(skyBoxGeometry, this.floorMaterial);
    this.scene.add(skyBox);
  }

 
  initStatues = () => {
    const objLoader = new OBJLoader();
    objLoader.load('/assets/s3-bucket/blinds/column/column_blend.obj', (root) => {
      var column = root;
      var mat = new THREE.MeshLambertMaterial({ color: 0xdddddd });
      column.material = mat;
      column.scale.set(60, 60, 60);
      column.position.set(0, 80, 0);
      this.columns.push(column)
      // scene.add(column);

      for (let i = 0; i < 10; i++) {
        let newCL = column.clone();
        newCL.position.set(-200, 78, i * -100 + 100);
        this.scene.add(newCL);
        this.columns.push(newCL);

        let newCR = column.clone();
        newCR.position.set(200, 78, i * -100 + 100);
        this.scene.add(newCR);
        this.columns.push(newCR);
      }

    });

    objLoader.load('/assets/s3-bucket/blinds/hercules/hercules.obj', (root) => {
      var hercules = root;
      var mat = new THREE.MeshLambertMaterial({ color: 0xdddddd });
      hercules.material = mat;
      let sc = 2;
      hercules.scale.set(sc, sc, sc);
      // hercules.rotation.y = -3;
      hercules.position.set(-100, 0, -100);
      // this.hercules.push(hercules);
      this.scene.add(hercules);

      // for (let i = 0; i < 4; i++) {
      //   let newCL = hercules.clone();
      //   newCL.position.set(-100, 0, i * -150 + 200);
      //   this.scene.add(newCL);
      //   this.hercules.push(newCL);

      //   let newCR = hercules.clone();
      //   newCR.position.set(100, 0, i * -200 + 200);
      //   newCR.rotation.set(0, -Math.PI / 3, 0);
      //   this.scene.add(newCR);
      //   this.hercules.push(newCR);
      // }

    });

    objLoader.load('/assets/s3-bucket/blinds/bench/bench.obj', (root) => {
      var bench = root;
      var mat = new THREE.MeshLambertMaterial({ color: 0xdddddd });
      bench.material = mat;
      bench.scale.set(1, 1, 1);
      bench.position.set(0, 0, 50);
      bench.rotation.y = Math.PI/2;
      
      this.scene.add(bench);

     
    });
  }

  initEffect = () => {
    var width = window.innerWidth || 2;
    var height = window.innerHeight || 2;

    this.effect = new AnaglyphEffect(this.renderer, width, height);
    this.effect.setSize(width, height);
  }

  loadingDone = () => {
    this.props.doneLoadingApp();
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    this.effect.setSize(window.innerWidth, window.innerHeight);
  }

  startAnimationLoop = () => {
    if (this.controls)
      this.controls.update();
    for (const c of this.columns)
      c.rotation.y += .02;
    this.effect.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  }

  render() {
    return (
      <div className="Blinds Sketch" >
        <div className="Three" ref={ref => (this.mount = ref)} />
        <Sketch className="p5sketch" ui={this.props.ui} />


      </div>

    )
  }
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
