import { BaseComponent } from '../../src/assets/Utils/BaseComponent';
import { AdminCategoryCard } from '../AdminCategoryCard/AdminCategoryCard';
import { AdminWordCard } from '../AdminWordCard/AdminWordCard';
import './AdminField.scss';

export class AdminField extends BaseComponent {
  categoryCards: AdminCategoryCard[] = [];

  // categoryCard: AdminCategoryCard;

  categoryWords: string[] = [];

  countCategoryWord = {};

  wordsCards: AdminWordCard[] = [];

  categoryBtn: HTMLDivElement;

  newCategoryCard: HTMLDivElement;

  newWordCard: HTMLDivElement;

  // localItems: string[];

  // localCategories: string[];

  constructor() {
    super('div', ['admin-category-field']);
    // this.categoryCard = new AdminCategoryCard();
    this.categoryBtn = document.createElement('div');
    this.newCategoryCard = document.createElement('div');
    this.newWordCard = document.createElement('div');

    this.getCategoryWords();

    this.element.appendChild(this.getCategoryBtn());
    // this.element.appendChild(this.categoryCard.element);
    // this.renderCategoryCard();
    this.renderWordsCard('clothing');
  }

  renderCategoryCard() {
    this.getCategoryWords();
    const arrCount = Object.entries(this.countCategoryWord);
    arrCount.forEach((key) => {
      const [word, count] = key;
      this.element.appendChild(new AdminCategoryCard(word, count as number).element);
    });
    this.element.appendChild(this.getNewCategoryCard());
    // this.categoryWords.forEach((key) => {
    //   this.element.appendChild(new AdminCategoryCard(key, 8).element);
    // });
    console.log(this.categoryCards);
  }

  // eslint-disable-next-line class-methods-use-this
  renderWordsCard(category:string):void {
    const localItems = Object.keys(localStorage);
    // const arr = [];
    localItems.forEach((key) => {
      const storageItem = localStorage.getItem(key);
      if (storageItem) {
        if (JSON.parse(storageItem).category === category) {
          const storageObj = JSON.parse(storageItem);
          console.log(storageObj);
          this.element.appendChild(new AdminWordCard(storageObj.word, storageObj.translation, storageObj.word, category).element);
        }
      }
      // localStorage.getItem(key);
      // console.log(localStorage.getItem(key));
    });
    this.element.appendChild(this.getNewWordCard());
  }

  clearField() {
    this.element.innerHTML = '';
  }

  getCategoryBtn(): HTMLDivElement {
    this.categoryBtn.classList.add('select-category-word');
    const selectCategoryBtn = document.createElement('button');
    selectCategoryBtn.textContent = 'Category';
    selectCategoryBtn.classList.add('select-category-word__menu-btn');
    this.categoryBtn.appendChild(selectCategoryBtn);
    const categoryItems = document.createElement('div');
    categoryItems.classList.add('select-category-word__items');
    this.categoryBtn.appendChild(categoryItems);
    this.categoryWords.forEach(((category) => {
      categoryItems.innerHTML += `<div>${category}</div>`;
    }));
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
    " class="admin-new-card__button new_circle">
    <div class="admin-new-card__title">Add new word</div>
    </div>
    `;
    return this.newWordCard;
  }

  getCategoryWords(): void {
    const localItems = Object.keys(localStorage);
    interface IcountObj {
      [index: string]: number;
    }

    const countCategory: IcountObj = {};
    const categoriesAllArray: string[] = [];
    localItems.forEach((key) => {
      const localItem = localStorage.getItem(key);
      if (localItem) {
        const wordItem = JSON.parse(localItem).category;
        if (countCategory[wordItem] !== undefined) {
          ++countCategory[wordItem];
        } else {
          countCategory[wordItem] = 1;
        }
        if (!categoriesAllArray.includes(wordItem)) {
          categoriesAllArray.push(wordItem);
        }
      }
    });
    this.countCategoryWord = countCategory;
    this.categoryWords = categoriesAllArray;
  }
}
