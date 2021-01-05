import Draggable from './Draggable/Draggable';
import { wineLocation, djLocation, domCoordsToP5World } from '../../constants';

export default class Bar extends Draggable {

    constructor(id, shadow, p5) {
        super(id, 0, 0, 0, 0, p5, null);

        this.shadow = shadow;

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

        
        // if (this.isFlipped) {
            // shadow / glow
            this.displayShadow();

            this.displaySolidBack(this.p5.color(255));
            this.p5.translate(0, this.barH);

            this.p5.push();
            // this.p5.scale(-1, 1);
            this.p5.translate(5, 40);
            this.displayBarContents();

            this.p5.pop();
        // }
        // else {

        //     // shadow / glow
        //     this.p5.push();
        //     this.p5.translate(0, this.barH);
        //     this.p5.scale(-1, 1);
        //     this.p5.image(this.shadow, -backW + 20, backY, backW, backH);
        //     this.p5.pop();

        //     this.displaySolidBack(this.p5.color(255));
        //     this.p5.translate(0, this.barH);

        //     this.p5.textFont('times', 40);

        //     this.displayBarContents();

        //     this.p5.pop();
        // }



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
            this.displayWine();
        else if (this.id === 2)
            this.displayCocktail();
        else
            this.displayDJ();
    }

    displayCheese() {
        for (let i = 0; i < 6; i++) {
            this.p5.text("🧀", 0, i * 40);
            this.p5.text("🥖", 40, i * 40);
        }

    }

    displayWine() {
        for (let i = 0; i < 4; i++) {
            this.p5.text("🍷", 0, i * 40);
            this.p5.text("🍷", 40, i * 40);
        }

    }

    displayCocktail() {
        for (let i = 0; i < 4; i++) {
            this.p5.text("🍸", 0, i * 40);
            this.p5.text("🍸", 40, i * 40);
        }

    }


    displayDJ() {
        let emojis = "🎛️🎛️🎚️🎚️🎤🔈";
        this.p5.text(emojis, 0, 0);
    }

}
