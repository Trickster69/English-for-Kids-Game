import { BaseComponent } from '../BaseComponent';
import { OverlayResult } from '../OverlayResult/OverlayResult';
import store from '../store';
import './LoosePage.scss';

export class LoosePage extends BaseComponent {
  overlay: OverlayResult;

  loose: HTMLDivElement;

  constructor() {
    super('div', ['loose-wrapper']);
    this.overlay = new OverlayResult();
    this.element.appendChild(this.overlay.element);
    this.loose = document.createElement('div');
    this.loose.classList.add('loose');
    this.loose.innerHTML = `
      <div class="loose__image">
      <img src="./loose.png" alt="">
      </div>
      <div class="loose__text">
        <p> Keep trying!</p>
        <p>Next time you'll win!</p>
      </div>
      <div class="loose__mistakes">
        <span>Wrong answers:</span>
        <span class="wrong_answers">${store.wrongAnswers}</span>
      </div>
    `;
    this.element.appendChild(this.loose);
  }
}
