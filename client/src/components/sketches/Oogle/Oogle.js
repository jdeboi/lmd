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
import { hasJSDocParameterTags } from "typescript";


var mapR = 0;

class Oogle extends Component {

  constructor(props) {
    super(props);

    this.mount = React.createRef();
    this.canvas = React.createRef();

    this.state = {
      currentPoint: labels[0][0],
      isModalHidden: false
    }
  }

  componentDidMount() {

    // for (let i = 0; i < 10; i ++) {
    //   labels[i].x = points[i].x;
    //   labels[i].y = points[i].y+3;
    // }

    var scene, renderer;
    var effect;
    var camera, light;
    var vnh;
    var vth;
    // var object;
    var wireframe, wireframe1;
    var matLine, matLineBasic, matLineDashed;
    var controls;
    var icons = [];
    // var labelSvgs = [];

    var labelGroups = [[], [], [], []];
    var roomLabels = [];

    var scaler = 100;
    var startX = -8 * scaler;
    var startZ = -6 * scaler;

    init(this.mount, this.loadingDone, this.setRoom, this.setLabel);
    animate();

    function init(mount, doneLoading, setRoom, setLabel) {

      initRenderer(mount);
      scene = new THREE.Scene();
      initCamera();

      // new a interaction, then you can add interaction-event with your free style
      const interaction = new Interaction(renderer, scene, camera);


      initControls();
      initAnaglyph();

      initLights();

      initRoomIcons(setRoom);
      initLabels(setLabel);
      initRooms();
      initRoads();
      // initDoors();

      initModels(doneLoading);
      initGrids();
      // addSkybox();

      window.addEventListener('resize', onWindowResize, false);

    }

    function initRenderer(mount) {
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      mount.appendChild(renderer.domElement);
      renderer.setClearColor(0xffff00, 1);
    }

    function initCamera() {
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
      // camera.position.z = 1200;
      camera.position.set(0, 1200, 0);
      camera.lookAt(scene.position);
    }

    function initControls() {
      controls = new MapControls(camera, renderer.domElement);
      // controls.maxPolarAngle = 0;
      controls.minZoom = .1;
      // controls.maxZoom = .5;
      controls.maxDistance = 2000;
      controls.update();
    }

    function initAnaglyph() {
      effect = new AnaglyphEffect(renderer);
      effect.setSize(window.innerWidth, window.innerHeight);
    }

    function initLights() {
      light = new THREE.PointLight();
      light.position.set(200, 100, 150);
      scene.add(light);
    }

    function initModels(callback) {
      const wallH = 400;
      var promises = [];
      promises.push(loadObj(window.AWS + '/homePage/models/sofa/Sofa_01.obj', { x: 9 * scaler, y: -200, z: 1 * scaler }, 15, -Math.PI / 2));
      promises.push(loadObj(window.AWS + '/homePage/models/toilet/Toilet_01.obj', { x: 17 * scaler, y: -200, z: 5 * scaler }, 18, Math.PI));
      promises.push(loadObj(window.AWS + '/homePage/models/bed3/Bed_01.obj', { x: 16 * scaler, y: -200, z: 10 * scaler }, 15, -Math.PI / 2));
      // loadObj('/assets/s3-bucket/homePage/models/window/Window_02.obj', {x: 2*scaler, y: -100, z: 0*scaler}, 10, Math.PI/2);
      promises.push(loadObj(window.AWS + '/homePage/models/window/Window_02.obj', { x: 0 * scaler, y: -50, z: 9 * scaler }, 10, 0));
      promises.push(loadObj(window.AWS + '/homePage/models/kitchen/cabinets.obj', { x: 7.6 * scaler, y: -80, z: 9.5 * scaler }, 130, Math.PI));
      // loadObj('/assets/s3-bucket/homePage/models/door/Door_01.obj', {x: 0*scaler, y: -200, z: 3*scaler}, 45, Math.PI);
      // loadObj('/assets/s3-bucket/homePage/models/fiddle/RubberFigPottedPlant.obj', {x: 5*scaler, y: -200, z: 5*scaler}, 30, Math.PI);

      Promise.all(promises)
        .then(callback);
    }

    function initGrids() {
      drawGrid(12 * scaler, { x: 6 * scaler, y: -200, z: 6 * scaler });
      drawGrid(6 * scaler, { x: 9 * scaler + 6 * scaler, y: -200, z: -3 * scaler + 6 * scaler });
      drawGrid(6 * scaler, { x: 9 * scaler + 6 * scaler, y: -200, z: 3 * scaler + 6 * scaler });
    }

    function initLabels(setLabel) {
      let level = 0;
      for (const labelLevel of labels) {
        for (let i = 0; i < labelLevel.length; i++) {
          const label = labelLevel[i];
          let path = window.AWS + `/homePage/labels/l${level}/${i}.svg`;
          // let path = `/assets/s3-bucket/homePage/labels/rooms/bathroom.svg`;

          let callback = (group, lev) => {
            group.position.set(label.x * scaler + startX, -180, label.y * scaler + startZ);
            group.scale.set(1, 1, 1);
            labelGroups[lev].push(group);

            let h = 40
            let w = label.name.length * 15.6;
            const geo = new THREE.PlaneGeometry(w, h, 32);
            const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(geo, material);
            plane.position.set(w / 2, 0, 0);
            group.add(plane);

            group.cursor = 'pointer';
            group.on('click', function (ev) {
              setLabel(label.lev, label.id);
            });


            scene.add(group);
          }
          let l = level;
          loadSVG(path, { x: 0, y: 0, z: 0 }, Math.PI / 2, (group) => callback(group, l));
        }
        level++;
      }
    }

    function initRoomIcons(setRoom) {
      for (const room of rooms) {


        let labelCallback = (gl, gi) => {


          var pivot = new THREE.Object3D();
          pivot.add(gl);
          pivot.add(gi);
          // pivot.scale.multiplyScalar(2 );
          const x = room.iconPos.x * scaler + startX;
          const y = room.iconPos.y * scaler + startZ;
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
          pivot.on('click', function (ev) {
            setRoom(room.id);
          });
          pivot.add(plane1);
          pivot.add(plane2);

          scene.add(pivot);
          icons.push(pivot);
          roomLabels.push(gl);

        }
        let iconCallback = (group) => {
          // group.scale.multiplyScalar(2 );
          let path = window.AWS + "/homePage/labels/rooms/" + room.icon + ".svg";
          // let path = "/assets/s3-bucket/homePage/labels/rooms/txt.svg";
          loadSVG(path, { x: -20, y: .1, z: 5 }, Math.PI / 2, (gl) => labelCallback(gl, group));
        }
        let path = window.AWS + "/homePage/assets/icons/icon2.svg"; // + points[i].icon + ".svg"
        loadSVG(path, { x: -10, y: .1, z: -30 }, Math.PI / 2, iconCallback);
      }

    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // function createCharacterLabelOG(canvas, text, { x, y, z }, level) {
    //   // level = 0 is least intimate = biggest text
    //   // const sc = (3-(level))*60;
    //   const sc = 60;
    //   const ctx = canvas.getContext('2d');

    //   // var fs = 130;
    //   // if (level === 1) fs = 30;
    //   // else if (level === 2) fs = 20;
    //   // const font = fs + 'px grobold';

    //   const font = '24px grobold';
    //   ctx.font = font;
    //   canvas.width = Math.ceil(ctx.measureText(text).width + 16);
    //   canvas.height = 34;

    //   // ctx.strokeStyle = 'none';
    //   ctx.lineWidth = 8;
    //   ctx.lineJoin = 'miter';
    //   ctx.miterLimit = 3;
    //   // ctx.strokeText( text, 8, 26 );
    //   ctx.fillStyle = 'black';
    //   ctx.fillText(text, 8, 26);

    //   const spriteMap = new THREE.Texture(ctx.getImageData(0, 0, canvas.width, canvas.height));
    //   spriteMap.minFilter = THREE.LinearFilter;
    //   spriteMap.generateMipmaps = false;
    //   spriteMap.needsUpdate = true;

    //   const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: spriteMap }));
    //   sprite.scale.set(sc * canvas.width / canvas.height, sc, 1);
    //   sprite.position.set(x, y, z);
    //   // console.log(sprite.position)
    //   // return sprite;
    //   // scene.add(sprite);
    //   return sprite;
    // }

    function animate() {

      requestAnimationFrame(animate);

      // camera.rotate.y = mapR;
      // scene.position.x = Math.cos( mapR );
      // scene.position.z = Math.sin( mapR );
      scene.rotation.y = mapR;
      // scene.position.set(-8*scaler, 0, -6*scaler);
      var time = 0; //- performance.now() * 0.0003;
      // camera.position.x = 400 * Math.cos( time );
      // camera.position.z = 400 * Math.sin( time );
      // camera.lookAt( scene.position );
      light.position.x = Math.sin(time * 1.7) * 300;
      light.position.y = Math.cos(time * 1.5) * 400;
      light.position.z = Math.cos(time * 1.3) * 300;


      setRoomIconTransforms();
      setLabelTransforms();
      setVisibleLabels();

      if (vnh) vnh.update();
      if (vth) vth.update();

      // renderer will set this eventually
      // if (matLine) matLine.resolution.set( window.innerWidth, window.innerHeight ); // resolution of the viewport
      controls.update();
      effect.render(scene, camera);
    }

    function setRoomIconTransforms() {
      for (const group of icons) {
        group.rotation.y = camera.rotation.z - mapR;
        // let sc = camera.position.y/500;
        var scaleVector = new THREE.Vector3();
        var scaleFactor = 500;
        var scale = scaleVector.subVectors(scene.position, camera.position).length() / scaleFactor;
        group.scale.set(scale, scale, scale)
      }
    }

    function setLabelTransforms() {
      let lev = 1;
      for (const level of labelGroups) {
        for (const group of level) {
          group.rotation.z = -camera.rotation.z + mapR;
          let val = 1;
          // if (level === 1) val = .7;
          // else if (val === 2) val = .6;
          let sc = (camera.position.y - group.position.y) / 800 * val;
          var scaleVector = new THREE.Vector3();
          // var scaleFactor = 600+(lev++)*50;
          // var scaleFactor = 700;
          // var scale = scaleVector.subVectors(new THREE.Vector3(camera.position.x, 0, camera.position.z), camera.position).length() / scaleFactor;
          // group.scale.set(scale, scale, scale)
          group.scale.set(sc, sc, sc)
        }
      }
    }

    function setVisibleLabels() {
      setRoomLabels();
      resetLabelGroups();

      // other labels
      // reset

      const y = camera.position.y;

      if (y > 0) {
        if (y < 900) {
          for (const lg of labelGroups[0]) {
            lg.visible = true;
          }
        }
        if (y < 500) {
          for (const lg of labelGroups[1]) {
            lg.visible = true;
          }
        }
        if (y < 300) {
          for (const lg of labelGroups[2]) {
            lg.visible = true;
          }
        }

      }

    }

    function resetLabelGroups() {
      for (const level of labelGroups) {
        for (const lg of level) {
          lg.visible = false;
        }
      }
    }


    function setRoomLabels() {
      const y = camera.position.y;
      // room labels
      for (const g of roomLabels) {
        if ((y < 1100) && y > 0) {
          g.visible = true;
        }
        else g.visible = false;
      }
    }




    function initRooms() {
      // console.log("len", roomLines.length)
      for (const room of roomLines) {
        const roomPoints = room.map(function (x, i) {
          if ((i - 1) % 3 == 0) return -200;
          return x * scaler;
        });
        addLine(roomPoints, 0x000000, 2);
      }
    }

    function initRoads() {
      // for (let i = 0; i < 4; i++) {
      //   const l0 = [points[i].x, 0, points[i].y, points[i+1].x, 0, points[i+1].y];
      //   addLine(l0);
      // }
      for (const road of roads) {
        const roadPoints = road.map(function (x) { return x * scaler; });
        addLine(roadPoints);
      }
    }

    function initDoors() {
      for (const door of doors) {
        const doorPoints = door.map(function (x) {
          return x * scaler;
        });
        addLine(doorPoints, 0xffff00, 8);
      }
    }

    // positions needs to be an array of vector3s
    function addLine(positions, col = 0x000000, lW = 5) {
      // OG?
      //create a blue LineBasicMaterial
      // var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
      // var geometry = new THREE.BufferGeometry().setFromPoints( pts );
      // var line = new THREE.Line( geometry, material );
      // scene.add( line );

      var geometry = new LineGeometry();
      geometry.setPositions(positions);
      // geometry.setColors( colors );

      matLine = new LineMaterial({
        color: col,
        linewidth: lW, // in pixels
        vertexColors: false,
        //resolution:  // to be set by renderer, eventually
        dashed: false

      });
      matLine.resolution.set(window.innerWidth, window.innerHeight);

      var line = new Line2(geometry, matLine);
      line.position.set(startX, 0, startZ);
      line.computeLineDistances();
      line.scale.set(1, 1, 1);
      scene.add(line);
    }

    function loadSVG(url, { x, y, z }, rot, callback) {
      var loader = new SVGLoader();
      loader.load(url, function (data) {
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

        // scene.add( group );
        callback(group);
      });

    }

    function setupAttributes(geometry) {

      var vectors = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 1)
      ];

      var position = geometry.attributes.position;
      var centers = new Float32Array(position.count * 3);

      for (var i = 0, l = position.count; i < l; i++) {

        vectors[i % 3].toArray(centers, i * 3);

      }

      geometry.setAttribute('center', new THREE.BufferAttribute(centers, 3));

    }

    function vertexShader() {
      return `
      attribute vec3 center;
      varying vec3 vCenter;

      void main() {

        vCenter = center;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }`
    }

    function fragmentShader() {
      return `uniform float widthFactor;

      varying vec3 vCenter;

      float edgeFactorTri() {

        vec3 d = fwidth( vCenter.xyz );

        vec3 a3 = smoothstep( vec3( 0.0 ), d * widthFactor, vCenter.xyz );

        return min( min( a3.x, a3.y ), a3.z );

      }

      void main() {

        if ( edgeFactorTri() > 0.99 ) discard;

        gl_FragColor = gl_FrontFacing ? vec4( 0.9, 0.9, 1.0, 1.0 ) : vec4( 0.4, 0.4, 0.5, 1.0 );

      }`
    }

    function drawGrid(w, { x, y, z }) {
      let div = w / 100;
      var gridHelper = new THREE.GridHelper(w, div, 0x000000, 0x808080);
      gridHelper.position.set(x + startX, y, z + startZ);
      scene.add(gridHelper);

      // var geometry = new THREE.PlaneGeometry( 400, 200, 40, 40 );
      // var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
      // var plane = new THREE.Mesh( geometry, material );
      // plane.position.set(-50, -200, 0);
      // var helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
      // scene.add( helper );
    }

    function drawRoom({ w, h, d }, { x, y, z }, opac, color) {
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
        //resolution:  // to be set by renderer, eventually
        dashed: false
      });
      matLine.resolution.set(window.innerWidth, window.innerHeight);
      var wireframe = new Wireframe(geometryL, matLine);
      wireframe.computeLineDistances();
      // wireframe.scale.set( sc, sc, sc );
      // scene.add( wireframe );
      scene.add(cube);
      wireframe.position.set(x, y, z);
      cube.position.set(x, y, z);
    }

    function isoLines() {
      var geo = new THREE.IcosahedronBufferGeometry(20, 1);
      var geometry = new WireframeGeometry2(geo);
      matLine = new LineMaterial({
        color: 0x4080ff,
        linewidth: 5, // in pixels
        //resolution:  // to be set by renderer, eventually
        dashed: false
      });
      wireframe = new Wireframe(geometry, matLine);
      wireframe.computeLineDistances();
      wireframe.scale.set(30, 30, 30);
      scene.add(wireframe);
    }

    function addSkybox() {
      // skybox
      var path = window.AWS + "/hardDrives/skybox/skybox_";
      var format = '.jpg';
      var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ];
      var textureCube = new THREE.CubeTextureLoader().load(urls);
      scene.background = textureCube;

    }

    function loadObj(path, { x, y, z }, sc, rot) {


      return new Promise((resolve, reject) => {
        var object;

        function loadModel() {
          object.traverse(function (child) {
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

          object.position.set(x + startX, y, z + startZ);
          object.rotation.y = rot;
          object.scale.set(sc, sc, sc);

          scene.add(object);
          // object.cursor = 'pointer';
          // object.on('click', function(ev) {
          //   console.log("???")
          // });
          resolve();
        }
        var manager = new THREE.LoadingManager(loadModel);
        manager.onProgress = function (item, loaded, total) {
          console.log(item, loaded, total);
        };
        // model
        function onProgress(xhr) {
          if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
          }
        }
        function onError() {
          reject();
        }

        var loader = new OBJLoader(manager);
        loader.load(path, function (obj) {
          object = obj;
        }, onProgress, onError);

      });

    }
  }

  rotateMap = (amt) => {
    mapR += amt / 3;
  }

  onHideModal = () => {
    this.setState({ isModalHidden: true })
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
        <button className="rotateL" onClick={() => this.rotateMap(-Math.PI / 2)}>right</button>
        <button className="rotateR" onClick={() => this.rotateMap(Math.PI / 2)}>left</button>
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

