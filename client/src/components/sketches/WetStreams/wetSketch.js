var emoji;
var emojisTransparent = [];

export default function sketch(p) {
  ;

  let ps = [];
  let percent = 0;
  let emojiS = 34;
  let scaler = 1;

  let velocities = [
    { velX: { min: -.8, max: 5 }, velY: { min: -.5, max: 0 } },
    { velX: { min: -5, max: 2 }, velY: { min: -.5, max: 0 } },
    { velX: { min: -5, max: .8 }, velY: { min: -.5, max: 0 } },
    { velX: { min: -5, max: .8 }, velY: { min: -.5, max: 0 } },
    { velX: { min: -5, max: 5 }, velY: { min: -.5, max: 0 } },
    { velX: { min: -.5, max: 5 }, velY: { min: -.5, max: 0 } }
  ];
  // let offsets =     [{x:215,y:328}, {x:215,y:215}, {x:50,y:195}, {x:134,y:244}, {x:260,y:335}, {x:285,y:320}];
  // let offsetsMin =  [{x:215,y:348}, {x:215,y:245}, {x:70,y:215}, {x:154,y:274}, {x:270,y:365}, {x:285,y:340}];
  // let offsetsMax =  [{x:215,y:328}, {x:215,y:215}, {x:50,y:195}, {x:134,y:244}, {x:260,y:335}, {x:285,y:320}];

  // if (p.windowWidth < 500)
  //   offsets = [{x:215,y:348}, {x:215,y:245}, {x:70,y:215}, {x:154,y:274}, {x:270,y:365}, {x:285,y:340}];
  // else if (p.windowWidth > 2000)
  //   offsets = [{x:215,y:328}, {x:215,y:215}, {x:50,y:195}, {x:134,y:244}, {x:260,y:335}, {x:285,y:320}];

  // for (let i = 0; i < offsets.length; i++) {
  //   offsets[i].x *= scaler; //mapVal(p.windowWidth, 375, 2560, offsetsMin[i].x, offsetsMax[i].x);
  //   offsets[i].y *= scaler; //mapVal(p.windowWidth, 375, 2560, offsetsMin[i].x, offsetsMax[i].x);
  // }
  let offsets = [{ x: 215, y: 295 }, { x: 230, y: 204 }, { x: 80, y: 195 }, { x: 164, y: 244 }, { x: 280, y: 315 }, { x: 295, y: 290 }];

  let degrees = [0, 60, 90, 80, 40, 0];



  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight); //, p.WEBGL

    emoji = p.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/wetStreams/wateremoji.png", (img) => p.createEmojisTransparent());
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.origins) {
      scaler = props.scaler; //p.constrain(props.scaler, .5, 1.0);
      const tb = 24;
      if (ps.length === 0) {
        for (let i = 0; i < props.origins.length; i++) {
          // let sc = constrain(props.scaler, .4, 1);
          let offsetX = offsets[i].x * scaler;
          let offsetY = (offsets[i].y - tb) * scaler + tb;
          let x = props.origins[i].x + offsetX;
          let y = props.origins[i].y + offsetY;
          ps[i] = new ParticleSystem(p, p.createVector(x, y), velocities[i].velX, velocities[i].velY, degrees[i], props.isPlaying[i]);
          ps[i].initParticles(40);
        }
      }
      else {
        scaler = props.scaler;
        for (let i = 0; i < ps.length; i++) {
          let offsetX = offsets[i].x * scaler;
          let offsetY = (offsets[i].y - tb) * scaler + tb;
          let x = props.origins[i].x + offsetX + props.deltas[i].x;
          let y = props.origins[i].y + offsetY + props.deltas[i].y;
          let isPlaying = props.isPlaying[i];
          ps[i].origin.set(x, y, 0);
          ps[i].isPlaying = isPlaying;
        }

      }
    }
  };

  p.createEmojisTransparent = function () {
    for (let i = 0; i < 5; i++) {
      emojisTransparent[i] = p.createGraphics(emojiS, emojiS);
      emojisTransparent[i].clear();
      emojisTransparent[i].tint(255, p.map(i, -1, 4, 0, 255));
      // let imgSc = p.constrain(scaler, .4, 1);
      let imgSc = 1;
      // emojisTransparent[i].rect(0, 0, emojiS*imgSc, emojiS*imgSc);
      emojisTransparent[i].image(emoji, 0, 0, emojiS * imgSc, emojiS * imgSc);
    }
  }

  p.draw = function () {
    percent += .1;

    p.clear();
    if (ps.length > 0) {
      ps.forEach((sys) => {
        sys.run(percent, scaler);
      })
    }


    // p.fill(255);
    // p.noStroke();
    // p.rect(50, 50, 50, 50);
    // p.fill(0);
    // p.textSize(30);
    // p.text(p.round(p.frameRate()), 50, 80);

  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

};

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

function Particle(p, origin, id, velX, velY, deg) {
  this.p5 = p;
  this.acceleration = this.p5.createVector(0, 0);
  this.gravity = this.p5.createVector(0, 0.1);
  // this.isLeft = isLeft;
  this.velX = velX;
  this.velY = velY;
  this.deg = deg;
  this.velocity = this.p5.createVector(this.p5.random(velX.min, velX.max), this.p5.random(velY.min, velY.max));
  // if (isLeft) this.velocity = this.p5.createVector(this.p5.random(-.8,5),this.p5.random(0,.5));
  // else this.velocity = this.p5.createVector(this.p5.random(-5,.8),this.p5.random(0,.5));
  this.positionOG = this.p5.createVector(origin.x, origin.y);
  this.position = this.p5.createVector(origin.x, origin.y);
  this.lifespan = 0;
  this.r = Math.random() * 15 + 8;
  this.id = id;
  this.launched = false;

  this.run = function (percent, origin, scaler) {
    this.update(percent, origin);
    this.display(percent, scaler);
  }

  // Method to update position


  this.update = function (percent, origin) {
    if (this.launched) {
      this.acceleration.add(this.gravity);
      this.velocity.add(this.acceleration);

      this.position.add(this.velocity);

      // let bufferX = 50;
      // if (this.position.y > window.innerHeight-100) {
      //   this.velocity.y *= -1*Math.random()*.3-.1;
      //   this.position.y = window.innerHeight-100;
      // }
      // if (this.position.x < bufferX) {
      //   this.position.x = bufferX;
      //   this.velocity.x *= -1;
      // }
      // if (this.position.x > window.innerWidth-bufferX) {
      //   this.position.x = window.innerWidth-bufferX;
      //   this.velocity.x *= -1;
      // }

      this.acceleration.mult(0);
      this.lifespan += 1;

      this.isDead(origin);
    }
    // let c = 0.02;
    // let friction = this.p5.createVector(this.velocity.x,this.velocity.y,this.velocity.z);
    // friction.mult(-1);
    // friction.normalize();
    // friction.mult(c);
    // this.acceleration.add(friction);

  }


  // Method to display
  this.display = function (percent, scaler) {
    if (this.launched) {
      this.p5.noStroke();
      let alpha = this.p5.map(this.lifespan, 0, 60, 255, 0);
      this.p5.fill(0, alpha);
      this.p5.textSize(30);
      this.p5.push();
      // this.p5.imageMode(this.p5.CENTER);
      this.p5.translate(this.position.x, this.position.y);
      this.p5.rotate(this.p5.radians(this.deg))
      // this.p5.tint(alpha);

      let index = this.p5.map(this.lifespan, 40, 0, 0, emojisTransparent.length - 1);
      index = this.p5.floor(index);
      if (emoji && emojisTransparent[index]) {
        // this.p5.image(emoji, 0, -24, 30, 30);
        this.p5.image(emojisTransparent[index], 0, 0);
      }
      // this.p5.noTint();
      this.p5.pop();
      // this.p5.ellipse(this.position.x,this.position.y,this.r,this.r);
    }

  }

  // Is the particle still useful?
  this.isDead = function (origin) {
    if (this.lifespan > 40) {
      this.launched = false;
    }
  }

  this.launch = function (origin) {
    if (!this.launched) {
      this.lifespan = 0;
      this.launched = true;
      this.positionOG = this.p5.createVector(origin.x, origin.y);
      this.position = this.p5.createVector(origin.x, origin.y);
      // if (this.isLeft) this.velocity = this.p5.createVector(this.p5.random(-.8,5),this.p5.random(0,.5));
      // else this.velocity = this.p5.createVector(this.p5.random(-5,.8),this.p5.random(0,.5));
      this.velocity = this.p5.createVector(this.p5.random(velX.min, velX.max), this.p5.random(velY.min, velY.max));
      return true;
    }
    return false;
  }
}

// function percentBar(p5, x, y, w) {
//   this.x = x;
//   this.y = y;
//   this.w = w;
//   this.p5 = p5;
//
//   this.display = function(percent) {
//     let swimmer = "🏊🏾";
//     let posX = this.p5.map(percent, 0, 100, this.x, this.x + this.w);
//     let posY = this.y + 10*this.p5.sin(this.p5.frameCount/10);
//
//     this.p5.textSize(40);
//     this.p5.push();
//     this.p5.scale(-1, 0);
//     this.p5.translate(this.p5.textWidth(swimmer) + this.x, this.y);
//     this.p5.text(swimmer, 0, 0);
//     this.p5.pop();
//   }
// }

function ParticleSystem(p, position, velX, velY, deg, isPlaying) {
  this.p5 = p;
  this.particles = [];
  this.numParticle = 0;
  this.origin = this.p5.createVector(position.x, position.y);
  this.percent = 0;
  // this.isLeft = true; //isLeft;
  this.launchIndex = 0;
  this.velX = velX;
  this.velY = velY;
  this.deg = deg;
  this.isPlaying = isPlaying;

  this.initParticles = function (num) {
    for (let i = 0; i < num; i++) {
      this.addParticle(i);
    }
  }

  this.launchParticle = function () {
    let p = this.particles[this.launchIndex % this.particles.length];
    if (p.launch(this.origin)) this.launchIndex++;
  }

  this.setPercent = function (percent) {
    this.percent = percent;
  }

  this.addParticle = function (id) {
    this.particles.push(new Particle(this.p5, this.origin, id, this.velX, this.velY, this.deg));
  }

  this.run = function (percent, scaler) {
    // if (this.percent > 100) this.percent = 100;
    // this.percent = this.p5.mouseX/10; //this.p5.map(this.p5.mouseX, 0, window.innerWidth, 0, 100);
    this.particles.forEach((particle) => {
      particle.run(percent, this.origin, scaler);
    });
    if (this.isPlaying) {
      this.launchParticle();
    }
  }
}
