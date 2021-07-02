import { BaseComponent } from '../BaseComponent';
import { CategoryCard } from '../CategoryCard/CategoryCard';
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
    this.categoryCards.forEach((card) => {
      this.element.appendChild(card.element);
    });
  }
}
