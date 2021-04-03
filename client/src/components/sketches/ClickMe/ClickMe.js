import React from 'react';
import "./ClickMe.css";

import Pulse from './components/Pulse/Pulse';
import EmojiMonitor from './components/EmojiMonitor/EmojiMonitor';
import Rose from './components/Rose/Rose';
import { getDim } from './components/EmojiMonitor/Helper';

// import Chat from './old/Chat';
import Frame from '../../shared/Frame/Frame';
import { constrain, mapVal } from '../../shared/Helpers/Helpers';

// store
import { connect } from 'react-redux';
import { doneLoadingApp } from '../../../store/actions';

import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import { LightningStrike } from 'three/examples/jsm/geometries/LightningStrike.js';
import { LightningStorm } from 'three/examples/jsm/objects/LightningStorm.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';


var AnaglyphEffect = require('../../shared/3D/AnaglyphEffect')(THREE);
var mouse;
var heartRate = 60;
var heartVelocity = 0;
var heartAcceleration = -.01;
var heartTotal = 0;
const maxHeart = 400;
// var lastPump = new Date();

class ClickMe extends React.Component {


    constructor(props) {
        super(props);

        this.mount = React.createRef();

        this.state = {
            cursor: 0,
            // heartRate: 60,
            // lastPump: new Date(),
            heartSz: 1,
            hR: heartRate,
            hT: 0,
            pulse: 0
        }
    }


    componentDidMount() {

        this.interval = setInterval(this.setHeart, 20);
        this.props.addClass("clickMe");
        let container, stats;
        let width, height;
        let scene, renderer, composer, gui;
        let anaglyphEffect;
        let currentSceneIndex = 0;
        let currentTime = 0;
        // let comps = [];
        let blinds = [];
        let ground;
        let blindsTexture;
        let heart;
        let face;
        // let heartRate = 60;
        let showLightning = true;

        // this.heartInterval = setInterval(this.heartPump, 50);

        const sceneCreators = [
            // createConesScene,
            createPlasmaBallScene,
            // createStormScene
        ];

        const clock = new THREE.Clock();

        const raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        mouse.x = -1;
        mouse.y = 0;
        mouse.z = 0;

        init(this.mount);
        animate();

        // this.interval2 = setTimeout(() => {
        //     // showLightning = true;
        // }, 7000);

        function init(mount) {

            // container = document.getElementById('container');
            // renderer = new THREE.WebGLRenderer();
            // renderer.setPixelRatio(window.devicePixelRatio);
            // renderer.setSize(window.innerWidth, window.innerHeight);
            // renderer.outputEncoding = THREE.sRGBEncoding;
            // container.appendChild(renderer.domElement);
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            mount.appendChild(renderer.domElement);

            var width = window.innerWidth || 2;
            var height = window.innerHeight || 2;
            anaglyphEffect = new AnaglyphEffect(renderer, width, height);
            anaglyphEffect.setSize(width, height);

            composer = new EffectComposer(renderer);



            // stats = new Stats();
            // container.appendChild(stats.dom);

            // window.addEventListener('resize', onWindowResize);

            createScene();
            initFace();
            // initComputers();
            initJar();
            // initArm();
            initHeart();
            initGround();
        }

        function createScene() {

            scene = sceneCreators[currentSceneIndex]();

            createGUI();

        }

        function onWindowResize() {
            scene.userData.camera.aspect = window.innerWidth / window.innerHeight;
            scene.userData.camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

            composer.setSize(window.innerWidth, window.innerHeight);
            anaglyphEffect.setSize(window.innerWidth, window.innerHeight);
        }

        //

        function createGUI() {

            if (gui) {

                gui.destroy();

            }

            gui = new GUI({ width: 350 });
            gui.hide();
            const sceneFolder = gui.addFolder("Scene");

            scene.userData.sceneIndex = currentSceneIndex;

            sceneFolder.add(scene.userData, 'sceneIndex', { "Electric Cones": 0, "Plasma Ball": 1, "Storm": 2 }).name('Scene').onChange(function (value) {

                currentSceneIndex = value;

                createScene();

            });

            scene.userData.timeRate = 1;
            sceneFolder.add(scene.userData, 'timeRate', scene.userData.canGoBackwardsInTime ? - 1 : 0, 1).name('Time rate');

            sceneFolder.open();

            const graphicsFolder = gui.addFolder("Graphics");

            graphicsFolder.add(scene.userData, "outlineEnabled").name("Glow enabled");

            scene.userData.lightningColorRGB = [
                scene.userData.lightningColor.r * 255,
                scene.userData.lightningColor.g * 255,
                scene.userData.lightningColor.b * 255
            ];
            graphicsFolder.addColor(scene.userData, 'lightningColorRGB').name('Color').onChange(function (value) {

                scene.userData.lightningMaterial.color.setRGB(value[0], value[1], value[2]).multiplyScalar(1 / 255);

            });
            scene.userData.outlineColorRGB = [
                scene.userData.outlineColor.r * 255,
                scene.userData.outlineColor.g * 255,
                scene.userData.outlineColor.b * 255
            ];
            graphicsFolder.addColor(scene.userData, 'outlineColorRGB').name('Glow color').onChange(function (value) {

                scene.userData.outlineColor.setRGB(value[0], value[1], value[2]).multiplyScalar(1 / 255);

            });

            graphicsFolder.open();

            const rayFolder = gui.addFolder("Ray parameters");

            rayFolder.add(scene.userData.rayParams, 'straightness', 0, 1).name('Straightness');
            rayFolder.add(scene.userData.rayParams, 'roughness', 0, 1).name('Roughness');
            rayFolder.add(scene.userData.rayParams, 'radius0', 0.1, 10).name('Initial radius');
            rayFolder.add(scene.userData.rayParams, 'radius1', 0.1, 10).name('Final radius');
            rayFolder.add(scene.userData.rayParams, 'radius0Factor', 0, 1).name('Subray initial radius');
            rayFolder.add(scene.userData.rayParams, 'radius1Factor', 0, 1).name('Subray final radius');
            rayFolder.add(scene.userData.rayParams, 'timeScale', 0, 5).name('Ray time scale');
            rayFolder.add(scene.userData.rayParams, 'subrayPeriod', 0.1, 10).name('Subray period (s)');
            rayFolder.add(scene.userData.rayParams, 'subrayDutyCycle', 0, 1).name('Subray duty cycle');

            if (scene.userData.recreateRay) {

                // Parameters which need to recreate the ray after modification

                const raySlowFolder = gui.addFolder("Ray parameters (slow)");

                raySlowFolder.add(scene.userData.rayParams, 'ramification', 0, 15).step(1).name('Ramification').onFinishChange(function () {

                    scene.userData.recreateRay();

                });

                raySlowFolder.add(scene.userData.rayParams, 'maxSubrayRecursion', 0, 5).step(1).name('Recursion').onFinishChange(function () {

                    scene.userData.recreateRay();

                });

                raySlowFolder.add(scene.userData.rayParams, 'recursionProbability', 0, 1).name('Rec. probability').onFinishChange(function () {

                    scene.userData.recreateRay();

                });

                raySlowFolder.open();

            }

            rayFolder.open();

        }

        //

        function animate() {
            requestAnimationFrame(animate);

            render();
            // stats.update();

        }

        function render() {
            if (window.innerWidth !== width || window.innerHeight !== height) {
                width = window.innerWidth;
                height = window.innerHeight;
                onWindowResize();
            }

            currentTime += scene.userData.timeRate * clock.getDelta();

            if (currentTime < 0) {

                currentTime = 0;

            }


            heartPump();

            scene.userData.render(currentTime);
            if (scene.userData.rayParams.ramification) {
                let ram = Math.floor(mapVal(heartRate, 30, maxHeart, 1, 12));
                if (ram !== scene.userData.rayParams.ramification) {
                    scene.userData.rayParams.ramification = ram;
                    scene.userData.recreateRay();
                }

            }
            // if (scene.userData.lightningMaterial.color){
            //     let r = 0;
            //     let g = 255;
            //     let b = 0;
            //     // if (heartRate >= 400) {
            //         // r = Math.random()*155 + 100;
            //         // g = Math.random()*155 + 100;
            //         // b = Math.random()*155 + 100; //Math.random()*255
            //     // }
            //     // let per = mapVal(heartRate, 30, maxHeart, 0, 1);
            //     scene.userData.lightningMaterial.color.setRGB(r, g, b).multiplyScalar(1 / 255);
            // }

            if (blinds[0]) {
                // blindsTexture.offset.set(0, (new Date()/5000)%1);
                // ground.material.map.needsUpdate = true;
                const hr = mapVal(heartRate, 30, maxHeart, .2, 8);
                for (const blind of blinds) {
                    blind.position.y += hr;
                    if (blind.position.y > 2000)
                        blind.position.y = -2000;
                }
            }
        }

        function createOutline(scene, objectsArray, visibleColor) {

            const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, scene.userData.camera, objectsArray);
            outlinePass.edgeStrength = 2.5;
            outlinePass.edgeGlow = 0.7;
            outlinePass.edgeThickness = 2.8;
            outlinePass.visibleEdgeColor = visibleColor;
            outlinePass.hiddenEdgeColor.set(0);
            composer.addPass(outlinePass);

            scene.userData.outlineEnabled = true;

            return outlinePass;

        }

        //



        //

        function createPlasmaBallScene() {

            const scene = new THREE.Scene();

            scene.userData.canGoBackwardsInTime = true;

            scene.userData.camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 10, 50000);

            const ballScene = new THREE.Scene();
            ballScene.background = new THREE.Color(0x454545);

            // Lights

            const ambientLight = new THREE.AmbientLight(0x444444);
            scene.add(ambientLight);

            const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
            light1.position.set(1, 1, 1);
            scene.add(light1);

            const light2 = new THREE.DirectionalLight(0xffffff, 1.5);
            light2.position.set(- 0.5, 1, 0.2);
            scene.add(light2);

            // const light3 = new THREE.DirectionalLight(0xffffff, 1.5);
            // light3.position.set(- 0.5, 100, -200);
            // scene.add(light3);

            // Plasma ball

            scene.userData.lightningColor = new THREE.Color(0x00FF00);
            scene.userData.outlineColor = new THREE.Color(0x00FF00);

            scene.userData.lightningMaterial = new THREE.MeshBasicMaterial({ color: scene.userData.lightningColor, side: THREE.DoubleSide });



            const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xdddddd, specular: 0x009900, shininess: 30 });

            const sphereHeight = 300;
            const sphereRadius = 800;

            scene.userData.camera.position.set(0, 2 * sphereHeight, 8 * 200);

            const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(sphereRadius, 80, 40), sphereMaterial);
            sphereMesh.position.set(0, sphereHeight, 0);
            // scene.add(sphereMesh);

            const sphere = new THREE.Sphere(sphereMesh.position, sphereRadius);

            // const spherePlasma = new THREE.Mesh(new THREE.SphereGeometry(sphereRadius * 0.05, 24, 12), scene.userData.lightningMaterial);
            // spherePlasma.position.copy(sphereMesh.position);
            // spherePlasma.scale.y = 0.6;
            // scene.add(spherePlasma);

            // const post = new THREE.Mesh(
            //     new THREE.CylinderGeometry(sphereRadius * 0.06, sphereRadius * 0.06, sphereHeight, 6, 1, true),
            //     new THREE.MeshLambertMaterial({ color: 0x020202 })
            // );
            // post.position.y = sphereHeight * 0.5 - sphereRadius * 0.05 * 1.2;
            // scene.add(post);

            // const box = new THREE.Mesh(new THREE.BoxGeometry(sphereHeight * 0.5, sphereHeight * 0.1, sphereHeight * 0.5), post.material);
            // box.position.y = sphereHeight * 0.05 * 0.5;
            // scene.add(box);

            const rayDirection = new THREE.Vector3();
            let rayLength = 0;
            const vec1 = new THREE.Vector3();
            const vec2 = new THREE.Vector3();

            const start = { ...sphereMesh.position };
            start.z = -200;
            scene.userData.rayParams = {

                sourceOffset: start, //sphereMesh.position,
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
                ramification: 2,
                recursionProbability: 0.8,

                roughness: 0.85,
                straightness: 0.7,

                onSubrayCreation: function (segment, parentSubray, childSubray, lightningStrike) {

                    lightningStrike.subrayConePosition(segment, parentSubray, childSubray, 0.6, 0.9, 0.7);

                    // THREE.Sphere projection

                    vec1.subVectors(childSubray.pos1, lightningStrike.rayParameters.sourceOffset);
                    vec2.set(0, 0, 0);

                    if (lightningStrike.randomGenerator.random() < 0.7) {

                        vec2.copy(rayDirection).multiplyScalar(rayLength * 1.0865);

                    }

                    vec1.add(vec2).setLength(rayLength);
                    childSubray.pos1.addVectors(vec1, lightningStrike.rayParameters.sourceOffset);

                }

            };

            scene.userData.rayParams2 = { ...scene.userData.rayParams };
            let lightningStrike;
            let lightningStrikeMesh;
            let lightningStrike2;
            let lightningStrikeMesh2;
            const outlineMeshArray = [];
            const outlineMeshArray2 = [];

            scene.userData.recreateRay = function () {

                if (lightningStrikeMesh) {
                    scene.remove(lightningStrikeMesh);
                }
                // if (lightningStrikeMesh2)
                //     scene.remove(lightningStrikeMesh2);

                lightningStrike = new LightningStrike(scene.userData.rayParams);
                lightningStrikeMesh = new THREE.Mesh(lightningStrike, scene.userData.lightningMaterial);


                ;
                // lightningStrike2 = new LightningStrike(scene.userData.rayParams2);
                // lightningStrikeMesh2 = new THREE.Mesh(lightningStrike2, scene.userData.lightningMaterial);

                // outlineMeshArray.length = 0;
                // outlineMeshArray.push(lightningStrikeMesh);


                scene.add(lightningStrikeMesh);
                // scene.add(lightningStrikeMesh2);

            };


            scene.userData.recreateRay();

            // Compose rendering

            composer.passes = [];

            composer.addPass(new RenderPass(ballScene, scene.userData.camera));

            const rayPass = new RenderPass(scene, scene.userData.camera);
            rayPass.clear = false;
            composer.addPass(rayPass);

            const outlinePass = createOutline(scene, outlineMeshArray, scene.userData.outlineColor);

            scene.userData.render = function (time) {

                rayDirection.subVectors(lightningStrike.rayParameters.destOffset, lightningStrike.rayParameters.sourceOffset);
                rayLength = rayDirection.length();
                rayDirection.normalize();

                if (showLightning)
                    lightningStrike.update(time);
                // lightningStrike2.update(time);


                // controls.update();

                checkIntersection(mouse);

                outlinePass.enabled = false; //scene.userData.outlineEnabled;

                // composer.render();
                anaglyphEffect.render(scene, scene.userData.camera);
            };


            // Controls

            const controls = new OrbitControls(scene.userData.camera, renderer.domElement);
            controls.target.copy(sphereMesh.position);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.update();
            controls.enabled = false;
            // THREE.Sphere mouse raycasting

            // container.style.touchAction = 'none';
            // container.addEventListener('pointermove', onPointerMove);



            const intersection = new THREE.Vector3();
            // this.interval = setInterval(changeComputer, 3000);

            // function changeComputer() {
            //     let i = Math.floor(Math.random() * comps.length);
            //     if (comps[i])
            //         lightningStrike2.rayParameters.destOffset = comps[i].position;
            // }

            function checkIntersection(mouse) {
                raycaster.setFromCamera(mouse, scene.userData.camera);
                intersection.z = 1000;
                const result = raycaster.ray.intersectSphere(sphere, intersection);

                if (result !== null) {

                    lightningStrike.rayParameters.destOffset.copy(intersection);

                }

            }

            return scene;

        }

        //

        function initGround() {
            const GROUND_SIZE = 1000;

            blindsTexture = new THREE.TextureLoader().load("/assets/s3-bucket/clickMe/blinds.jpeg");
            blindsTexture.wrapS = THREE.RepeatWrapping;
            blindsTexture.wrapT = THREE.RepeatWrapping;
            blindsTexture.repeat.set( 2, 2 );
            blindsTexture.offset.set(0, 0);
            
            const groundMat = new THREE.MeshLambertMaterial({ color: 0x6071a6, transparent: true, opacity: .7, map: blindsTexture });
            const z = -400;
            blinds[0] = new THREE.Mesh(new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE), groundMat);
            blinds[0].position.z = z;
            blinds[0].position.y = 1000;
            scene.add(blinds[0]);
           
            blinds[1] = new THREE.Mesh(new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE), groundMat);
            blinds[1].position.z = z;
            blinds[1].position.y = 0;
            scene.add(blinds[1]);
            
            blinds[2] = new THREE.Mesh(new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE), groundMat);
            blinds[2].position.z = z;
            blinds[2].position.y = -1000;
            scene.add(blinds[2]);

            blinds[3] = new THREE.Mesh(new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE), groundMat);
            blinds[3].position.z = z;
            blinds[3].position.y = -2000;
            scene.add(blinds[3]);

            // ground.position.z -= 400;
            // ground.position.y += 400;

            scene.add(ground);

        }

        function initArm() {
            const url = "/assets/s3-bucket/clickMe/models/arm/tinker.obj";
            const objLoader = new OBJLoader();
            objLoader.load(url, (root) => {
                var arm = root;
                var mat = new THREE.MeshLambertMaterial({ color: 0xdd0000 });
                arm.material = mat;
                const sc = 6;
                arm.scale.set(sc, sc, sc);
                arm.rotation.x = -.4;
                arm.rotation.y = .8;
                arm.rotation.z = Math.PI + 1.2;
                arm.position.set(100, 250, -530);

                scene.add(arm);

            });
            // const url = "/assets/s3-bucket/clickMe/models/skeleton/tinker.obj";
            // const objLoader = new OBJLoader();
            // objLoader.load(url, (root) => {
            //     var arm = root;
            //     var mat = new THREE.MeshLambertMaterial({ color: 0xdd0000 });
            //     arm.material = mat;
            //     const sc = 20;
            //     arm.scale.set(sc, sc, sc);
            //     // arm.rotation.x = -Math.PI / 2;
            //     // arm.rotation.z = Math.PI;
            //     arm.position.set(-1000, 800, -1000);

            //     scene.add(arm);

            // });
        }



        function initFace() {
            const url = "/assets/s3-bucket/clickMe/models/face/blockydebb.obj";
            const objLoader = new OBJLoader();
            objLoader.load(url, (root) => {
                face = root;
                var mat = new THREE.MeshLambertMaterial({ color: 0xdd0000 });
                face.material = mat;
                const sc = 1.4;
                face.scale.set(sc, sc, sc);
                face.rotation.x = -Math.PI / 2;
                face.rotation.y = -.1;
                face.rotation.z = 2.1;
                face.position.set(-60, 250, -110);

                scene.add(face);

            });
        }

        // function initComputers() {
        //     const MTLFile = "/assets/s3-bucket/clickMe/models/computer/materials.mtl";
        //     const url = "/assets/s3-bucket/clickMe/models/computer/model2.obj";

        //     new MTLLoader()
        //         .load(MTLFile, function (materials) {
        //             materials.preload();
        //             const objLoader = new OBJLoader();
        //             objLoader.setMaterials(materials);
        //             objLoader.load(url, (root) => {
        //                 var comp = root;
        //                 // var mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
        //                 // comp.material = mat;
        //                 const sc = 1000;
        //                 comp.scale.set(sc, sc, sc);
        //                 // comp.rotation.x = -Math.PI / 2;
        //                 // comp.rotation.z = Math.PI;

        //                 let spread = 1000;
        //                 let y = 7;
        //                 let x = -200; //Math.random() * spread - spread / 2;
        //                 let z = -800;//Math.random() * spread - spread / 2
        //                 comp.rotation.y = Math.PI;
        //                 comp.position.set(x, y, z);
        //                 comps.push(comp);
        //                 scene.add(comp);

        //                 // for (let i = 0; i < 10; i++) {
        //                 //     var comp2 = comp.clone();
        //                 //     let x = Math.random() * spread - spread / 2;
        //                 //     let z = Math.random() * spread - spread / 2
        //                 //     comp2.rotation.y = Math.random() * Math.PI * 2;
        //                 //     comp2.position.set(x, y, z);
        //                 //     comps.push(comp2);
        //                 //     // this.hercules.push(hercules);
        //                 //     scene.add(comp2);
        //                 // }

        //             });
        //         });

        // }


        function initJar() {
            const MTLFile = "/assets/s3-bucket/clickMe/models/jar/materials.mtl";
            const url = "/assets/s3-bucket/clickMe/models/jar/model.obj";

            const objLoader = new OBJLoader();
            objLoader.load(url, (root) => {
                var comp = root;
                // var mat = new THREE.MeshLambertMaterial({ 
                //     color: 0xffffff 
                // });
                // comp.material = mat;
                const r = "/assets/s3-bucket/clickMe/textures/Bridge2/";
                const urls = [r + "posx.jpg", r + "negx.jpg",
                r + "posy.jpg", r + "negy.jpg",
                r + "posz.jpg", r + "negz.jpg"];

                const textureCube = new THREE.CubeTextureLoader().load(urls);
                textureCube.mapping = THREE.CubeReflectionMapping;
                textureCube.encoding = THREE.sRGBEncoding;
                // scene.background=textureCube;

                const texture = new THREE.TextureLoader().load("/assets/s3-bucket/clickMe/textures/clouds.jpeg");
                // scene.background=texture;

                const jarMaterial = new THREE.MeshPhysicalMaterial({
                    transparent: true,
                    opacity: .5,
                    depthWrite: true,
                    color: 'white',
                    metalness: 1,
                    roughness: .2,
                    envMap: textureCube
                });
                var mat = new THREE.MeshPhongMaterial({ color: 0xdd0000, specular: 0x009900, shininess: 30 });

                comp.traverse(function (child) {

                    if (child instanceof THREE.Mesh) {

                        child.material = jarMaterial;

                    }

                });
                const sc = 800;
                comp.scale.set(sc, sc, sc);
                // comp.material = jarMaterial;
                // comp.rotation.x = -Math.PI / 2;
                // comp.rotation.z = Math.PI;

                let spread = 1000;
                let y = 100;
                let x = 0; //Math.random() * spread - spread / 2;
                let z = -100;//Math.random() * spread - spread / 2
                comp.rotation.y = Math.PI;
                comp.position.set(x, y, z);
                // comps.push(comp);
                scene.add(comp);

            });
            // new MTLLoader()
            //     .load(MTLFile, function (materials) {
            //         materials.preload();
            //         const objLoader = new OBJLoader();
            //         objLoader.setMaterials(materials);
            //         objLoader.load(url, (root) => {
            //             var comp = root;
            //             // var mat = new THREE.MeshLambertMaterial({ 
            //             //     color: 0xffffff 
            //             // });
            //             // comp.material = mat;
            //             const r = "/assets/s3-bucket/clickMe/textures/Bridge2/";
            //             const urls = [r + "posx.jpg", r + "negx.jpg",
            //             r + "posy.jpg", r + "negy.jpg",
            //             r + "posz.jpg", r + "negz.jpg"];

            //             const textureCube = new THREE.CubeTextureLoader().load(urls);
            //             textureCube.mapping = THREE.CubeReflectionMapping;
            //             textureCube.encoding = THREE.sRGBEncoding;

            //             const jarMaterial = new THREE.MeshPhysicalMaterial({
            //                 transparent: true,
            //                 opacity: .3,
            //                 depthWrite: true,
            //                 color: 'white',
            //                 metalness: 0,
            //                 roughness: 0,
            //                 envMap: textureCube
            //             });
            //             const sc = 400;
            //             comp.scale.set(sc, sc, sc);
            //             // comp.rotation.x = -Math.PI / 2;
            //             // comp.rotation.z = Math.PI;

            //             let spread = 1000;
            //             let y = 7;
            //             let x = -200; //Math.random() * spread - spread / 2;
            //             let z = -400;//Math.random() * spread - spread / 2
            //             comp.rotation.y = Math.PI;
            //             comp.position.set(x, y, z);
            //             comps.push(comp);
            //             scene.add(comp);

            //         });
            //     });

        }
        function initHeart() {
            const MTLFile = "/assets/s3-bucket/clickMe/models/heart/heart.mtl";
            const url = "/assets/s3-bucket/clickMe/models/heart/heart.obj";

            new MTLLoader()
                .load(MTLFile, function (materials) {
                    materials.preload();
                    const objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.load(url, (root) => {
                        heart = root;
                        // var mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
                        // comp.material = mat;
                        const sc = 50;
                        heart.scale.set(sc, sc, sc);
                        heart.rotation.y = -.3;
                        // comp.rotation.x = -Math.PI / 2;
                        // comp.rotation.z = Math.PI;

                        // let spread = 2000;
                        let y = 300;
                        let x = -30;
                        let z = -200;
                        heart.position.set(x, y, z);
                        scene.add(heart);

                        // for (let i = 0; i < 10; i++) {
                        //     var comp2 = comp.clone();
                        //     let x = Math.random() * spread - spread / 2;
                        //     let z = Math.random() * spread - spread / 2
                        //     comp2.rotation.y = Math.random() * Math.PI * 2;
                        //     comp2.position.set(x, y, z);
                        //     comps.push(comp2);
                        //     // this.hercules.push(hercules);
                        //     scene.add(comp2);
                        // }

                    });
                });

        }

        function heartPump() {
            heartVelocity += heartAcceleration;
            if (heartRate < 70)
                heartVelocity = constrain(heartVelocity, -2, 14);
            else
                heartVelocity = constrain(heartVelocity, -2, .5);
            heartRate += heartVelocity;
            heartRate = constrain(heartRate, 30, maxHeart);
            // heartVelocity += heartAcceleration;
            // heartRate = mapVal(dt, 0, 120, )
            heartTotal += (heartRate / 60) * .1;
            let ampX = mapVal(heartRate, 30, maxHeart, 2, 5);
            let heartSz = 50 + ampX * Math.sin(heartTotal);
            // let heartSzY = 50 + ampX*.9 * Math.sin(heartTotal);
            if (heart)
                heart.scale.set(heartSz, heartSz, heartSz);
            if (face) {
                let faceSz = 1.4 + .03 * Math.sin(heartTotal);
                face.scale.set(faceSz, faceSz, faceSz);
                face.rotation.z = 1.8 - .02 * Math.sin(heartTotal);

            }

        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.props.removeClass("clickMe");
        // clearInterval(this.interval2);
        // clearInterval(this.heartInterval);
    }

    onPointerMove = (event) => {

        if (event.isPrimary === false) return;


        if (!this.props.ui.isMobile) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1 + .1;
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
            mouse.z = 6 * 200;
        }
    }

    setCursor = (id) => {
        this.setState({ cursor: id });
    }

    // heartPump = () => {
    //     const { heartRate, pulse } = this.state;

    //     // let dt = new Date() - lastPump;
    //     // let dh = mapVal(dt, 0, 5000, 30, -20);
    //     // dh = constrain(dh, -20, 30);
    //     // console.log(heartRate);
    //     let sz = Math.sin(new Date() / 100.0 * (heartRate/60));
    //     this.setState({ heartSz: sz, pulse: pulse + 1 });
    // }

    getHandMenu = () => {
        // if (this.state.showHands) {
        let hands = ["🖐🏿", "🖐🏾", "🖐🏽", "🖐🏼", "🖐🏻"];
        return (
            <Frame title="" content={

                <div className="handBox">
                    {hands.map((hand, i) => {
                        let h = i;
                        return (
                            <button key={i} onClick={() => this.setCursor(h)}>{hand}</button>
                        )
                    })
                    }
                </div>
            }
                width={80} height={400} x={100} y={100}
            />
        )
        // }
        // return null;
    }

    getFace = () => {
        const w = 200;
        const h = w;
        return (
            <Frame title="" content={
                <div className="">
                    <div className="faceGif" style={{ width: w, height: h }} />
                </div>
            }
                width={w} height={h} x={200} y={100}
            />
        )
    }

    getHeart = () => {
        const w = 300;
        const h = 500;
        const bw = Math.floor(w + 30 * this.state.heartSz);
        const bh = Math.floor(h + 30 * this.state.heartSz);
        return (
            <Frame title="" content={
                <div className="heart" style={{ backgroundSize: `${bw}px ${bh}px`, width: w, height: h }} />
            }
                width={w} height={h} x={400} y={100}
            />
        )
    }




    heartClicked = (amt) => {
        // this.setState({ lastPump: new Date() });
        // lastPump = new Date();
        if (heartRate <= 32) {
            heartVelocity += 10;
        }
        else {
            if (heartVelocity < 0)
                heartVelocity = 0;
            heartVelocity += .2;
        }


        // this.heartRate += amt * 4;
        // this.heartRate = constrain(this.heartRate, 20, 200);
        // heartRate += amt * 4;
        // heartRate = constrain(heartRate, 20, 200);

    }



    setHeart = () => {
        this.setState({ hR: heartRate, hT: heartTotal })
    }

    render() {
        // white skin, black emoji
        // identity doesn't go away
        // the default cursor
        // emojis don't 
        const { ui } = this.props;
        const { hR, hT } = this.state;

        const dim = getDim(ui);
        const { x, y, w, h } = dim;

        const roseDim = 80;
        const roseBuffer = 20;

        const roseBL = { x: x - roseDim - roseBuffer, y: y - (ui.toolbarH + roseDim) / 2 };
        const roseBR = { x: x + w + roseBuffer, y: roseBL.y };

        const roseTL = { x: x, y: ui.contentH - y - ui.toolbarH - h };
        const roseTR = { x: x + w - roseDim, y: roseTL.y };

        const bigRoseTL = { x: roseTL.x - roseBuffer - roseDim * 2, y: roseTL.y + roseDim };
        const bigRoseTR = { x: roseTR.x + roseBuffer + roseDim, y: bigRoseTL.y };
        return (
            <div className={"ClickMe Sketch " + "point" + this.state.cursor} onClick={() => this.heartClicked(1)} onMouseMove={this.onPointerMove} >
                <div className="Three" ref={ref => (this.mount = ref)} />
                {(ui.isMobile || ui.hasFooter) ?
                    null :
                    <React.Fragment>
                        {/* <Pulse heartRate={this.state.hR} maxHeart={maxHeart} /> */}
                        <Rose w={roseDim * 2} x={bigRoseTL.x} y={bigRoseTL.y} heartRate={hR} heartTotal={hT} />
                        <Rose w={roseDim * 2} x={bigRoseTR.x} y={bigRoseTR.y} heartRate={hR} heartTotal={hT} />

                        <Rose w={roseDim} x={roseBL.x} y={roseBL.y} heartRate={hR} heartTotal={hT} />
                        <Rose w={roseDim} x={roseBR.x} y={roseBR.y} heartRate={hR} heartTotal={hT} />
                        <Rose w={roseDim} x={roseTL.x} y={roseTL.y} heartRate={hR} heartTotal={hT} />
                        <Rose w={roseDim} x={roseTR.x} y={roseTR.y} heartRate={hR} heartTotal={hT} />
                        {/* <Rose w={roseDim} x={500} y={100} heartRate={hR} heartTotal={hT} /> */}
                    </React.Fragment>
                }
                <EmojiMonitor heartTotal={hT} heartRate={hR} maxHeart={maxHeart} heartClicked={this.heartClicked} />
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
