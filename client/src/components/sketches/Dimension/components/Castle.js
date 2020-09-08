
import { Color3, Vector3, Vector2, MeshBuilder, StandardMaterial } from 'babylonjs';


class Castle {

  constructor(gridsize, width, height){
    // let gridsize = 30; //floor(random(10, 20));
    this.size = Math.min(height, width) / gridsize * 1.7;
    this.x = gridsize;
    this.y = gridsize;

    this.positions = [];
    this.heights = [];
    this.stairinfos = [];
    this.windowinfos = [];

    this.initTerrain();
    this.initWindows();
    this.initStairs();

    this.ColorPalette = {
      "dark": new Color3(0, 0, 0),
      "light": new Color3(.4, .4, .8),
      "shadow": new Color3(0, 0, 0),
      "shade" : new Color3(.2, .2, .4),
      "white" : new Color3(1, 1, 1),
    };


  }

  initTerrain() {
    for(let n=0; n<this.y; n++){
      let ii = 1;
      for(let i=0; i<this.x; i++){
        let pos = new Vector3(i * this.size, 0, n * this.size);
        this.positions.push(pos);
        if(Math.random() < 0.5){
          ii+=1;
        }
        // what percentage of the move back (z or n) are we? Farther back, more mult
        let t = n / (this.y - 1.0);
        // t = pow(t, 0.5);
        this.heights.push(this.size * Math.ceil(ii * t));
      }
    }
  }

  initWindows() {
    // windows
    for(let n=0; n<this.y-1; n++){
      for(let i=0; i<this.x-1; i++){
        let index1 = n * this.x + i;
        let index2 = n * this.x + i + 1; //right
        let index3 = (n + 1) * this.x + i; //in front
        let h1 = this.heights[index1];
        let h2 = this.heights[index2];
        let h3 = this.heights[index3];

        // windows
        let maxnum = 6;
        if(h1 < h2){
          for(let t=h1; t<h2-1; t+= this.size){
            if(random() < 0.3){
              let size = map(Math.floor(random(1, maxnum)), 1, maxnum-1, 0.2, 0.4);
              this.windowinfos.push([index1, 1, t, size]);
            }
          }
        }
        if(h1 < h3){
          for(let t=h1; t<h3-1; t+= this.size){
            if(random() < 0.3){
              let size = map(Math.floor(random(1, maxnum)), 1, maxnum-1, 0.2, 0.4);
              this.windowinfos.push([index1, 0, t, size]);
            }
          }
        }
      }
    }

  }

  initStairs() {
    // stairs
    for(let n=0; n<this.y-1; n++){
      for(let i=0; i<this.x-1; i++){
        let index1 = n * this.x + i;
        let index2 = n * this.x + i + 1; //right
        let index3 = (n + 1) * this.x + i; //in front
        let h1 = this.heights[index1];
        let h2 = this.heights[index2];
        let h3 = this.heights[index3];

        //adding stairs
        if(random() < 0.5){
          if(h1 + this.size == h2) {
            this.stairinfos.push([index1, 1, random()]);
          }
          else if(h1 + this.size == h3){
            this.stairinfos.push([index1, 0, random()]);
          }
        }
      }
    }

  }

  render(scene, myparent) {

    for(let i=0; i<this.positions.length; i++){
      let pos = this.positions[i];
      let h = this.heights[i];
      let val = h / (this.y * this.size * 0.5);

      let material = new StandardMaterial("stairMaterial", scene);
      let col = Color3.Lerp(this.ColorPalette.shadow, this.ColorPalette.light, val);
      material.diffuseColor = col;
      // material.specularColor = new Color3(0.5, 0.6, 0.87);
      // material.emissiveColor = new Color3(.1, .1, .1);
      // material.ambientColor = new Color3(0.23, 0.98, 0.93);
      // material.alpha = 0.8;

      let box = MeshBuilder.CreateBox("box", {width: this.size, height: h, depth: this.size}, scene);
      box.position = new Vector3(pos.x, pos.y+h*.5, pos.z);
      box.material = material;
      box.checkCollisions = true;
      box.parent = myparent;

      // this.drawStairs(scene, myparent);
    }
  }

  drawStairs(scene, myparent) {
    for(let i=0; i<1; i++){
      let stairinfo = this.stairinfos[i];
      this.drawStairByIndex(scene, myparent, stairinfo);
    }
  }

  drawStairByIndex(scene, myparent, stairinfo){
    let index = stairinfo[0];
    let dir = stairinfo[1];
    let shift = stairinfo[2];
    let pos = this.positions[index];
    let h = this.heights[index];
    let val = h / (this.y * this.size * 0.5);
    let num = 5;
    let stepsize = this.size / num;
    let col = Color3.Lerp(this.ColorPalette.shadow, this.ColorPalette.light, val);
    let x = pos.x;
    let y = pos.h + pos.y;
    let z = pos.z;
    let rotY = Math.PI/2*dir;

    // translate(0,0,-this.size * 0.5);
    z -= this.size*.5;

    for(let i=1; i<num; i++){
      let minval = -0.5;
      let maxval = 0.5;

      // let sanim = map(constrain(Math.sin(radians(frameCount * 1) + shift * TWO_PI), minval, maxval), minval, maxval, 0, 1.0);
      // sanim = Math.max(0.0001, easeInOutQuart(sanim));
      let sanim = 1;
      let boxX = x;
      let boxY = y + stepsize * i * 0.5 * sanim;
      let boxZ = stepsize * 0.5 + stepsize * i;

      let box = MeshBuilder.CreateBox("box", {width: this.size, height: stepsize * i * sanim, depth: stepsize}, scene);
      box.position = new Vector3(boxX, boxY, boxZ);
      box.rotation.y = rotY;

      let material = new StandardMaterial("stairMaterial", scene);
      material.diffuseColor = col;
      box.material = material;
      box.parent = myparent;
    }
  }

}

function constrain(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

function radians(deg) {
  return deg/180*Math.PI;
}

function random(start=0, end=1) {
  return Math.random()*(end-start)+start;
}

function map(in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export default Castle;
