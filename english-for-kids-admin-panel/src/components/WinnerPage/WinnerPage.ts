import { BaseComponent } from '../../assets/Utils/BaseComponent';
import { OverlayResult } from '../OverlayResult/OverlayResult';
import './WinnerPage.scss';

export class WinnerPage extends BaseComponent {
  overlay: OverlayResult;

  winner: HTMLDivElement;

  constructor() {
    super('div', ['winner_wrapper']);
    this.overlay = new OverlayResult();
    this.element.appendChild(this.overlay.element);
    this.winner = document.createElement('div');
    this.winner.classList.add('winner');
    this.winner.innerHTML = `
    <div class="winner__image">
      <img src="./win.png" alt="win image">
    </div>
    <div class="winner__text">
      <p>Congratulations!</p>
      <p class="winner__subtitle">You did a great job!</p>
    </div>
    `;
    this.element.appendChild(this.winner);
  }
}
