import { AudioController } from '../../Utils/AudioController';
import { BaseComponent } from '../../Utils/BaseComponent';
import './CategoryCard.scss';
import { audioToElement } from '../../Utils/addAudio';

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
    audioToElement(this.element);
  }
}
