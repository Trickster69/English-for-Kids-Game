import { BaseComponent } from '../BaseComponent';
import './Point.scss';

export class SuccessPoint extends BaseComponent {
  succseesPoint: HTMLImageElement;

  constructor() {
    super('div', ['success-point-wrap']);
    this.succseesPoint = document.createElement('img');
  }

  addPoint(status:string):HTMLElement {
    this.succseesPoint.classList.add('success-point');
    this.succseesPoint.src = `./${status}.png`;
    this.element.appendChild(this.succseesPoint);
    return this.element;
  }
}
