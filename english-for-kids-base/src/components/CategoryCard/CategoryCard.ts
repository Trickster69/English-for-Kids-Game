import { AudioController } from '../AudioController';
import { BaseComponent } from '../BaseComponent';
import './CategoryCard.scss';

export class CategoryCard extends BaseComponent {
  constructor(readonly image: string) {
    super('div', ['card', image]);

    this.element.innerHTML = `
      <div class="card__image">
        <img src="./category/${image}.png" alt="">
      </div>
      <div class="card__category">${image}</div>
    `;

    this.element.addEventListener('mouseenter', () => new AudioController().mouseEnterCar());
    this.element.addEventListener('click', () => new AudioController().clickTOCard());
  }
}
