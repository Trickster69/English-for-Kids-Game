import { AudioController } from '../AudioController';
import { BaseComponent } from '../BaseComponent';
import './CategoryCard.scss';

export class CategoryCard extends BaseComponent {
  categoryCard: HTMLDivElement;

  constructor(readonly image: string) {
    super('div', ['card', image]);
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('card__image');
    this.element.appendChild(imageWrapper);
    const imageCard = document.createElement('img');
    imageCard.src = `./category/${image}.png`;
    imageWrapper.appendChild(imageCard);
    this.categoryCard = document.createElement('div');
    this.categoryCard.classList.add('card__category');
    this.categoryCard.textContent = `${image}`;
    this.element.appendChild(this.categoryCard);

    this.element.addEventListener('mouseenter', () => new AudioController().mouseEnterCar());
    this.element.addEventListener('click', () => new AudioController().clickTOCard());
  }
}
