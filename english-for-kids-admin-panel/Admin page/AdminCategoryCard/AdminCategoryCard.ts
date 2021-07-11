import { BaseComponent } from '../../src/assets/Utils/BaseComponent';
import './AdminCategoryCard.scss';

export class AdminCategoryCard extends BaseComponent {
  constructor() {
    super('div', ['admin-category-card']);
    this.element.innerHTML = `
      <div class="admin-category-card__review-block ">
      <div class="admin-category-card__close-btn close-btn_admin"></div>
      <div class="admin-category-card__title">Clothes</div>
      <div class="admin-category-card__words-count">Words: <span id="word-count">8</span></div>
      <div class="admin-category-card__btns">
        <button class="admin-category-card__update-btn category_btn">Update</button>
        <div class="admin-category-card__add-word-btn category_btn">Add word</div>
      </div>
      </div>

      <div class="admin-category-card__change-block hide_change">
        <form action="" class="form_create-card">
          <input type="text" name="category-name" id="" placeholder="Category name"
          class="category_admin-input" required>
          <div class="admin-category-card__btns">
            <button class="category_btn new-card_cancel">Cancel</button>
            <input type="submit" value="Create" class="category_btn new-card_create">
          </div>
        </form>
      </div>
    `;
  }
}