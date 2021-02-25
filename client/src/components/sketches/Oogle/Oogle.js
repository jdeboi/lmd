import React, { Component } from "react";
// import ReactDOM from "react-dom";
import * as THREE from "three";
import './Oogle.css';
import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect';
import { Interaction } from 'three.interaction';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
// import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
// import { VertexTangentsHelper } from 'three/examples/jsm/helpers/VertexTangentsHelper.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
// import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe.js';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2.js';
// import { GeometryUtils } from 'three/examples/jsm/utils/GeometryUtils.js';

import { rooms, roomLines, roads, doors, labels } from './data';

import Modal from './components/Modal';
import { connect } from 'react-redux';
import { doneLoadingApp } from '../../../store/actions/';


var mapR = 0;

class Oogle extends Component {

  constructor(props) {
    super(props);

    this.mount = React.createRef();
    this.canvas = React.createRef();

    this.state = {
      currentPoint: labels[0][0],
      isModalHidden: true
    }
  }




  componentDidMount() {

    this.icons = [];
    this.labelGroups = [[], [], [], []];
    this.roomLabels = [];

    this.scaler = 100;
    this.startX = -8 * this.scaler;
    this.startZ = -6 * this.scaler;

    this.init();
    this.startAnimationLoop();

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  startAnimationLoop = () => {
    this.scene.rotation.y = mapR;

    var time = 0
    this.light.position.x = Math.sin(time * 1.7) * 300;
    this.light.position.y = Math.cos(time * 1.5) * 400;
    this.light.position.z = Math.cos(time * 1.3) * 300;


    this.setRoomIconTransforms();
    this.setLabelTransforms();
    this.setVisibleLabels();

    if (this.controls)
      this.controls.update();
    this.effect.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);

  };


  init = () => {
    this.scene = new THREE.Scene();
    this.initRenderer(this.mount);
    this.initCamera();

    // new a interaction, then you can add interaction-event with your free style
    const interaction = new Interaction(this.renderer, this.scene, this.camera);


    this.initControls();
    this.initAnaglyph();

    this.initLights();

    this.initRoomIcons();
    this.initLabels();
    this.initRooms();
    this.initRoads();
    // initDoors();

    this.initModels(this.loadingDone);
    this.initGrids();
    // addSkybox();

    window.addEventListener('resize', this.onWindowResize, false);

  }

  initRenderer = () => {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
    this.renderer.setClearColor(0xffff00, 1);
  }

  initCamera = () => {
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    // this.camera.position.z = 1200;
    this.camera.position.set(0, 1200, 0);
    this.camera.lookAt(this.scene.position);
  }

  initControls = () => {
    this.controls = new MapControls(this.camera, this.renderer.domElement);
    // this.controls.maxPolarAngle = 0;
    this.controls.minZoom = .1;
    // this.controls.maxZoom = .5;
    this.controls.maxDistance = 2000;
    this.controls.update();
  }

  initAnaglyph = () => {
    this.effect = new AnaglyphEffect(this.renderer);
    this.effect.setSize(window.innerWidth, window.innerHeight);
  }

  initLights = () => {
    this.light = new THREE.PointLight();
    this.light.position.set(200, 100, 150);
    this.scene.add(this.light);
  }

  initModels = (callback) => {
    const wallH = 400;
    var promises = [];
    promises.push(this.loadObj(window.AWS + '/homePage/models/sofa/Sofa_01.obj', { x: 9 * this.scaler, y: -200, z: 1 * this.scaler }, 15, -Math.PI / 2));
    promises.push(this.loadObj(window.AWS + '/homePage/models/toilet/Toilet_01.obj', { x: 17 * this.scaler, y: -200, z: 5 * this.scaler }, 18, Math.PI));
    promises.push(this.loadObj(window.AWS + '/homePage/models/bed3/Bed_01.obj', { x: 16 * this.scaler, y: -200, z: 10 * this.scaler }, 15, -Math.PI / 2));
    promises.push(this.loadObj(window.AWS + '/homePage/models/window/Window_02.obj', { x: 0 * this.scaler, y: -50, z: 9 * this.scaler }, 10, 0));

    promises.push(this.loadObj(window.AWS + '/homePage/models/kitchen/cabinets.obj', { x: 7.6 * this.scaler, y: -80, z: 9.5 * this.scaler }, 130, Math.PI));

    Promise.all(promises)
      .then(callback);
  }

  initGrids = () => {
    this.drawGrid(12 * this.scaler, { x: 6 * this.scaler, y: -200, z: 6 * this.scaler });
    this.drawGrid(6 * this.scaler, { x: 9 * this.scaler + 6 * this.scaler, y: -200, z: -3 * this.scaler + 6 * this.scaler });
    this.drawGrid(6 * this.scaler, { x: 9 * this.scaler + 6 * this.scaler, y: -200, z: 3 * this.scaler + 6 * this.scaler });
  }

  initLabels = () => {
    let level = 0;
    for (const labelLevel of labels) {
      for (let i = 0; i < labelLevel.length; i++) {
        const label = labelLevel[i];
        let path = window.AWS + `/homePage/labels/l${level}/${i}.svg`;
        // let path = '/assets/s3-bucket/oogle/labels/l' + level + '/0.svg';
        let callback = (group, lev) => {
          group.position.set(label.x * this.scaler + this.startX, -180, label.y * this.scaler + this.startZ);
          // group.scale.set(10, 10,);
          this.labelGroups[lev].push(group);

          let h = 40
          let w = label.name.length * 15.6;
          const geo = new THREE.PlaneGeometry(w, h, 32);
          const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide });
          const plane = new THREE.Mesh(geo, material);
          plane.position.set(w / 2, 0, 0);
          group.add(plane);

          group.cursor = 'pointer';
          group.on('click', (ev) => {
            this.setLabel(label.lev, label.id);
            this.onShowModal();
          });


          this.scene.add(group);
        }
        let l = level;
        this.loadSVG(path, { x: 0, y: 0, z: 0 }, Math.PI / 2, (group) => callback(group, l));
      }
      level++;
    }
  }

  initRoomIcons = () => {
    for (const room of rooms) {


      let labelCallback = (gl, gi) => {


        var pivot = new THREE.Object3D();
        // gl.scale
        pivot.add(gl);
        pivot.add(gi);
        // pivot.scale.multiplyScalar(5 );
        const x = room.iconPos.x * this.scaler + this.startX;
        const y = room.iconPos.y * this.scaler + this.startZ;
        pivot.position.set(x, 0, y);

        let sc = 8.7;
        let w = 150 * (room.name.length / sc);
        let h = 30;
        let xs = -20;
        let sp = room.name.indexOf(" ");
        if (sp > -1) {
          let word = room.name.substring(0, sp);
          w = 150 * (word.length / sc);
          xs = -30;
          h = 50;
        }
        const geometry = new THREE.PlaneGeometry(w, h, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide });
        const plane1 = new THREE.Mesh(geometry, material);
        plane1.rotation.x = Math.PI / 2;
        plane1.position.set(xs + w / 2, 0, h / 2);

        h = 30
        w = 22;
        const geo = new THREE.PlaneGeometry(w, h, 32);
        const plane2 = new THREE.Mesh(geo, material);
        plane2.rotation.x = Math.PI / 2;
        plane2.position.set(0, 0, -h / 2);

        pivot.cursor = 'pointer';
        pivot.on('click', (ev) => {
          this.setRoom(room.id);
          this.onShowModal();
        });
        pivot.add(plane1);
        pivot.add(plane2);

        this.scene.add(pivot);
        this.icons.push(pivot);
        this.roomLabels.push(gl);

      }
      let iconCallback = (group) => {
        // group.scale.multiplyScalar(2 );
        let path = window.AWS + "/homePage/labels/rooms/" + room.icon + ".svg";
        // let path = "/assets/s3-bucket/homePage/labels/rooms/txt.svg";
        this.loadSVG(path, { x: -20, y: .1, z: 5 }, Math.PI / 2, (gl) => labelCallback(gl, group));
      }
      let path = window.AWS + "/homePage/assets/icons/icon2.svg"; // + points[i].icon + ".svg"
      this.loadSVG(path, { x: -10, y: .1, z: -30 }, Math.PI / 2, iconCallback);
    }

  }


  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }


  setRoomIconTransforms = () => {
    for (const group of this.icons) {
      group.rotation.y = this.camera.rotation.z - mapR;
      // let sc = this.camera.position.y/500;
      var scaleVector = new THREE.Vector3();
      var scaleFactor = 500;
      var scale = scaleVector.subVectors(this.scene.position, this.camera.position).length() / scaleFactor;
      group.scale.set(scale, scale, scale)
    }
  }

  setLabelTransforms = () => {
    let lev = 1;
    for (const level of this.labelGroups) {
      for (const group of level) {
        group.rotation.z = -this.camera.rotation.z + mapR;
        let val = 1;
        // if (level === 1) val = .7;
        // else if (val === 2) val = .6;
        let sc = (this.camera.position.y - group.position.y) / 800 * val;
        var scaleVector = new THREE.Vector3();
        // var scaleFactor = 600+(lev++)*50;
        // var scaleFactor = 700;
        // var scale = scaleVector.subVectors(new THREE.Vector3(this.camera.position.x, 0, this.camera.position.z), this.camera.position).length() / scaleFactor;
        // group.scale.set(scale, scale, scale)
        group.scale.set(sc, sc, sc)
      }
    }
  }

  setVisibleLabels = () => {
    this.setRoomLabels();
    this.resetLabelGroups();

    // other labels
    // reset

    const y = this.camera.position.y;

    if (y > 0) {
      if (y < 900) {
        for (const lg of this.labelGroups[0]) {
          lg.visible = true;
        }
      }
      if (y < 500) {
        for (const lg of this.labelGroups[1]) {
          lg.visible = true;
        }
      }
      if (y < 300) {
        for (const lg of this.labelGroups[2]) {
          lg.visible = true;
        }
      }

    }

  }

  resetLabelGroups = () => {
    for (const level of this.labelGroups) {
      for (const lg of level) {
        lg.visible = false;
      }
    }
  }


  setRoomLabels = () => {
    const y = this.camera.position.y;
    // room labels
    for (const g of this.roomLabels) {
      if ((y < 1100) && y > 0) {
        g.visible = true;
      }
      else g.visible = false;
    }
  }




  initRooms = () => {
    // console.log("len", roomLines.length)
    for (const room of roomLines) {
      const roomPoints = room.map((x, i) => {
        if ((i - 1) % 3 == 0)
          return -200;
        return x * this.scaler;
      });
      this.addLine(roomPoints, 0x000000, 2);
    }
  }

  initRoads = () => {
    // for (let i = 0; i < 4; i++) {
    //   const l0 = [points[i].x, 0, points[i].y, points[i+1].x, 0, points[i+1].y];
    //   addLine(l0);
    // }
    for (const road of roads) {
      const roadPoints = road.map((x) => { return x * this.scaler; });
      this.addLine(roadPoints);
    }
  }

  initDoors = () => {
    for (const door of doors) {
      const doorPoints = door.map((x) => {
        return x * this.scaler;
      });
      this.addLine(doorPoints, 0xffff00, 8);
    }
  }

  // positions needs to be an array of vector3s
  addLine = (positions, col = 0x000000, lW = 5) => {
    // OG?
    //create a blue LineBasicMaterial
    // var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    // var geometry = new THREE.BufferGeometry().setFromPoints( pts );
    // var line = new THREE.Line( geometry, material );
    // this.scene.add( line );

    var geometry = new LineGeometry();
    geometry.setPositions(positions);
    // geometry.setColors( colors );

    var matLine = new LineMaterial({
      color: col,
      linewidth: lW, // in pixels
      vertexColors: false,
      //resolution:  // to be set by this.renderer, eventually
      dashed: false

    });
    matLine.resolution.set(window.innerWidth, window.innerHeight);

    var line = new Line2(geometry, matLine);
    line.position.set(this.startX, 0, this.startZ);
    line.computeLineDistances();
    line.scale.set(1, 1, 1);
    this.scene.add(line);
  }

  loadSVG = (url, { x, y, z }, rot, callback) => {
    var loader = new SVGLoader();
    loader.load(url, (data) => {
      var paths = data.paths;

      var group = new THREE.Group();

      group.position.x = x;
      group.position.y = y;
      group.position.z = z;
      // group.scale.y *= - 1;
      group.rotation.x = rot;
      // group.rotation.z = Math.PI;



      for (var i = 0; i < paths.length; i++) {

        var path = paths[i];

        var fillColor = path.userData.style.fill;
        var drawFills = true;
        if (drawFills && fillColor !== undefined && fillColor !== 'none') {

          var material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setStyle(fillColor),
            opacity: path.userData.style.fillOpacity,
            transparent: path.userData.style.fillOpacity < 1,
            side: THREE.DoubleSide,
            depthWrite: false,
            wireframe: false
          });

          var shapes = path.toShapes(true);

          for (var j = 0; j < shapes.length; j++) {

            var shape = shapes[j];

            var geometry = new THREE.ShapeBufferGeometry(shape);
            var mesh = new THREE.Mesh(geometry, material);
            // mesh.geometry.translate(0, 0, 0 );
            group.add(mesh);

          }

        }

        var strokeColor = path.userData.style.stroke;
        var drawStrokes = true;
        if (drawStrokes && strokeColor !== undefined && strokeColor !== 'none') {

          var material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setStyle(strokeColor),
            opacity: path.userData.style.strokeOpacity,
            transparent: path.userData.style.strokeOpacity < 1,
            side: THREE.DoubleSide,
            depthWrite: false,
            wireframe: false
          });

          for (var j = 0, jl = path.subPaths.length; j < jl; j++) {

            var subPath = path.subPaths[j];

            var geometry = SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style);

            if (geometry) {

              var mesh = new THREE.Mesh(geometry, material);

              group.add(mesh);

            }

          }

        }

      }

      // this.scene.add( group );
      callback(group);
    });

  }


  drawGrid = (w, { x, y, z }) => {
    let div = w / 100;
    var gridHelper = new THREE.GridHelper(w, div, 0x000000, 0x808080);
    gridHelper.position.set(x + this.startX, y, z + this.startZ);
    this.scene.add(gridHelper);

    // var geometry = new THREE.PlaneGeometry( 400, 200, 40, 40 );
    // var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
    // var plane = new THREE.Mesh( geometry, material );
    // plane.position.set(-50, -200, 0);
    // var helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
    // this.scene.add( helper );
  }

  drawRoom = ({ w, h, d }, { x, y, z }, opac, color) => {
    var geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshPhongMaterial({
      color: color,
      opacity: opac,
      transparent: true,
    });
    const cube = new THREE.Mesh(geometry, material);

    var geometryL = new WireframeGeometry2(geometry);
    var matLine = new LineMaterial({
      color: 0x4080ad,
      linewidth: 5, // in pixels
      //resolution:  // to be set by this.renderer, eventually
      dashed: false
    });
    matLine.resolution.set(window.innerWidth, window.innerHeight);
    var wireframe = new Wireframe(geometryL, matLine);
    wireframe.computeLineDistances();
    // wireframe.scale.set( sc, sc, sc );
    // this.scene.add( wireframe );
    this.scene.add(cube);
    wireframe.position.set(x, y, z);
    cube.position.set(x, y, z);
  }

  isoLines = () => {
    var geo = new THREE.IcosahedronBufferGeometry(20, 1);
    var geometry = new WireframeGeometry2(geo);
    var matLine = new LineMaterial({
      color: 0x4080ff,
      linewidth: 5, // in pixels
      //resolution:  // to be set by this.renderer, eventually
      dashed: false
    });
    var wireframe = new Wireframe(geometry, matLine);
    wireframe.computeLineDistances();
    wireframe.scale.set(30, 30, 30);
    this.scene.add(wireframe);
  }

  addSkybox = () => {
    // skybox
    var path = window.AWS + "/hardDrives/skybox/skybox_";
    var format = '.jpg';
    var urls = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ];
    var textureCube = new THREE.CubeTextureLoader().load(urls);
    this.scene.background = textureCube;

  }

  loadObj = (path, { x, y, z }, sc, rot) => {

   
    return new Promise((resolve, reject) => {
      var object;

      const loadModel = () => {
        object.traverse( (child) => {
          if (child.isMesh) {
            const materialT = new THREE.MeshPhongMaterial({
              color: 0xffffff,
              opacity: .2,
              transparent: true,
              side: THREE.DoubleSide,
              depthWrite: false
            });
            child.material = materialT;

          }
        });

        object.position.set(x + this.startX, y, z + this.startZ);
        object.rotation.y = rot;
        object.scale.set(sc, sc, sc);

        this.scene.add(object);
        // object.cursor = 'pointer';
        // object.on('click', function(ev) {
        //   console.log("???")
        // });
        resolve();
      }
      var manager = new THREE.LoadingManager(loadModel);
      manager.onProgress = (item, loaded, total) => {
        // console.log(item, loaded, total);
      };
      // model
      const onProgress = (xhr) => {
        if (xhr.lengthComputable) {
          var percentComplete = xhr.loaded / xhr.total * 100;
          // console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
        }
      }
      const onError = () => {
        reject();
      }

      var loader = new OBJLoader(manager);
      loader.load(path, (obj) => {
        object = obj;
      }, onProgress, onError);

    });

  }
  rotateMap = (amt) => {
    mapR += amt / 3;
  }

  onHideModal = () => {
    this.setState({ isModalHidden: true })
  }

  onShowModal = () => {
    this.setState({ isModalHidden: false })
  }


  loadingDone = () => {
    this.props.doneLoadingApp();
  }

  setRoom = (id) => {
    this.setState({ currentPoint: rooms[id] })
  }

  setLabel = (level, id) => {
    this.setState({ currentPoint: labels[level][id] })
  }

  render() {
    return (
      <div className="Oogle Sketch">
        <div className="Three" ref={ref => (this.mount = ref)}></div>
        <canvas ref={ref => (this.canvas = ref)} />
        {/* <button className="rotateL" onClick={() => this.rotateMap(-Math.PI / 2)}>right</button>
        <button className="rotateR" onClick={() => this.rotateMap(Math.PI / 2)}>left</button> */}
        <Modal data={this.state.currentPoint} isHidden={this.state.isModalHidden} onHide={this.onHideModal} />
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
    doneLoadingApp
  }
}


export default connect(mapStateToProps, mapDispatchToProps())(Oogle);

