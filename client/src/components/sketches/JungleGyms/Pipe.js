import * as THREE from "three";

export default class Pipe {
  constructor(nodes, scene) {

    this.pipeRadius = 0.2;
    this.ballJointRadius = this.pipeRadius * 1.5;
    this.gridBounds = new THREE.Box3(
      new THREE.Vector3(-10, -10, -10),
      new THREE.Vector3(10, 10, 10)
    );

    this.scene = scene;
    this.nodes = nodes;

    this.currentPosition = randomIntegerVector3WithinBox(this.gridBounds);
    this.positions = [this.currentPosition];
    this.object3d = new THREE.Object3D();

    this.scene.add(this.object3d);
    this.addTexture();
    this.setAt(nodes, this.currentPosition, this);
    this.makeBallJoint(this.currentPosition);
  }

  makeCylinderBetweenPoints(fromPoint, toPoint, material) {
    var deltaVector = new THREE.Vector3().subVectors(toPoint, fromPoint);
    var arrow = new THREE.ArrowHelper(
      deltaVector.clone().normalize(),
      fromPoint
    );
    var geometry = new THREE.CylinderGeometry(
      this.pipeRadius,
      this.pipeRadius,
      deltaVector.length(),
      10,
      4,
      true
    );
    var mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.setFromQuaternion(arrow.quaternion);
    mesh.position.addVectors(fromPoint, deltaVector.multiplyScalar(0.5));
    mesh.updateMatrix();

    this.object3d.add(mesh);
  };

  makeBallJoint(position) {
    var ball = new THREE.Mesh(
      new THREE.SphereGeometry(this.ballJointRadius, 8, 8),
      this.material
    );
    ball.position.copy(position);
    this.object3d.add(ball);
  };

  makeElbowJoint(fromPosition, toPosition, tangentVector) {
    var elball = new THREE.Mesh(
      new THREE.SphereGeometry(this.pipeRadius, 8, 8),
      this.material
    );
    elball.position.copy(fromPosition);
    this.object3d.add(elball);
  };

  addTexture() {
    const texUrl = window.AWS + "/jungleGyms/caution.jpg";
    var pipeTexture = new THREE.TextureLoader().load(  texUrl );//THREE.ImageUtils.loadTexture(texUrl);
    pipeTexture.wrapS = pipeTexture.wrapT = THREE.RepeatWrapping;
    pipeTexture.repeat.set(.2, .2);
    if (pipeTexture) {
      this.material = new THREE.MeshLambertMaterial({
        map: pipeTexture,
      });
    } else {
      var color = 0x00441f //randomInteger(0, 0xffffff);
      var emissive = new THREE.Color(color).multiplyScalar(0.3);
      this.material = new THREE.MeshPhongMaterial({
        specular: 0xa9fcff,
        color: color,
        emissive: emissive,
        shininess: 100,
      });
    }
  }

  update() {
    if (this.positions.length > 1) {
      var lastPosition = this.positions[this.positions.length - 2];
      var lastDirectionVector = new THREE.Vector3().subVectors(
        this.currentPosition,
        lastPosition
      );
    }
    if (Math.random>.5 && lastDirectionVector) {
      var directionVector = lastDirectionVector;
    } else {
      var directionVector = new THREE.Vector3();
      directionVector[chooseFrom("xyz")] += chooseFrom([+1, -1]);
    }
    var newPosition = new THREE.Vector3().addVectors(
      this.currentPosition,
      directionVector
    );

    // TODO: try other possibilities
    // ideally, have a pool of the 6 possible directions and try them in random order, removing them from the bag
    // (and if there's truly nowhere to go, maybe make a ball joint)
    if (!this.gridBounds.containsPoint(newPosition)) {
      return;
    }
    if (this.getAt(newPosition)) {
      return;
    }
    this.setAt(newPosition, this);

    // joint
    // (initial ball joint is handled elsewhere)
    if (lastDirectionVector && !lastDirectionVector.equals(directionVector)) {
      this.makeBallJoint(this.currentPosition);
    }

    // pipe
    this.makeCylinderBetweenPoints(this.currentPosition, newPosition, this.material);

    // update
    this.currentPosition = newPosition;
    this.positions.push(newPosition);
  };

  setAt(position, value) {
    this.nodes["(" + position.x + ", " + position.y + ", " + position.z + ")"] = value;
  }

  getAt(position, value) {
    return this.nodes["(" + position.x + ", " + position.y + ", " + position.z + ")"];
  }

};

//////////////
// HELPERS
function chooseFrom(values) {
  return values[Math.floor(Math.random() * values.length)];
}
function random(x1, x2) {
  return Math.random() * (x2 - x1) + x1;
}
function randomInteger(x1, x2) {
  return Math.round(random(x1, x2));
}
function randomIntegerVector3WithinBox(box) {
  return new THREE.Vector3(
    randomInteger(box.min.x, box.max.x),
    randomInteger(box.min.y, box.max.y),
    randomInteger(box.min.z, box.max.z)
  );
}
