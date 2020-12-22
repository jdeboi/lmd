import React from 'react';
import ReactDOM from "react-dom";
import "./JungleGyms.css";

import * as THREE from "three";
import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import {DDSLoader} from 'three/examples/jsm/loaders/DDSLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import Frame from '../../shared/Frame/Frame';
import ReactPlayer from 'react-player';
import Glasses from '../../shared/Glasses/Glasses';

// import gym from './assets/gym.mp4';
// import swings from './assets/swings.mp4';
// import wallpaper from './assets/wallpaper3.jpg';
// import tree from './assets/tree.png';



class JungleGyms extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var firstLoad = true;
    var vines = [];
    console.log("special thanks to Isaiah Odhner for the pipes code", "https://github.com/1j01/pipes/blob/master/screensaver.js")
    this.interval = setInterval(reset, 20000);
    var gridBounds = new THREE.Box3(
      new THREE.Vector3(-10, -10, -10),
      new THREE.Vector3(10, 10, 10)
    );
    var nodes = {};
    function setAt(position, value) {
      nodes["(" + position.x + ", " + position.y + ", " + position.z + ")"] = value;
    }
    function getAt(position, value) {
      return nodes["(" + position.x + ", " + position.y + ", " + position.z + ")"];
    }
    function clearGrid() {
      nodes = {};
    }

    const texUrl = window.AWS + "/jungleGyms/caution.jpg";
    var pipeTexture = new THREE.TextureLoader().load(  texUrl );//THREE.ImageUtils.loadTexture(texUrl);
    pipeTexture.wrapS = pipeTexture.wrapT = THREE.RepeatWrapping;
    pipeTexture.repeat.set(.2, .2);

    var Pipe = function(scene, options) {
      var self = this;
      var pipeRadius = 0.2;
      var ballJointRadius = pipeRadius * 1.5;
      var teapotSize = ballJointRadius;

      self.currentPosition = randomIntegerVector3WithinBox(gridBounds);
      self.positions = [self.currentPosition];
      self.object3d = new THREE.Object3D();
      scene.add(self.object3d);
      if (pipeTexture) {
        self.material = new THREE.MeshLambertMaterial({
          map: pipeTexture,
        });
      } else {
        var color = 0x00441f //randomInteger(0, 0xffffff);
        var emissive = new THREE.Color(color).multiplyScalar(0.3);
        self.material = new THREE.MeshPhongMaterial({
          specular: 0xa9fcff,
          color: color,
          emissive: emissive,
          shininess: 100,
        });
      }
      var makeCylinderBetweenPoints = function(fromPoint, toPoint, material) {
        var deltaVector = new THREE.Vector3().subVectors(toPoint, fromPoint);
        var arrow = new THREE.ArrowHelper(
          deltaVector.clone().normalize(),
          fromPoint
        );
        var geometry = new THREE.CylinderGeometry(
          pipeRadius,
          pipeRadius,
          deltaVector.length(),
          10,
          4,
          true
        );
        var mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.setFromQuaternion(arrow.quaternion);
        mesh.position.addVectors(fromPoint, deltaVector.multiplyScalar(0.5));
        mesh.updateMatrix();

        self.object3d.add(mesh);
      };
      var makeBallJoint = function(position) {
        var ball = new THREE.Mesh(
          new THREE.SphereGeometry(ballJointRadius, 8, 8),
          self.material
        );
        ball.position.copy(position);
        self.object3d.add(ball);
      };
      // var makeTeapotJoint = function(position) {
      //   var teapotTexture = textures[options.texturePath].clone();
      //   teapotTexture.repeat.set(1, 1);
      //
      //   THREE.TeapotBufferGeometry = function ( size, segments, bottom, lid, body, fitLid, blinn )
      //   var teapot = new THREE.Mesh(
      //     new THREE.TeapotBufferGeometry(teapotSize, true, true, true, true, true),
      //     self.material
      //     new THREE.MeshLambertMaterial({ map: teapotTexture })
      //   );
      //   teapot.position.copy(position);
      //   teapot.rotation.x = (Math.floor(random(0, 50)) * Math.PI) / 2;
      //   teapot.rotation.y = (Math.floor(random(0, 50)) * Math.PI) / 2;
      //   teapot.rotation.z = (Math.floor(random(0, 50)) * Math.PI) / 2;
      //   self.object3d.add(teapot);
      // };
      var makeElbowJoint = function(fromPosition, toPosition, tangentVector) {

        var elball = new THREE.Mesh(
          new THREE.SphereGeometry(pipeRadius, 8, 8),
          self.material
        );
        elball.position.copy(fromPosition);
        self.object3d.add(elball);

      };

      // if (getAt(self.currentPosition)) {
      //   return; // TODO: find a position that's free
      // }
      setAt(self.currentPosition, self);

      makeBallJoint(self.currentPosition);

      self.update = function() {
        if (self.positions.length > 1) {
          var lastPosition = self.positions[self.positions.length - 2];
          var lastDirectionVector = new THREE.Vector3().subVectors(
            self.currentPosition,
            lastPosition
          );
        }
        if (chance(1 / 2) && lastDirectionVector) {
          var directionVector = lastDirectionVector;
        } else {
          var directionVector = new THREE.Vector3();
          directionVector[chooseFrom("xyz")] += chooseFrom([+1, -1]);
        }
        var newPosition = new THREE.Vector3().addVectors(
          self.currentPosition,
          directionVector
        );

        // TODO: try other possibilities
        // ideally, have a pool of the 6 possible directions and try them in random order, removing them from the bag
        // (and if there's truly nowhere to go, maybe make a ball joint)
        if (!gridBounds.containsPoint(newPosition)) {
          return;
        }
        if (getAt(newPosition)) {
          return;
        }
        setAt(newPosition, self);

        // joint
        // (initial ball joint is handled elsewhere)
        if (lastDirectionVector && !lastDirectionVector.equals(directionVector)) {
          makeBallJoint(self.currentPosition);
        }

        // pipe
        makeCylinderBetweenPoints(self.currentPosition, newPosition, self.material);

        // update
        self.currentPosition = newPosition;
        self.positions.push(newPosition);

        // var extrudePath = new THREE.CatmullRomCurve3(self.positions, false, "catmullrom");

        // var extrusionSegments = 10 * self.positions.length;
        // var radiusSegments = 10;
        // var tubeGeometry = new THREE.TubeBufferGeometry( extrudePath, extrusionSegments, pipeRadius, radiusSegments, false );

        // if(self.mesh){
        // 	self.object3d.remove(self.mesh);
        // }
        // self.mesh = new THREE.Mesh(tubeGeometry, self.material);
        // self.object3d.add(self.mesh);
      };
    };

    var JOINTS_ELBOW = "elbow";
    var JOINTS_BALL = "ball";
    var JOINTS_MIXED = "mixed";
    var JOINTS_CYCLE = "cycle";

    var jointsCycleArray = [JOINTS_ELBOW, JOINTS_BALL, JOINTS_MIXED];
    var jointsCycleIndex = 0;

    var pipes = [];
    var options = {
      multiple: true,
      // texturePath: process.env.PUBLIC_URL + "/assets/jungleGyms/caution.jpg",
      joints: JOINTS_BALL
      // interval: [16, 24], // range of seconds between fade-outs... not necessarily anything like how the original works
    };

    // renderer
    // var canvasWebGL = document.getElementById("canvas-webgl");
    var renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild( renderer.domElement );

    // camera
    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      100000
    );



    var effect = new AnaglyphEffect( renderer );
    effect.setSize( window.innerWidth, window.innerHeight );
    // controls
    var controls = new OrbitControls(camera, renderer.domElement);
    // controls.enabled = false;
    // controls.autoRotate = true;
    controls.minDistance = 1;
    controls.maxDistance = 80;

    // scene
    var scene = new THREE.Scene();

    //////////////// lighting
    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    // var directionalLightL = new THREE.DirectionalLight(0xffffff, 0.9);
    // directionalLightL.position.set(-1.2, 1.5, 0.5);
    // scene.add(directionalLightL);

    function addLight(...pos) {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(...pos);
      scene.add(light);
    }
    addLight(-10, 2, 4);
    addLight( 1, -10, -2);


    function generateHeight( width, height ) {
      var size = width * height, data = new Uint8Array( size ),
      perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;
      for ( var j = 0; j < 4; j ++ ) {
        for ( var i = 0; i < size; i ++ ) {
          var x = i % width, y = ~ ~ ( i / width );
          data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
        }
        quality *= 5;
      }
      return data;
    }

    function reset() {
      renderer.clear();
      for (var i = 0; i < pipes.length; i++) {
        scene.remove(pipes[i].object3d);
      }
      pipes = [];
      clearGrid();
      look();
    }

    // this function is executed on each animation frame
    function animate() {
      controls.update();

      // update
      for (var i = 0; i < pipes.length; i++) {
        pipes[i].update(scene);
      }
      if (pipes.length === 0) {
        // TODO: create new pipes over time?
        for (var i = 0; i < 1 + options.multiple * (1 + chance(1 / 10)); i++) {
          pipes.push(new Pipe(scene, options));
        }
      }

      // if (!clearing) {
      // renderer.render(scene, camera);
      // }

      effect.render( scene, camera );
      requestAnimationFrame(animate);

      for (let i = 0; i < 3; i++) {
        if (vines[i]) vines[i].position.y = -10 -i*5+ Math.sin(new Date().getTime()/1000);
      }
    }


    ///////////////////////////////// add screen
    addScreenCube(this.videoGym, 1920, 1080, .01, [0, 0, -8], [0, 0, 0], 47);
    addScreenCube(this.videoSwings, 1080, 1920, .01, [6, 0, -20], [0, -Math.PI/2, 0], 20);

    function addScreenCube(video, pW, pH, fac, pos, rot, boxLen) {
      var videoTex = new THREE.VideoTexture( video );
      pW *= fac;
      pH  *= fac;

      video.play();
      videoTex.minFilter = THREE.LinearFilter;
      videoTex.magFilter = THREE.LinearFilter;
      videoTex.format = THREE.RGBFormat;
      var geometry = new THREE.PlaneGeometry(pW, pH, 1 );
      var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, map: videoTex} );
      var plane = new THREE.Mesh( geometry, material );
      plane.position.set(...pos);
      plane.rotation.set(...rot);
      scene.add( plane );


      var geometry = new THREE.BoxGeometry( pW, pH, boxLen );
      var material = new THREE.MeshPhongMaterial( {color: 0x00aa00,  opacity: .3, transparent: true, side:THREE.DoubleSide} ); //
      var cube = new THREE.Mesh( geometry, material );
      cube.position.set(...pos);
      cube.rotation.set(...rot);
      scene.add( cube );

      var geometry = new THREE.BoxBufferGeometry( pW, pH, boxLen );
      var edges = new THREE.EdgesGeometry( geometry );
      var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x00ff00, linewidth: 24 } ) );
      line.position.set(...pos);
      line.rotation.set(...rot);
      scene.add( line );
    }

    // var plane2 = new THREE.Mesh( geometry, material );
    // plane2.rotation.set(0, -Math.PI/2, 0);
    // plane2.position.set(-pW/2, 0, -4.5);
    //
    // var plane3 = new THREE.Mesh( geometry, material );
    // plane3.rotation.set(0, Math.PI/2, 0);
    // plane3.position.set(pW/2, 0, -4.5);
    // scene.add( plane3 );

    // var plane4 = new THREE.Mesh( geometry, material );
    // plane4.rotation.set(0, Math.PI, 0);
    // plane4.position.set(0, 0, 4.5);
    // scene.add( plane4 );

    //////////////////////////// sphere dome
    // var geometry = new THREE.SphereBufferGeometry( 1200, 16, 9 );
    // // invert the geometry on the x-axis so that all of the faces point inward
    // geometry.scale( - 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( { map: videoTex } );
    // var mesh = new THREE.Mesh( geometry, material );
    // scene.add( mesh );

    /////////////////////////// ground texture?
    // var worldWidth = 250;
    // var worldDepth = worldWidth;
    // var data = generateHeight( worldWidth, worldDepth );
    // var geometry = new THREE.PlaneBufferGeometry( 7500, 7500, worldWidth - 1, worldDepth - 1 );
    // geometry.rotateX( - Math.PI / 2 );
    // var vertices = geometry.attributes.position.array;
    // for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
    //   vertices[ j + 1 ] = data[ i ] * 10;
    // }
    // var groundMesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: videoTex } ) );
    // groundMesh.position.set(-500, -1000, -4000);
    // scene.add( groundMesh );


    const url = window.AWS+"/jungleGyms/wallpaper3.jpg";
    var wall = new THREE.TextureLoader().load(  url );
    wall.wrapS = THREE.RepeatWrapping;
    wall.wrapT = THREE.RepeatWrapping;
    wall.repeat.set( 4, 4 );
    var geometry = new THREE.PlaneGeometry(200, 100, 1 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide, map: wall} );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.set(0, 0, -14);
    // scene.add( plane );
    scene.background = wall;

    addVines();
    // addCubeParts();
    function addVines() {
      var modelPath = window.AWS + "/jungleGyms/vines/";
      var model = "Vines";
      var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
          var percentComplete = xhr.loaded / xhr.total * 100;
          console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
        }
      }
      var onError = function () { };
      var manager = new THREE.LoadingManager();
      manager.addHandler( /\.dds$/i, new DDSLoader() );
      new MTLLoader( manager )
      .setPath( modelPath )
      .load( model + '.mtl', function ( materials ) {

        materials.preload();

        new OBJLoader( manager )
        .setMaterials( materials )
        .setPath( modelPath )
        .load( model + '.obj', function ( vine ) {
          vine.rotation.set(0, Math.PI, 0);
          vine.position.set(-10, -10, -10);
          vine.scale.set(5, 5, 5);
          vines.push(vine);

          var newVine = vine.clone();
          newVine.position.set(0, -15, 0);
          vine.rotation.set(0, 0,0);
          vines.push(newVine);

          var newVine2 = vine.clone();
          newVine2.rotation.set(0, -Math.PI/2, 0);
          vines.push(newVine2);
          scene.add( vine );
          scene.add(newVine);
          scene.add(newVine2);

        }, onProgress, onError );

      } );

      //
    }

    // function addCubeParts() {
    //   var outlineTex = THREE.ImageUtils.loadTexture(window.AWS + "/jungleGyms/outline.png");
    //   outlineTex.wrapS = outlineTex.wrapT = THREE.RepeatWrapping;
    //   outlineTex.repeat.set(1, 1);
    //
    //   var geometry = new THREE.BoxGeometry( 1920*.01 , 1080*.01, 40 );
    //   var material = new THREE.MeshPhongMaterial( {color: 0x00aa00,  opacity: .3, transparent: true, side:THREE.DoubleSide} ); //
    //   var cube = new THREE.Mesh( geometry, material );
    //   cube.position.set(0, 0, 0);
    //   scene.add( cube );
    //
    //   var geometry = new THREE.BoxBufferGeometry( 1920*.01 , 1080*.01, 40 );
    //   var edges = new THREE.EdgesGeometry( geometry );
    //   var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x00ff00, linewidth: 24 } ) );
    //
    //   scene.add( line );
    // }

    function look() {
      // TODO: never don't change the view (except maybe while clearing)
      if (firstLoad || chance(1 / 2)) {
        // head-on view

        camera.position.set(0, 0, 14);
        firstLoad = false;
      } else {
        // random view

        var vector = new THREE.Vector3(30, 0, 0);

        var axis = new THREE.Vector3(random(-1, 1), random(-1, 1), random(-1, 1));
        var angle = Math.PI / 2;
        var matrix = new THREE.Matrix4().makeRotationAxis(axis, angle);

        vector.applyMatrix4(matrix);
        camera.position.copy(vector);
      }
      // camera.position.set(0, 0, 14);
      var center = new THREE.Vector3(0, 0, 0);
      camera.lookAt(center);
      // camera.updateProjectionMatrix(); // maybe?
      controls.update();
    }
    look();

    // start animation
    animate();

    /**************\
    |boring helpers|
    \**************/
    function random(x1, x2) {
      return Math.random() * (x2 - x1) + x1;
    }
    function randomInteger(x1, x2) {
      return Math.round(random(x1, x2));
    }
    function chance(value) {
      return Math.random() < value;
    }
    function chooseFrom(values) {
      return values[Math.floor(Math.random() * values.length)];
    }
    function shuffleArrayInPlace(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
    function randomIntegerVector3WithinBox(box) {
      return new THREE.Vector3(
        randomInteger(box.min.x, box.max.x),
        randomInteger(box.min.y, box.max.y),
        randomInteger(box.min.z, box.max.z)
      );
    }
    function showElementsIf(selector, condition) {
      Array.from(document.querySelectorAll(selector)).forEach(function(el) {
        if (condition) {
          el.removeAttribute("hidden");
        } else {
          el.setAttribute("hidden", "hidden");
        }
      });
    }
    function onWindowResize(){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    // const factor = .4;
    // const dimW = 1080*factor;
    // const dimH = 1920*factor;
    // const dimX = (windowWidth - dimW)/2;
    // const dimY = (windowHeight - dimH)/2;
    //
    // const dimW2 = dimW*.8;
    // const dimH2 = dimH*.8;
    // const dimX2 = (window.innerWidth - dimW2)/2;
    // const dimY2 = (windowHeight - dimH2)/2;
    //
    // const dimW3 = dimW2*.8;
    // const dimH3 = dimH2*.8;
    // const dimX3 = (window.innerWidth - dimW3)/2;
    // const dimY3 = (windowHeight - dimH3)/2;

    const gymUrl = window.AWS+"/jungleGyms/gym.mp4"
    return (
      <div className="JungleGyms Sketch">
          <div className="threeCanvas" ref={ref => (this.mount = ref)} />
          <video playsinline crossOrigin="anonymous" ref={ref => (this.videoGym = ref)} autoPlay muted loop className="gym" >
            <source src={gymUrl} type="video/mp4" ></source>
            Your browser does not support HTML5 video.
          </video>
          <video playsinline crossOrigin="anonymous" ref={ref => (this.videoSwings = ref)} autoPlay muted loop className="gym" >
            <source src={window.AWS+"/jungleGyms/swings.mp4"} type="video/mp4" ></source>
            Your browser does not support HTML5 video.
          </video>


          {/*getFrame(dimH, dimW, dimX, dimY, "", gym)*/}
          {/*getFrame(dimW2*.7, dimH2*.7, dimX2, dimY2, "jungle gyms", swings)*/}
          {/* "https://media.giphy.com/media/1dJTm6Ajepm3MWwyqw/giphy.gif"*/ }
          {/*<Frame title="" content={
            <img
            className={""}
            width={Math.floor(dimW*1.5) + "px"}
            height={Math.floor(dimW*1.5) + "px"}
            src={"https://media.giphy.com/media/3o85xz2zj0dKT56DxC/giphy-downsized.gif"}
            />
            }
            width={dimW*1.5} height={dimW*1.5} x={dimX} y={dimY}
            /> */}
            {/*getFrame(dimW*.5, dimH*.5, dimX, dimY, "jungle gyms", swings)*/}
            <Glasses />
        </div>
      )
    }
  }

  function getFrame(dimW, dimH, dimX, dimY, tit, vid) {
    return (
      <Frame title={tit} content={
          <ReactPlayer
            className={"react-player gym"}
            playing
            muted
            loop
            width={Math.floor(dimW) + "px"}
            height={Math.floor(dimH+1) + "px"}
            url={vid}
            />
        }
        width={dimW+2} height={dimH} x={dimX} y={dimY}
        />
    )
  }

  export default JungleGyms;
