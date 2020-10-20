import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import './Oogle.css';
import {AnaglyphEffect} from 'three/examples/jsm/effects/AnaglyphEffect';
// var AnaglyphEffect = require('./assets/AnaglyphEffect')(THREE);

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';
import { VertexTangentsHelper } from 'three/examples/jsm/helpers/VertexTangentsHelper.js';

import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe.js';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2.js';

class Oogle extends Component {

  constructor(props) {
    super(props);

    this.mount = React.createRef();
  }

  componentDidMount() {

    var scene, renderer;
    var effect;
    var camera, light;
    var vnh;
    var vth;
    var object;
    var wireframe, wireframe1;
    var matLine, matLineBasic, matLineDashed;
    var controls;

    init(this.mount);
    animate();

    function init(mount) {

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      mount.appendChild( renderer.domElement );

      //

      camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
      camera.position.z = 400;

      renderer.setClearColor (0xffff00, 1);

      scene = new THREE.Scene();

      light = new THREE.PointLight();
      light.position.set( 200, 100, 150 );
      scene.add( light );

      scene.add( new THREE.PointLightHelper( light, 15 ) );

      effect = new AnaglyphEffect( renderer);
      effect.setSize( window.innerWidth, window.innerHeight );

      var gridHelper = new THREE.GridHelper( 400, 40, 0x0000ff, 0x808080 );
      gridHelper.position.y = - 150;
      gridHelper.position.x = - 150;
      scene.add( gridHelper );

      var polarGridHelper = new THREE.PolarGridHelper( 200, 16, 8, 64, 0x0000ff, 0x808080 );
      polarGridHelper.position.y = - 150;
      polarGridHelper.position.x = 200;
      scene.add( polarGridHelper );

      ///////////// WIREFRAME OBJ
      // manager
      function loadModel() {
        object.traverse( function ( child ) {
          if ( child.isMesh ) {

            var uniforms = { 'widthFactor': { value: 2 } };

            var material = new THREE.ShaderMaterial( {
              uniforms: uniforms,
              vertexShader: vertexShader(),
              fragmentShader: fragmentShader(),
              side: THREE.DoubleSide

            } );

            material.extensions.derivatives = true;
            child.geometry.deleteAttribute( 'normal' );
            child.geometry.deleteAttribute( 'uv' );
            child.material = material;
            setupAttributes( child.geometry );

            // mesh2 = new THREE.Mesh( object, material );
            // mesh2.position.set( 40, 0, 0 );

            // scene.add( mesh2 );
          }
        } );
        object.position.y = - 5;
        object.scale.set(105, 105, 105);

        scene.add( object );
      }
      var manager = new THREE.LoadingManager( loadModel );
      manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
      };
      // model
      function onProgress( xhr ) {
        if ( xhr.lengthComputable ) {
          var percentComplete = xhr.loaded / xhr.total * 100;
          console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
        }
      }
      function onError() {}
      var loader = new OBJLoader( manager );
      loader.load( window.AWS + '/hardDrives/palm/QueenPalmTree.obj', function ( obj ) {
        object = obj;
      }, onProgress, onError );

      /////////// WIREFRAME GEOMETRY
      // Wireframe ( WireframeGeometry2, LineMaterial )
      var geo = new THREE.IcosahedronBufferGeometry( 20, 1 );
      var geometry = new WireframeGeometry2( geo );
      matLine = new LineMaterial( {
        color: 0x4080ff,
        linewidth: 5, // in pixels
        //resolution:  // to be set by renderer, eventually
        dashed: false
      } );
      wireframe = new Wireframe( geometry, matLine );
      wireframe.computeLineDistances();
      wireframe.scale.set( 30, 30, 30 );
      scene.add( wireframe );

      // skybox
      // var path = window.AWS + "/hardDrives/skybox/skybox_";
      // var format = '.jpg';
      // var urls = [
      //   path + 'px' + format, path + 'nx' + format,
      //   path + 'py' + format, path + 'ny' + format,
      //   path + 'pz' + format, path + 'nz' + format
      // ];
      // var textureCube = new THREE.CubeTextureLoader().load( urls );
      // scene.background = textureCube;


      // window.addEventListener( 'resize', onWindowResize, false );

    }


    // function onWindowResize() {
    //
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    //
    //   renderer.setSize( window.innerWidth, window.innerHeight );
    //
    // }

    function animate() {

      requestAnimationFrame( animate );

      var time = - performance.now() * 0.0003;

      camera.position.x = 400 * Math.cos( time );
      camera.position.z = 400 * Math.sin( time );
      camera.lookAt( scene.position );

      light.position.x = Math.sin( time * 1.7 ) * 300;
      light.position.y = Math.cos( time * 1.5 ) * 400;
      light.position.z = Math.cos( time * 1.3 ) * 300;

      if ( vnh ) vnh.update();
      if ( vth ) vth.update();

      // renderer will set this eventually
      matLine.resolution.set( window.innerWidth, window.innerHeight ); // resolution of the viewport


      effect.render( scene, camera );
      // renderer.render(scene, camera);

    }


    function setupAttributes( geometry ) {

      var vectors = [
        new THREE.Vector3( 1, 0, 0 ),
        new THREE.Vector3( 0, 1, 0 ),
        new THREE.Vector3( 0, 0, 1 )
      ];

      var position = geometry.attributes.position;
      var centers = new Float32Array( position.count * 3 );

      for ( var i = 0, l = position.count; i < l; i ++ ) {

        vectors[ i % 3 ].toArray( centers, i * 3 );

      }

      geometry.setAttribute( 'center', new THREE.BufferAttribute( centers, 3 ) );

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

  }


  render() {
    return (
      <div className="Three" ref={ref => (this.mount = ref)} />
    )
  }
}

export default Oogle;
