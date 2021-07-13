import { BaseComponent } from '../../Utils/BaseComponent';
import './AdminCategoryCard.scss';

export class AdminCategoryCard extends BaseComponent {
  removeCategoryCard: NodeListOf<Element>;

  reviewSideCategory: HTMLElement | null;

  changeSideCategory: HTMLElement | null;

  nameCategory: HTMLElement | null;

  addWordBtn: HTMLElement | null;

  constructor(category:string, count: string | number) {
    super('div', ['admin-category-card']);
    this.element.id = category;
    this.element.innerHTML = `

      <div class="admin-category-card__review-block">
        <div class="admin-category-card__close-btn close-btn_admin"></div>
        <div class="admin-category-card__title">${category}</div>
        <div class="admin-category-card__words-count">Words:
          <span id="word-count">${count}</span>
        </div>
        <div class="admin-category-card__btns">
          <button class="admin-category-card__update-btn category_btn">Update</button>
          <div class="admin-category-card__add-word-btn category_btn">Add word</div>
        </div>
      </div>

      <div class="admin-category-card__change-block">
        <div class="admin-category-card__close-btn close-btn_admin"></div>
        <form action="" class="form_create-card">
          <input value="${category}" type="text" name="category-name" placeholder="Category name"
          class="category_admin-input" required>
          <div class="admin-category-card__btns">
            <div class="category_btn new-card_cancel">Cancel</div>
            <input type="submit" value="Sumbit" class="category_btn new-card_create">
          </div>
        </form>
      </div>
    `;
    this.removeCategoryCard = this.element.querySelectorAll('.admin-category-card__close-btn');
    this.reviewSideCategory = this.element.querySelector('.admin-category-card__review-block');
    this.changeSideCategory = this.element.querySelector('.admin-category-card__change-block');
    this.nameCategory = this.element.querySelector('.admin-category-card__title');
    this.addWordBtn = this.element.querySelector('.admin-category-card__add-word-btn');
    this.removeCard();
    this.changeCard();
    this.clickToCancel();
    this.changeCategory();
  }

  flipToChangeSide():void {
    this.reviewSideCategory?.classList.add('flipped-front');
    this.changeSideCategory?.classList.add('flipped-back');
  }

  clickToCancel():void {
    const cancelBtn = this.element.querySelector('.new-card_cancel');
    cancelBtn?.addEventListener('click', () => this.flipToReviewSide());
  }

  changeCategory():void {
    const form = this.element.querySelector('.form_create-card');
    const formInput : HTMLInputElement | null = this.element.querySelector('.category_admin-input');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.nameCategory) this.nameCategory.innerHTML = formInput?.value as string;
      this.flipToReviewSide();
    });
  }

  flipToReviewSide():void {
    this.reviewSideCategory?.classList.remove('flipped-front');
    this.changeSideCategory?.classList.remove('flipped-back');
  }

  changeCard():void {
    const updateBtn = this.element.querySelector('.admin-category-card__update-btn');
    updateBtn?.addEventListener('click', () => {
      this.flipToChangeSide();
    });
  }

  removeCard():void {
    /* Добавить удаление из хранилища */
    this.removeCategoryCard?.forEach((element) => {
      element.addEventListener('click', () => {
        this.element.remove();
      });
    });
  }
}
