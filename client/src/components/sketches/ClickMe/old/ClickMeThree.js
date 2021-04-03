import React from 'react';
import "./ClickMe.css";

// store
import { connect } from 'react-redux';
import { doneLoadingApp } from '../../../store/actions';

import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { LightningStrike } from 'three/examples/jsm/geometries/LightningStrike.js';
import { LightningStorm } from 'three/examples/jsm/objects/LightningStorm.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';


var AnaglyphEffect = require('../../shared/3D/AnaglyphEffect')(THREE);


class ClickMe extends React.Component {


  constructor(props) {
    super(props);

    this.mount = React.createRef();
  }


  componentDidMount() {

    this.scene = new THREE.Scene();

    this.initCamera();
    this.initRenderer(this.mount);
    this.initControls();
    this.initLights();
    this.initFloor();
    this.initFace();
    this.initGround();
    this.initSkybox();
    this.initEffect();
    this.initLightning();
    this.initPlasmaBall();
    this.initGui();

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
    this.scene.fog = new THREE.FogExp2(0xff00ff, 0.002);//efd1b5
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
    var light = new THREE.PointLight(0xdddddd);
    light.position.set(-100, 200, 260);
    this.scene.add(light);
  }

  initFloor = () => {
    // FLOOR
    var floorTexture = new THREE.TextureLoader().load(window.AWS + "/blinds/wallpaper/blkmar.jpg");
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
    var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    // var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
    var skyBox = new THREE.Mesh(skyBoxGeometry, this.floorMaterial);
    this.scene.add(skyBox);
  }



  initEffect = () => {
    var width = window.innerWidth || 2;
    var height = window.innerHeight || 2;

    this.effect = new AnaglyphEffect(this.renderer, width, height);
    this.effect.setSize(width, height);
  }

  initGround = () => {

    const size = 500;
    const divisions = 70;

    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);
  }

  initFace = () => {
    const url = "/assets/s3-bucket/clickMe/face/blockydebb.obj";
    const objLoader = new OBJLoader();
    objLoader.load(url, (root) => {
      var face = root;
      var mat = new THREE.MeshLambertMaterial({ color: 0xdd0000 });
      face.material = mat;
      const sc = 1.3;
      face.scale.set(sc, sc, sc);
      face.rotation.x = -Math.PI / 2;
      face.rotation.z = Math.PI;
      face.position.set(0, 80, 0);

      this.scene.add(face);

    });
  }

  initLightning = () => {
    // this.container = null;
    // this.stats = null;
    this.composer = new EffectComposer( this.renderer );
    this.gui = null;
    this.currentSceneIndex = 0;
    this.currentTime = 0;
    // this.sceneCreators = [
    //   createConesScene,
    //   createPlasmaBallScene,
    //   createStormScene
    // ];

    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  initGui = () => {
    if (this.gui) {
      this.gui.destroy();
    }

    this.gui = new GUI({ width: 350 });

    this.scene.userData.sceneIndex = this.currentSceneIndex;
    this.scene.userData.timeRate = 1;


    const graphicsFolder = this.gui.addFolder("Graphics");
    graphicsFolder.add(this.scene.userData, "outlineEnabled").name("Glow enabled");

    this.scene.userData.lightningColorRGB = [
      this.scene.userData.lightningColor.r * 255,
      this.scene.userData.lightningColor.g * 255,
      this.scene.userData.lightningColor.b * 255
    ];
    graphicsFolder.addColor(this.scene.userData, 'lightningColorRGB').name('Color').onChange(function (value) {
      this.scene.userData.lightningMaterial.color.setRGB(value[0], value[1], value[2]).multiplyScalar(1 / 255);
    });
    this.scene.userData.outlineColorRGB = [
      this.scene.userData.outlineColor.r * 255,
      this.scene.userData.outlineColor.g * 255,
      this.scene.userData.outlineColor.b * 255
    ];
    graphicsFolder.addColor(this.scene.userData, 'outlineColorRGB').name('Glow color').onChange(function (value) {
      this.scene.userData.outlineColor.setRGB(value[0], value[1], value[2]).multiplyScalar(1 / 255);
    });
    graphicsFolder.open();

    const rayFolder = this.gui.addFolder("Ray parameters");
    rayFolder.add(this.scene.userData.rayParams, 'straightness', 0, 1).name('Straightness');
    rayFolder.add(this.scene.userData.rayParams, 'roughness', 0, 1).name('Roughness');
    rayFolder.add(this.scene.userData.rayParams, 'radius0', 0.1, 10).name('Initial radius');
    rayFolder.add(this.scene.userData.rayParams, 'radius1', 0.1, 10).name('Final radius');
    rayFolder.add(this.scene.userData.rayParams, 'radius0Factor', 0, 1).name('Subray initial radius');
    rayFolder.add(this.scene.userData.rayParams, 'radius1Factor', 0, 1).name('Subray final radius');
    rayFolder.add(this.scene.userData.rayParams, 'timeScale', 0, 5).name('Ray time scale');
    rayFolder.add(this.scene.userData.rayParams, 'subrayPeriod', 0.1, 10).name('Subray period (s)');
    rayFolder.add(this.scene.userData.rayParams, 'subrayDutyCycle', 0, 1).name('Subray duty cycle');

    if (this.scene.userData.recreateRay) {
      // Parameters which need to recreate the ray after modification
      const raySlowFolder = this.gui.addFolder("Ray parameters (slow)");
      raySlowFolder.add(this.scene.userData.rayParams, 'ramification', 0, 15).step(1).name('Ramification').onFinishChange(function () {
        this.scene.userData.recreateRay();
      });

      raySlowFolder.add(this.scene.userData.rayParams, 'maxSubrayRecursion', 0, 5).step(1).name('Recursion').onFinishChange(function () {
        this.scene.userData.recreateRay();
      });

      raySlowFolder.add(this.scene.userData.rayParams, 'recursionProbability', 0, 1).name('Rec. probability').onFinishChange(function () {
        this.scene.userData.recreateRay();
      });
      raySlowFolder.open();
    }
    rayFolder.open();
  }

  initPlasmaBall = () => {
    this.scene.userData.canGoBackwardsInTime = true;

    // Plasma ball
    this.scene.userData.lightningColor = new THREE.Color(0xFFB0FF);
    this.scene.userData.outlineColor = new THREE.Color(0xFF00FF);

    this.scene.userData.lightningMaterial = new THREE.MeshBasicMaterial({ color: this.scene.userData.lightningColor, side: THREE.DoubleSide });

    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      transparent: true,
      transmission: .96,
      depthWrite: false,
      color: 'white',
      metalness: 0,
      roughness: 0,
      // envMap: textureCube
    });
    const sphereHeight = 300;
    const sphereRadius = 200;

    this.camera.position.set(5 * sphereRadius, 2 * sphereHeight, 6 * sphereRadius);

    const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(sphereRadius, 80, 40), sphereMaterial);
    sphereMesh.position.set(0, sphereHeight, 0);
    this.scene.add(sphereMesh);

    this.sphere = new THREE.Sphere(sphereMesh.position, sphereRadius);

    const spherePlasma = new THREE.Mesh(new THREE.SphereGeometry(sphereRadius * 0.05, 24, 12), this.scene.userData.lightningMaterial);
    spherePlasma.position.copy(sphereMesh.position);
    spherePlasma.scale.y = 0.6;
    this.scene.add(spherePlasma);

    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(sphereRadius * 0.06, sphereRadius * 0.06, sphereHeight, 6, 1, true),
      new THREE.MeshLambertMaterial({ color: 0x020202 })
    );
    post.position.y = sphereHeight * 0.5 - sphereRadius * 0.05 * 1.2;
    this.scene.add(post);

    const box = new THREE.Mesh(new THREE.BoxGeometry(sphereHeight * 0.5, sphereHeight * 0.1, sphereHeight * 0.5), post.material);
    box.position.y = sphereHeight * 0.05 * 0.5;
    this.scene.add(box);

    this.rayDirection = new THREE.Vector3();
    this.rayLength = 0;
    const vec1 = new THREE.Vector3();
    const vec2 = new THREE.Vector3();

    this.lightningStrike = null;
    this.lightningStrikeMesh = null;
    const outlineMeshArray = [];
 
    const gThis = this;
    this.scene.userData.rayParams = {

      sourceOffset: sphereMesh.position,
      destOffset: new THREE.Vector3(sphereRadius, 0, 0).add(sphereMesh.position),
      radius0: 4,
      radius1: 4,
      radius0Factor: 0.82,
      minRadius: 2.5,
      maxIterations: 6,
      isEternal: true,

      timeScale: 0.6,
      propagationTimeFactor: 0.15,
      vanishingTimeFactor: 0.87,
      subrayPeriod: 0.8,
      ramification: 5,
      recursionProbability: 0.8,

      roughness: 0.85,
      straightness: 0.7,

      onSubrayCreation: function (segment, parentSubray, childSubray, lightningStrike) {

        lightningStrike.subrayConePosition(segment, parentSubray, childSubray, 0.6, 0.9, 0.7);

        // THREE.Sphere projection

        vec1.subVectors(childSubray.pos1, lightningStrike.rayParameters.sourceOffset);
        vec2.set(0, 0, 0);

        if (lightningStrike.randomGenerator.random() < 0.7) {

          vec2.copy(gThis.rayDirection).multiplyScalar(gThis.rayLength * 1.0865);

        }

        vec1.add(vec2).setLength(gThis.rayLength);
        childSubray.pos1.addVectors(vec1, lightningStrike.rayParameters.sourceOffset);

      }

    };

    console.log("ok",this.scene.userData.rayParams);
 
    
    this.scene.userData.recreateRay = () => {

      if (this.lightningStrikeMesh) {

        this.scene.remove(this.lightningStrikeMesh);

      }

      this.lightningStrike = new LightningStrike(this.scene.userData.rayParams);
      this.lightningStrikeMesh = new THREE.Mesh(this.lightningStrike, this.scene.userData.lightningMaterial);

      outlineMeshArray.length = 0;
      outlineMeshArray.push(this.lightningStrikeMesh);
      outlineMeshArray.push(spherePlasma);

      this.scene.add(this.lightningStrikeMesh);

    };

    this.scene.userData.recreateRay();

    // Compose rendering

    this.composer.passes = [];

    this.composer.addPass(new RenderPass(this.scene, this.scene.userData.camera));

    const rayPass = new RenderPass(this.scene, this.scene.userData.camera);
    rayPass.clear = false;
    this.composer.addPass(rayPass);

    this.outlinePass = this.createOutline(this.scene, outlineMeshArray, this.scene.userData.outlineColor);

    // this.scene.userData.render = (time) => {

    //   rayDirection.subVectors(this.lightningStrike.rayParameters.destOffset, this.lightningStrike.rayParameters.sourceOffset);
    //   rayLength = rayDirection.length();
    //   rayDirection.normalize();

    //   this.lightningStrike.update(time);

    //   this.controls.update();

    //   outlinePass.enabled = this.scene.userData.outlineEnabled;

    //   this.composer.render();

    // };

    // Controls
    // const controls = new OrbitControls(scene.userData.camera, renderer.domElement);
    // controls.target.copy(sphereMesh.position);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;

    // THREE.Sphere mouse raycasting
    // container.style.touchAction = 'none';
    // container.addEventListener('pointermove', onPointerMove);

   

   

    
  }


  createOutline = ( scene, objectsArray, visibleColor ) => {
    const outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, this.camera, objectsArray );
    outlinePass.edgeStrength = 2.5;
    outlinePass.edgeGlow = 0.7;
    outlinePass.edgeThickness = 2.8;
    outlinePass.visibleEdgeColor = visibleColor;
    outlinePass.hiddenEdgeColor.set( 0 );
    this.composer.addPass( outlinePass );
    scene.userData.outlineEnabled = true;
    return outlinePass;
  }

  checkIntersection = () => {
    const intersection = new THREE.Vector3();
    this.raycaster.setFromCamera(this.mouse, this.scene.userData.camera);
    const result = this.raycaster.ray.intersectSphere(this.sphere, intersection);
    if (result !== null) {
      this.lightningStrike.rayParameters.destOffset.copy(intersection);
    }
  }

  onPointerMove = (event) => {
    if (event.isPrimary === false) return;
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    this.checkIntersection();
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
    this.effect.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);

    this.updateTime();
    this.plasmaRender();
  }

  plasmaRender = () => {
    this.rayDirection.subVectors(this.lightningStrike.rayParameters.destOffset, this.lightningStrike.rayParameters.sourceOffset);
    this.rayLength = this.rayDirection.length();
    this.rayDirection.normalize();

    this.lightningStrike.update(this.currentTime);

    this.controls.update();

    this.outlinePass.enabled = this.scene.userData.outlineEnabled;

    this.composer.render();
  }

  updateTime = () => {
    this.currentTime += this.scene.userData.timeRate * this.clock.getDelta();
    if (this.currentTime < 0) {
      this.currentTime = 0;
    }
    // this.scene.userData.render(this.currentTime);
  }

  render() {
    const { ui } = this.props;
    return (
      <div className="ClickMe Sketch" onMouseMove={this.onPointerMove} >
        <div className="Three" ref={ref => (this.mount = ref)} />
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


export default connect(mapStateToProps, mapDispatchToProps())(ClickMe);
