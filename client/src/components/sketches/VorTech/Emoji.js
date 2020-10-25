import { Scene, MeshBuilder, StandardMaterial, CubeTexture, Color3,Color4,Vector3, Mesh, Texture } from 'babylonjs';

export default class Emoji {

  constructor(scene) {
    this.r = Math.random()*8;
    this.ang = Math.random() * 2 * Math.PI;

    const imgs = ["wave", "angry", "angry2", "tp", "flag", "rabbit"];
    this.index = 0;
    let rand = Math.random();

    if (rand < .025) this.index = 1;
    else if (rand < .05) this.index = 2;
    else if (rand < .1) this.index = 3;
    else if (rand < .15) this.index = 4;

    var emojiTexture = new Texture(`${window.AWS}/vorTech/emojis/${imgs[this.index]}.png`, scene);
    // emojiTexture.vScale = emojiTexture.uScale = 10;
    var emojiMaterial = new StandardMaterial("emojiMaterial", scene);
    emojiMaterial.diffuseTexture = emojiTexture;
    emojiMaterial.diffuseTexture.hasAlpha = true;
    this.emoji = Mesh.CreateGround("wave", 1.2, 1.2, 1, scene, false);
    this.emoji.rotation.x = -Math.PI/2;
    this.emoji.material = emojiMaterial;
    this.emoji.setEnabled(false);
    // this.emoji = MeshBuilder.CreateSphere("sphere", {}, scene);
  }

  startFlush() {
    this.r = Math.random()*8+7;
    this.ang = Math.random() * 2 * Math.PI;
    this.emoji.setEnabled(true);
  }

  hide() {
    this.emoji.setEnabled(false);
  }

  update(isStopping=false) {
    if (this.r < 2 && isStopping) {
      this.emoji.setEnabled(false);
    } else if (this.r < 2) {
      this.r = 8;//Math.random()*200+window.innerWidth/2;
    }
    else {

      this.r -= .01;
      // let speed = (9-this.r)*.01;
      if (this.r > 6) this.ang -= .01;
      else if (this.r > 5) this.ang -= .02;
      else if (this.r > 4) this.ang -= .03;
      else if (this.r > 3) this.ang -= .04;
      else this.ang -= .08;

      let sc = (this.r)/5.5;
      if (sc > 1) sc = 1;
      this.emoji.scaling = new Vector3(sc, sc, sc);
      // this.ang -= speed;

      this.emoji.position.y = this.r*Math.cos(this.ang)//+window.innerHeight/2;
      this.emoji.position.x = this.r*Math.sin(this.ang)//+window.innerWidth/2;

      this.emoji.position.z = ((8-this.r)*6);
    }

  }
}
