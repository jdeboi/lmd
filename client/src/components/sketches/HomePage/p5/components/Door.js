
import { doorLineCrossing } from './Boundaries';
import { outsideDoors } from '../../constants';

export default class Door {

  constructor(p5, i, config) {

    this.p5 = p5;
    this.point = outsideDoors[i];
    this.config = config;
  }


  display(p5 = this.p5, scaler = this.config.scaler) {
    p5.line(this.point.x0 * scaler, this.point.y0 * scaler, this.point.x1 * scaler, this.point.y1 * scaler);
  }

  doorCrossing(prevStop, userStep) {
    return doorLineCrossing(prevStop, userStep, this.point, this.config);
  }
}
