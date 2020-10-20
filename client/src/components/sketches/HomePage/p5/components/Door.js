
import {doorCrossing, boundaryCrossing} from './Boundaries';


export default class Door {

  constructor (p5, i, config) {

    const outsideDoorsInit = [
      {x0: 21 , y0: 5, x1: 26, y1: 5, to:"outside"}, // top
      {x0: 0 , y0: 6, x1: 0, y1: 11, to:"outside"}, // left
      {x0: 12 , y0: 27, x1: 18, y1: 27, to:"outside"}, // bottom
      {x0: 21 , y0: 15, x1: 26, y1: 15, to:"outside"}, // right
    ];

    this.p5 = p5;
    this.point = outsideDoorsInit[i];
    this.config = config;
  }


  display(p5=this.p5, scaler=this.config.scaler) {
      p5.line(this.point.x0*scaler, this.point.y0*scaler, this.point.x1*scaler, this.point.y1*scaler);
  }

  doorCrossing(userStep) {
    return doorCrossing(userStep, this.point, this.config);
  }
}
