import { BaseComponent } from '../BaseComponent';
import './SuccessPoin.scss';

export class SuccessPoint extends BaseComponent {
  succseesPoint: HTMLImageElement;

  constructor() {
    super('div', ['success-point-wrap']);
    this.succseesPoint = document.createElement('img');
  }

  addSuccessPoin() {
    this.succseesPoint.classList.add('success-point');
    this.succseesPoint.src = './success.svg';
    this.element.appendChild(this.succseesPoint);
    return this.element;
  }

  addFailPoin() {
    this.succseesPoint.classList.add('success-point');
    this.succseesPoint.src = './loose.svg';
    this.element.appendChild(this.succseesPoint);
    return this.element;
  }
}
