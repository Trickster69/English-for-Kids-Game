import { BaseComponent } from '../../assets/Utils/BaseComponent';
import './Point.scss';

export class SuccessPoint extends BaseComponent {
  succseesPoint: HTMLImageElement;

  constructor() {
    super('div', ['point-wrap']);
    this.succseesPoint = document.createElement('img');
  }

  addPoint(status: string): HTMLElement {
    this.succseesPoint.classList.add('point');
    this.succseesPoint.src = `./${status}.png`;
    this.element.appendChild(this.succseesPoint);
    return this.element;
  }
}
