import { BaseComponent } from '../BaseComponent';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import store from '../store';
import './CategoryField.scss';

export class CategoryField extends BaseComponent {
  categoryCards: CategoryCard[] = [];

  constructor() {
    super('div', ['categories']);
  }

  clearCategoryField():void {
    this.categoryCards = [];
    this.element.innerHTML = '';
  }

  removeCategoryField():void {
    this.element.remove();
  }

  addCategoryCards(cards: CategoryCard[]):void {
    this.categoryCards = cards;
    this.changeColortoCards();
    this.categoryCards.forEach((card) => {
      this.element.appendChild(card.element);
    });
  }

  changeColortoCards():void {
    if (store.playMode === 'true') {
      this.categoryCards.forEach((card) => {
        card.categoryCard.style.borderColor = 'rgb(33, 201, 112)';
      });
    } else {
      this.categoryCards.forEach((card) => {
        card.categoryCard.style.borderColor = 'rgb(122, 35, 133)';
      });
    }
  }
}
