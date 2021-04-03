function createConesScene() {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    scene.userData.canGoBackwardsInTime = true;

    scene.userData.camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 200, 100000);

    // Lights

    scene.userData.lightningColor = new THREE.Color(0xB0FFFF);
    scene.userData.outlineColor = new THREE.Color(0x00FFFF);

    const posLight = new THREE.PointLight(0x00ffff, 1, 5000, 2);
    scene.add(posLight);

    // Ground

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200000, 200000), new THREE.MeshPhongMaterial({ color: 0xC0C0C0, shininess: 0 }));
    ground.rotation.x = - Math.PI * 0.5;
    scene.add(ground);

    // Cones

    const conesDistance = 1000;
    const coneHeight = 200;
    const coneHeightHalf = coneHeight * 0.5;

    posLight.position.set(0, (conesDistance + coneHeight) * 0.5, 0);
    posLight.color = scene.userData.outlineColor;

    scene.userData.camera.position.set(5 * coneHeight, 4 * coneHeight, 18 * coneHeight);

    const coneMesh1 = new THREE.Mesh(new THREE.ConeGeometry(coneHeight, coneHeight, 30, 1, false), new THREE.MeshPhongMaterial({ color: 0xFFFF00, emissive: 0x1F1F00 }));
    coneMesh1.rotation.x = Math.PI;
    coneMesh1.position.y = conesDistance + coneHeight;
    scene.add(coneMesh1);

    const coneMesh2 = new THREE.Mesh(coneMesh1.geometry.clone(), new THREE.MeshPhongMaterial({ color: 0xFF2020, emissive: 0x1F0202 }));
    coneMesh2.position.y = coneHeightHalf;
    scene.add(coneMesh2);

    // Lightning strike

    scene.userData.lightningMaterial = new THREE.MeshBasicMaterial({ color: scene.userData.lightningColor });

    scene.userData.rayParams = {

        sourceOffset: new THREE.Vector3(),
        destOffset: new THREE.Vector3(),
        radius0: 4,
        radius1: 4,
        minRadius: 2.5,
        maxIterations: 7,
        isEternal: true,

        timeScale: 0.7,

        propagationTimeFactor: 0.05,
        vanishingTimeFactor: 0.95,
        subrayPeriod: 3.5,
        subrayDutyCycle: 0.6,
        maxSubrayRecursion: 3,
        ramification: 7,
        recursionProbability: 0.6,

        roughness: 0.85,
        straightness: 0.6

    };

    let lightningStrike;
    let lightningStrikeMesh;
    let lightningStrike2;
    let lightningStrikeMesh2;
    const outlineMeshArray = [];

    scene.userData.recreateRay = function () {

        if (lightningStrikeMesh) {
            scene.remove(lightningStrikeMesh);
        }
        if (lightningStrikeMesh2)
        scene.remove(lightningStrikeMesh2);

        lightningStrike = new LightningStrike(scene.userData.rayParams);
        lightningStrikeMesh = new THREE.Mesh(lightningStrike, scene.userData.lightningMaterial);

        let params2 = {...scene.userData.rayParams};
        params2.sourceOffset += 10;
        lightningStrike2 = new LightningStrike(params2);
        lightningStrikeMesh2 = new THREE.Mesh(lightningStrike2, scene.userData.lightningMaterial);

        outlineMeshArray.length = 0;
        outlineMeshArray.push(lightningStrikeMesh);

        scene.add(lightningStrikeMesh);
        scene.add(lightningStrikeMesh2);

    };

    scene.userData.recreateRay();

    // Compose rendering

    composer.passes = [];
    composer.addPass(new RenderPass(scene, scene.userData.camera));
    createOutline(scene, outlineMeshArray, scene.userData.outlineColor);

    // Controls

    const controls = new OrbitControls(scene.userData.camera, renderer.domElement);
    controls.target.y = (conesDistance + coneHeight) * 0.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    scene.userData.render = function (time) {

        // Move cones and Update ray position
        coneMesh1.position.set(Math.sin(0.5 * time) * conesDistance * 0.6, conesDistance + coneHeight, Math.cos(0.5 * time) * conesDistance * 0.6);
        coneMesh2.position.set(Math.sin(0.9 * time) * conesDistance, coneHeightHalf, 0);
        lightningStrike.rayParameters.sourceOffset.copy(coneMesh1.position);
        lightningStrike.rayParameters.sourceOffset.y -= coneHeightHalf;
        lightningStrike.rayParameters.destOffset.copy(coneMesh2.position);
        lightningStrike.rayParameters.destOffset.y += coneHeightHalf;

        lightningStrike.update(time);

        controls.update();

        // Update point light position to the middle of the ray
        posLight.position.lerpVectors(lightningStrike.rayParameters.sourceOffset, lightningStrike.rayParameters.destOffset, 0.5);

        if (scene.userData.outlineEnabled) {

            composer.render();

        } else {

            // renderer.render(scene, scene.userData.camera);
            anaglyphEffect.render(scene, scene.userData.camera);
        }

    };

    return scene;

}

function createStormScene() {

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xff00ff);
    // scene.fog = new THREE.FogExp2(0xff00ff, 0.002);//efd1b5

    scene.userData.canGoBackwardsInTime = false;

    scene.userData.camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 20, 10000);

    // Lights

    scene.add(new THREE.AmbientLight(0x444444));

    const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const posLight = new THREE.PointLight(0x00ffff);
    posLight.position.set(0, 100, 0);
    scene.add(posLight);

    // Ground

    const GROUND_SIZE = 1000;

    scene.userData.camera.position.set(0, 0.2, 1.6).multiplyScalar(GROUND_SIZE * 0.5);

    // const ground = new THREE.Mesh(new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE), new THREE.MeshLambertMaterial({ color: 0x072302 }));
    // ground.rotation.x = - Math.PI * 0.5;
    // scene.add(ground);

    var floorTexture = new THREE.TextureLoader().load(window.AWS + "/blinds/wallpaper/blkmar.jpg");
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4);
    this.floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.BackSide });
    var floorGeometry = new THREE.PlaneGeometry(1000, 1500, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, this.floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    floor.position.z = - 200
    scene.add(floor);

    // Storm

    scene.userData.lightningColor = new THREE.Color(0xB0FFFF);
    scene.userData.outlineColor = new THREE.Color(0x00FFFF);

    scene.userData.lightningMaterial = new THREE.MeshBasicMaterial({ color: scene.userData.lightningColor });

    const rayDirection = new THREE.Vector3(0, - 1, 0);
    let rayLength = 0;
    const vec1 = new THREE.Vector3();
    const vec2 = new THREE.Vector3();

    scene.userData.rayParams = {

        radius0: 1,
        radius1: 0.5,
        minRadius: 0.3,
        maxIterations: 7,

        timeScale: 0.15,
        propagationTimeFactor: 0.2,
        vanishingTimeFactor: 0.9,
        subrayPeriod: 4,
        subrayDutyCycle: 0.6,

        maxSubrayRecursion: 3,
        ramification: 3,
        recursionProbability: 0.4,

        roughness: 0.85,
        straightness: 0.65,

        onSubrayCreation: function (segment, parentSubray, childSubray, lightningStrike) {

            lightningStrike.subrayConePosition(segment, parentSubray, childSubray, 0.6, 0.6, 0.5);

            // Plane projection

            rayLength = lightningStrike.rayParameters.sourceOffset.y;
            vec1.subVectors(childSubray.pos1, lightningStrike.rayParameters.sourceOffset);
            const proj = rayDirection.dot(vec1);
            vec2.copy(rayDirection).multiplyScalar(proj);
            vec1.sub(vec2);
            const scale = proj / rayLength > 0.5 ? rayLength / proj : 1;
            vec2.multiplyScalar(scale);
            vec1.add(vec2);
            childSubray.pos1.addVectors(vec1, lightningStrike.rayParameters.sourceOffset);

        }

    };

    // Black star mark
    const starVertices = [];
    const prevPoint = new THREE.Vector3(0, 0, 1);
    const currPoint = new THREE.Vector3();
    for (let i = 1; i <= 16; i++) {

        currPoint.set(Math.sin(2 * Math.PI * i / 16), 0, Math.cos(2 * Math.PI * i / 16));

        if (i % 2 === 1) {

            currPoint.multiplyScalar(0.3);

        }

        starVertices.push(0, 0, 0);
        starVertices.push(prevPoint.x, prevPoint.y, prevPoint.z);
        starVertices.push(currPoint.x, currPoint.y, currPoint.z);

        prevPoint.copy(currPoint);

    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMesh = new THREE.Mesh(starGeometry, new THREE.MeshBasicMaterial({ color: 0x020900 }));
    starMesh.scale.multiplyScalar(6);

    //

    const storm = new LightningStorm({

        size: GROUND_SIZE,
        minHeight: 90,
        maxHeight: 200,
        maxSlope: 0.6,
        maxLightnings: 18,

        lightningParameters: scene.userData.rayParams,

        lightningMaterial: scene.userData.lightningMaterial,

        onLightningDown: function (lightning) {

            // Add black star mark at ray strike
            const star1 = starMesh.clone();
            star1.position.copy(lightning.rayParameters.destOffset);
            star1.position.y = 0.05;
            star1.rotation.y = 2 * Math.PI * Math.random();
            scene.add(star1);

        }

    });

    scene.add(storm);

    // Compose rendering

    composer.passes = [];
    composer.addPass(new RenderPass(scene, scene.userData.camera));
    createOutline(scene, storm.lightningsMeshes, scene.userData.outlineColor);

    // Controls

    const controls = new OrbitControls(scene.userData.camera, renderer.domElement);
    controls.target.y = GROUND_SIZE * 0.05;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    scene.userData.render = function (time) {

        storm.update(time);

        controls.update();

        if (scene.userData.outlineEnabled) {

            composer.render();

        } else {

            // renderer.render(scene, scene.userData.camera);
            anaglyphEffect.render(scene, scene.userData.camera);
        }

    };

    return scene;

}
