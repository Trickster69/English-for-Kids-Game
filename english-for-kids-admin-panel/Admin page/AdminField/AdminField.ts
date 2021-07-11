import { BaseComponent } from '../../src/assets/Utils/BaseComponent';
import './AdminField.scss';

export class AdminField extends BaseComponent {
  categoryBtn: HTMLDivElement;

  newCategoryCard: HTMLDivElement;

  newWordCard: HTMLDivElement;

  constructor() {
    super('div', ['admin-category-field']);
    this.categoryBtn = document.createElement('div');
    this.newCategoryCard = document.createElement('div');
    this.newWordCard = document.createElement('div');
  }

  getCategoryBtn(): HTMLDivElement {
    this.categoryBtn.classList.add('select-category-word');
    this.categoryBtn.innerHTML = `
    <button class="select-category-word__menu-btn">Category</button>
    <div class="select-category-word__items">
      <div>Подраздел 1</div>
      <div>Подраздел 2</div>
      <div>Подраздел 3</div>
      <div>Подраздел 4</div>
      <div>Подраздел 5</div>
    </div>`;
    return this.categoryBtn;
  }

  getNewCategoryCard(): HTMLDivElement {
    this.newCategoryCard.classList.add('admin-new-category-card');
    this.newCategoryCard.innerHTML = `
      <div title = "Create new Category
      " class="admin-new-card__button">
        <div class="admin-new-card__title">Create new Category</div>
      </div>
      `;
    return this.newCategoryCard;
  }

  getNewWordCard(): HTMLDivElement {
    this.newWordCard.classList.add('admin-new-word-card');
    this.newWordCard.innerHTML = `
    <div title = "Add new word
    " class="admin-new-card__button">
    <div class="admin-new-card__title">Add new word</div>
    </div>
    `;
    return this.newWordCard;
  }
}
