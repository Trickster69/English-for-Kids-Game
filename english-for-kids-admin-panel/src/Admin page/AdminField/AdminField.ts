import store from '../../components/store';
import { BaseComponent } from '../../Utils/BaseComponent';
import { AdminCategoryCard } from '../AdminCategoryCard/AdminCategoryCard';
import { AdminHeader } from '../AdminHeader/AdminHeader';
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

  readonly adminHeader: AdminHeader;

  adminCategoryField: HTMLDivElement;

  // localItems: string[];

  // localCategories: string[];

  constructor(element: HTMLElement) {
    super('div', ['admin-field']);
    this.adminCategoryField = document.createElement('div');
    this.adminCategoryField.classList.add('admin-category-field');
    this.adminHeader = new AdminHeader(this.element);
    this.adminHeader.logoutClick(element, this.element);
    this.element.append(this.adminHeader.element);
    this.element.appendChild(this.adminCategoryField);

    // this.categoryCard = new AdminCategoryCard();
    this.categoryBtn = document.createElement('div');
    this.newCategoryCard = document.createElement('div');
    this.newWordCard = document.createElement('div');
    this.getCategoryWords();
    this.changeAdminPage();
    // this.adminCategoryField.appendChild(this.categoryCard.element);
    this.renderCategoryCard();
    // this.renderWordsCard(store.adminCategory);
  }

  changeAdminPage():void {
    this.adminHeader.wordsBtn.addEventListener('click', () => {
      this.clearField();
      this.renderWordsCard(store.adminCategory);
    });

    this.adminHeader.categoriesBtn.addEventListener('click', () => {
      this.clearField();
      this.renderCategoryCard();
    });
  }

  renderCategoryCard() {
    this.getCategoryWords();
    const arrCount = Object.entries(this.countCategoryWord);
    arrCount.forEach((key) => {
      const [word, count] = key;
      this.adminCategoryField.appendChild(new AdminCategoryCard(word, count as number).element);
    });
    this.adminCategoryField.appendChild(this.getNewCategoryCard());
  }

  renderWordsCard(category:string):void {
    this.adminCategoryField.innerHTML = '';
    const localItems = Object.keys(localStorage);
    localItems.forEach((key) => {
      const storageItem = localStorage.getItem(key);
      if (storageItem) {
        if (JSON.parse(storageItem).category === category) {
          const storageObj = JSON.parse(storageItem);
          this.adminCategoryField.appendChild(new AdminWordCard(storageObj.word, storageObj.translation, storageObj.word.toLowerCase(), category).element);
        }
      }
    });
    this.adminCategoryField.appendChild(this.getCategoryBtn());
    this.adminCategoryField.appendChild(this.getNewWordCard());
  }

  clearField() {
    this.adminCategoryField.innerHTML = '';
  }

  getCategoryBtn(): HTMLDivElement {
    this.categoryBtn.classList.add('select-category-word');
    this.categoryBtn.innerHTML = '';
    const selectCategoryBtn = document.createElement('button');
    selectCategoryBtn.textContent = 'Category';
    selectCategoryBtn.classList.add('select-category-word__menu-btn');
    this.categoryBtn.appendChild(selectCategoryBtn);
    const categoryItems = document.createElement('div');
    categoryItems.classList.add('select-category-word__items');
    this.categoryBtn.appendChild(categoryItems);
    this.categoryWords.forEach(((category) => {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add(`${category}`);
      categoryDiv.innerHTML = `${category}`;
      categoryItems.append(categoryDiv);
      categoryDiv.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        store.adminCategory = target.innerText;
        this.adminCategoryField.innerHTML = '';
        this.renderWordsCard(store.adminCategory);
      });
    }));
    return this.categoryBtn;
  }

  getNewCategoryCard(): HTMLDivElement {
    this.newCategoryCard.classList.add('admin-new-category-card');
    this.newCategoryCard.innerHTML = `
      <div title = "Create new Category
      " class="admin-new-card__button">
      </div>
      `;
    return this.newCategoryCard;
  }

  removeAdminpage() {
    this.element.remove();
  }

  getNewWordCard(): HTMLDivElement {
    this.newWordCard.classList.add('admin-new-word-card');
    this.newWordCard.innerHTML = `
    <div title = "Add new word
    " class="admin-new-card__button new_circle">
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
