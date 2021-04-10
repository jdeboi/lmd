import React from 'react';
import "./HardDrives.css";

import * as THREE from "three";
// import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water2.js';

// components
import Frame from '../../shared/Frame/Frame';
import Birds from './Birds';


// store
import { connect } from 'react-redux';
import { setSketchMusic } from '../../../store/actions/music';



var AnaglyphEffect = require('../../shared/3D/AnaglyphEffect')(THREE, true);



// var start;
// var changed = false;



class HardDrives extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            island: "https://www.google.com/maps/embed?pb=!4v1591730465198!6m8!1m7!1sCAoSLEFGMVFpcFBTYW9SYVFBMmR0QjhoeTVaSUs5R3lQaGJBNVB5dVhFQ2o0UVdW!2m2!1d-17.3611139!2d177.1339841!3f99.14217177224654!4f16.212409154729073!5f0.5970117501821992",
            urlIndex: 0,

        }
        // this.onRender = this.onRender.bind(this);

        this.trees = [];
        this.bottles = [];
        this.scaler = 4;
        this.seed = 13;

    }


    componentDidMount() {
        this.props.setSketchMusic("hardDrives", 0, .4);

        window.addEventListener('resize', this.handleWindowResize);
        this.setupScene();
        this.startAnimationLoop();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        if (this.controls)
            this.controls.dispose();
        // console.log("whats going on?");
    }

    handleWindowResize = () => {
        const width = window.innerWidth; //this.el.clientWidth;
        const height = window.innerHeight; //this.el.clientHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    };

    setupScene = () => {

        // const camera = new AnaglyphUniversalCamera("af_cam", new Vector3(0, 8 * this.scaler, -5 * this.scaler), 0.033, scene);
        // scene.clearColor = Color3.Black();
        // camera.setTarget(new Vector3(0, 8 * this.scaler, 0));

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        // this.camera.up = new THREE.Vector3(0,0,1);
        this.camera.position.set(0, 8 * this.scaler, -5 * this.scaler);
        this.camera.lookAt(new THREE.Vector3(0, 8 * this.scaler, 0));

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        this.mount.appendChild(this.renderer.domElement);


        this.effect = new AnaglyphEffect(this.renderer);
        this.effect.setSize(window.innerWidth, window.innerHeight);

        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.controls.minDistance = 1;
        // this.controls.maxDistance = 80;
        // this.controls.enablePan = false;

        var ambientLight = new THREE.AmbientLight(0xaaaaaa);
        this.scene.add(ambientLight);
        this.addLight(-10, 2, 4);
        this.addLight(1, -10, -2);


        this.addPalms();
        this.addSkybox();
        this.addBottles();
        this.addWater();
        this.addFloor();

    }

    startAnimationLoop = () => {


        if (this.controls)
            this.controls.update();
        this.effect.render(this.scene, this.camera);
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);

        for (let i = 0; i < this.trees.length; i++) {
            var sign = i % 2 === 0 ? 1 : -1;
            this.trees[i].rotation.y += .005 * sign;
        }

        for (let i = 0; i < this.bottles.length; i++) {
            this.bottles[i].position.y = .7 * Math.sin(new Date() / 600 + this.bottles[i].position.x / 60);
        }
    };

    addWater = () => {
        const waterGeometry = new THREE.PlaneGeometry(512 * this.scaler, 512 * this.scaler);

        const params = {
            color: '#ffffff',
            scale: 1,
            flowX: .21,
            flowY: .21
        };

        this.water = new Water(waterGeometry, {
            color: params.color,
            scale: params.scale,
            flowDirection: new THREE.Vector2(params.flowX, params.flowY),
            textureWidth: 1024,
            textureHeight: 1024
        });

        this.water.position.y = 1; //this.scaler;
        this.water.rotation.x = Math.PI * - 0.5;

        // this.water.material.uniforms['color'].value.set(0xffffff);
        // this.water.material.uniforms['config'].value.w = 4;
        // this.water.material.uniforms['flowDirection'].value.x = 1;
        // this.water.material.uniforms['flowDirection'].value.normalize();
        // this.water.material.uniforms['flowDirection'].value.y = 1;
        // this.water.material.uniforms['flowDirection'].value.normalize();

        this.scene.add(this.water);
    }

    addLight = (...pos) => {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(...pos);
        this.scene.add(light);
    }

    addSkybox = () => {
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            window.AWS + "/hardDrives/skybox/skybox_px.jpg",
            window.AWS + "/hardDrives/skybox/skybox_nx.jpg",
            window.AWS + "/hardDrives/skybox/skybox_py.jpg",
            window.AWS + "/hardDrives/skybox/skybox_ny.jpg",
            window.AWS + "/hardDrives/skybox/skybox_pz.jpg",
            window.AWS + "/hardDrives/skybox/skybox_nz.jpg",
        ]);
        this.scene.background = texture;
    }

    addFloor = () => {
        // FLOOR
        var floorTexture = new THREE.TextureLoader().load(window.AWS + "/shared/black_sand.jpg");
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set(20.0, 20.0);
        this.floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.BackSide });
        var floorGeometry = new THREE.PlaneGeometry(1000, 1500, 10, 10);
        var floor = new THREE.Mesh(floorGeometry, this.floorMaterial);
        floor.position.y = -3;
        floor.rotation.x = Math.PI / 2;
        floor.position.z = - 200
        this.scene.add(floor);
    }


    addPalms = () => {
        var self = this;
        var modelPath = window.AWS + "/hardDrives/palm/";
        var model = "QueenPalmTree";
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
                    .load(model + '.obj', function (tree) {
                        let positions = [{ x: -5, y: 0, z: -2 }, { x: 5, y: 0, z: -2 }, { x: 4, y: 0, z: -10 }, { x: -4, y: 0, z: -10 }]

                        tree.rotation.y = 0;
                        tree.scale.set(self.scaler, self.scaler, self.scaler);
                        tree.position.x = positions[0].x * self.scaler;
                        tree.position.y = positions[0].y * self.scaler;
                        tree.position.z = positions[0].z * self.scaler;
                        self.trees.push(tree);
                        self.scene.add(tree);

                        for (let i = 1; i < positions.length; i++) {
                            let copy = tree.clone();
                            copy.rotation.y = Math.PI * 1.5;
                            copy.position.x = positions[i].x * self.scaler;
                            copy.position.z = positions[i].z * self.scaler;
                            self.trees.push(copy);
                            self.scene.add(copy);
                        }

                    }, onProgress, onError);

            });

        //
    }

    addBottles = () => {
        var self = this;
        var modelPath = window.AWS + "/hardDrives/Corona/"
        var model = "Corona2";
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
                    .load(model + '.obj', function (bottle) {
                        let bottleVectors = [
                            {},
                            { "id": 0, "pos": { "x": 88, "y": 0, "z": 128 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 1, "pos": { "x": 38, "y": 0, "z": 78 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 2, "pos": { "x": 68, "y": 0, "z": 108 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 3, "pos": { "x": 0, "y": 0, "z": 108 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 4, "pos": { "x": -88, "y": 0, "z": 98 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 5, "pos": { "x": -78, "y": 0, "z": 68 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 6, "pos": { "x": 3, "y": 0, "z": 148 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 7, "pos": { "x": 4, "y": 0, "z": 28 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 8, "pos": { "x": -40, "y": 0, "z": -98 }, "rot": { "x": 0, "y": 0, "z": 0 } }, // back
                            { "id": 8, "pos": { "x": -70, "y": 0, "z": 98 }, "rot": { "x": 0, "y": 0, "z": 0 } },

                            // back (repeat)
                            { "id": 0, "pos": { "x": 88, "y": 0, "z": -128 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 1, "pos": { "x": 38, "y": 0, "z": -78 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 2, "pos": { "x": 68, "y": 0, "z": -108 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 3, "pos": { "x": 0, "y": 0, "z": -108 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 4, "pos": { "x": -88, "y": 0, "z": -98 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 5, "pos": { "x": -78, "y": 0, "z": -68 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 6, "pos": { "x": 3, "y": 0, "z": -148 }, "rot": { "x": 0, "y": 0, "z": 0 } },


                            // left
                            { "id": 0, "pos": { "x": 188, "y": 0, "z": 48 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 1, "pos": { "x": 138, "y": 0, "z": 28 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 2, "pos": { "x": 168, "y": 0, "z": 0 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 3, "pos": { "x": 100, "y": 0, "z": -20 }, "rot": { "x": 0, "y": 0, "z": 0 } },


                            // right
                            { "id": 0, "pos": { "x": -188, "y": 0, "z": 30 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 1, "pos": { "x": -138, "y": 0, "z": 20 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 2, "pos": { "x": -168, "y": 0, "z": 0 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                            { "id": 3, "pos": { "x": -100, "y": 0, "z": -18 }, "rot": { "x": 0, "y": 0, "z": 0 } },
                        ]

                        // bottle.rotation.y = 0;
                        // bottle.scale.set(self.scaler, self.scaler, self.scaler);
                        // bottle.position.x = bottleVectors[0].x * self.scaler;
                        // bottle.position.y = positions[0].y * self.scaler;
                        // bottle.position.z = positions[0].z * self.scaler;
                        // self.trees.push(tree);
                        // self.scene.add(tree);

                        for (let i = 1; i < bottleVectors.length; i++) {
                            let copy = bottle.clone();
                            copy.rotation.y = self.getRandom() * Math.PI * 2;
                            copy.rotation.x = Math.PI;
                            copy.rotation.z = (-.3 + self.getRandom() * .6);
                            copy.position.y = 2; //Math.abs((Math.sin(((x / 0.05) + time * water.waveSpeed)) * water.waveHeight * water.windDirection.x * 5.0) + (Math.cos(((z / 0.05) +  time * water.waveSpeed)) * water.waveHeight * water.windDirection.y * 5.0));

                            copy.position.x = bottleVectors[i].pos.x;
                            // copy.position.y = bottleVectors[i].pos.y;
                            copy.position.z = bottleVectors[i].pos.z;

                            self.bottles.push(copy);
                            self.scene.add(copy);

                        }

                    }, onProgress, onError);

            });

        //
    }

    getRandom = () => {
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    // addPalms = (scene) => {
    //     var container = new AssetContainer(scene);
    //     var url = window.AWS + "/hardDrives/palm/";
    //     const gThis = this;
    //     SceneLoader.LoadAssetContainer(url, "QueenPalmTree.obj", scene, function (container) {
    //         var meshes = container.meshes;

    //         let positions = [{ x: -5, y: 0, z: -2 }, { x: 5, y: 0, z: -2 }, { x: 4, y: 0, z: -10 }, { x: -4, y: 0, z: -10 }]

    //         meshes[1].rotation.y = 0;
    //         meshes[1].scaling = new Vector3(gThis.scaler, gThis.scaler, gThis.scaler);
    //         meshes[1].position.x = positions[0].x * gThis.scaler;
    //         meshes[1].position.y = positions[0].y * gThis.scaler;
    //         meshes[1].position.z = positions[0].z * gThis.scaler;

    //         gThis.trees.push(meshes[1]);

    //         container.addAllToScene();  // Adds all elements to the scene
    //         gThis.water.addToRenderList(gThis.trees[0]);

    //         for (let i = 1; i < positions.length; i++) {
    //             let copy = container.instantiateModelsToScene().rootNodes[1];
    //             copy.rotation.y = Math.PI * 1.5;
    //             copy.position.x = positions[i].x * gThis.scaler;
    //             copy.position.z = positions[i].z * gThis.scaler;
    //             gThis.trees.push(copy);
    //             gThis.water.addToRenderList(copy);
    //         }

    //     });

    // }



    render() {
        const { ui } = this.props;
        const svFrame = {};
        let f = .8;
        if (ui.contentW >= 1920)
            f = 1.3;
        const ogW = 600 * f;
        const ogH = 450 * .8 * f;
        svFrame.w = ogW;
        svFrame.h = ogH;
        svFrame.x = (ui.contentW - svFrame.w) * .27;
        svFrame.y = (ui.contentH - svFrame.h - 30) * .5;

        if (ui.hasFooter || ui.isMobile) {
            if (ui.orientation === "portrait") {
                let wTemp = ui.width - 40;
                if (wTemp < ogW) {
                    svFrame.w = wTemp; // Math.min(ui.width-40, ogW);
                    svFrame.h = svFrame.h * (svFrame.w / ogW);
                    svFrame.y = 20; //ui.headerH + 50;
                    svFrame.x = 18;
                }
                else {
                    svFrame.x = (ui.width - svFrame.w - 4) / 2;

                }
                svFrame.y = ui.height / 2 - svFrame.h * .8;
            }
            else {
                const factor = ui.height / 500;

                if (factor < 1) {
                    svFrame.h *= ui.height / 500;
                    svFrame.w *= ui.height / 500;
                    svFrame.y = 10; //ui.headerH + 20;
                    svFrame.x = 50;
                }

            }
        }

        const title = "";// (ui.isMobile || ui.hasFooter) ? "": "hard drives on seashores";

        return (
            <div className="HardDrives Sketch">

                <div className="threeCanvas" ref={ref => (this.mount = ref)} />
                <Frame title={title} content={
                    <iframe title="island view" src={this.state.island} width={svFrame.w} height={svFrame.h} frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                }
                    width={svFrame.w} height={svFrame.h} x={svFrame.x} y={svFrame.y}
                />
                <Birds />
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
        // doneLoadingApp
        setSketchMusic
    }
}


export default connect(mapStateToProps, mapDispatchToProps())(HardDrives);
