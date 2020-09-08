import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import './Three.css';

var AnaglyphEffect = require('./assets/AnaglyphEffect')(THREE);



class Three extends Component {

  constructor(props) {
    super(props);

    this.mount = React.createRef();
  }

  componentDidMount() {
    // === THREE.JS CODE START ===

    var scene, camera, renderer, effect;
    var spheres = [];

    var init = function(mount) {
      scene = new THREE.Scene();

      // var width = 812; //window.innerWidth || 2;
      // var height = 612; //window.innerHeight || 2;
      var width = window.innerWidth || 2;
      var height = window.innerHeight || 2;

      camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
      renderer = new THREE.WebGLRenderer();
      renderer.setSize( width, height );
      mount.appendChild( renderer.domElement );


      const path = process.env.PUBLIC_URL+"/assets/three/3D/hole.jpg";
      effect = new AnaglyphEffect( renderer, path, width, height);
      effect.setSize( width, height );
      // effect.setSize( 512, 512 );

      // TODO effect.setSize( window.innerWidth, window.innerHeight );
    }

    var init2 = function() {
      var path = process.env.PUBLIC_URL + "/assets/three/pisa/";
      var format = '.png';
      var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ];

      var textureCube = new THREE.CubeTextureLoader().load( urls );
      var geometry = new THREE.SphereBufferGeometry( 0.1, 32, 16 );
      var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

      for ( var i = 0; i < 500; i ++ ) {

        var mesh = new THREE.Mesh( geometry, material );

        mesh.position.x = Math.random() * 10 - 5;
        mesh.position.y = Math.random() * 10 - 5;
        mesh.position.z = Math.random() * 100 - 100;

        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

        scene.add( mesh );

        spheres.push( mesh );

      }
    }

    var animate = function () {
      requestAnimationFrame( animate );

      var timer = 0.0001 * Date.now();
      for ( var i = 0, il = spheres.length; i < il; i ++ ) {
        var sphere = spheres[ i ];
        sphere.position.x = 5 * Math.cos( timer + i );
        sphere.position.y = 5 * Math.sin( timer + i * 1.1 );

      }
      // renderer.render( scene, camera );
      effect.render( scene, camera );
    };


    init(this.mount);
    init2();
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  render() {
    return (
      <div className="Three" ref={ref => (this.mount = ref)} />
    )
  }
}

export default Three;
