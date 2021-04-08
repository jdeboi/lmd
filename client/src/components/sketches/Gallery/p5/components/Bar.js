import Draggable from './Draggable/Draggable';
import { wineLocation, djLocation, domCoordsToP5World } from '../../constants';

export default class Bar extends Draggable {

    constructor(id, shadow, p5) {
        super(id, 0, 0, 0, 0, p5, null);

        this.shadow = shadow;

        // cheese
        if (id === 0) {
            this.img0 = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/bread.png");
            this.img1 = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/cheese.png");
        }
        // wine
        else if (id === 1)
            this.img0 = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/wine.png");
        // cocktail
        else if (id === 2)
            this.img0 = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/cocktail.png");
        // dj
        else {
            this.img0 = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/knobs.png");
            this.img1 = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/microphone.png");
            this.img2 = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/speaker.png");
        }

        // cheese, wine, cocktail
        if (id < 3) {
            var bar = wineLocation[id];
            var point = domCoordsToP5World(bar.x, bar.y);
            this.x = point.x;
            this.y = point.y;
            this.w = 86;
            this.h = bar.h;
            this.isFlipped = false; //bar.flipped;

        }

        else {
            var bar = djLocation;
            var point = domCoordsToP5World(bar.x, bar.y);

            // var point = domCoordsToP5World(0, 0);
            this.x = point.x;
            this.y = point.y;
            this.w = 210;
            this.h = 52;
            this.isFlipped = true;
        }

        if (id > 0 && id < 3)
            this.h += 25;


    }



    displayContent(userX, userY) {
        this.p5.push();


        // shadow / glow
        this.displayShadow();

        this.displaySolidBack(this.p5.color(255));
        this.p5.translate(0, this.barH);

        this.p5.push();
        // this.p5.scale(-1, 1);
        this.p5.translate(5, 40);
        this.displayBarContents();

        this.p5.pop();


        this.p5.pop();

        this.displayFrame();
    }

    displayShadow() {

        var backW = this.w * 1.25;
        var backH = this.h * 1.2;
        if (this.isFlipped) {
            backW = this.w * 1.17;
            backH = this.h * 1.25;
        }
        var backY = 0;

        this.p5.push();
        this.p5.translate(0, this.barH);
        this.p5.image(this.shadow, 0, backY, backW, backH);
        this.p5.pop();
    }

    displayBarContents() {
        this.p5.textFont('times');
        this.p5.textSize(34);
        if (this.id === 0)
            this.displayCheese();
        else if (this.id === 1)
            this.displayBev();
        else if (this.id === 2)
            this.displayBev();
        else
            this.displayDJ();
    }

    displayCheese() {
        let sz = 34;
        for (let i = 0; i < 6; i++) {
            this.p5.image(this.img0, 0, i * 40 - 30, sz, sz);
            this.p5.image(this.img1, 40, i * 40 - 30, sz, sz);
        }

    }

    // displayWine() {
    //     let sz = 34;
    //     for (let i = 0; i < 4; i++) {
    //         // this.p5.text("🍷", 0, i * 40);
    //         // this.p5.text("🍷", 40, i * 40);
    //         this.p5.image(this.img0, 0, i * 40, sz, sz);
    //         this.p5.image(this.img0, 40, i * 40, sz, sz);
    //     }

    // }

    displayBev() {
        let sz = 34;
        for (let i = 0; i < 4; i++) {
            // this.p5.text("🍸", 0, i * 40);
            // this.p5.text("🍸", 40, i * 40);
            this.p5.image(this.img0, 0, i * 40 - 30, sz, sz);
            this.p5.image(this.img0, 40, i * 40 - 30, sz, sz);
        }

    }


    displayDJ() {
        // let emojis = "🎛️🎛️🎚️🎚️🎤🔈";
        // this.p5.text(emojis, 0, 0);
        let y = -33;
        let xsp = 34;
        let sz = 34;
        this.p5.image(this.img2, 0, y, sz, sz);
        this.p5.image(this.img0, xsp, y, sz, sz);
        this.p5.image(this.img0, xsp*2, y, sz, sz);
        this.p5.image(this.img0, xsp*3, y, sz, sz);
        this.p5.image(this.img1, xsp * 4, y, sz, sz);
        this.p5.image(this.img2, xsp * 5, y, sz, sz);
    }

}
