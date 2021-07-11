import { BaseComponent } from '../../src/assets/Utils/BaseComponent';
import './AdminHeader.scss';

export class AdminHeader extends BaseComponent {
  constructor() {
    super('header', ['header-admin']);
    this.element.innerHTML = `
      <div class="header-admin__routing-pages">
      <div class="header-admin__category-btn">Categories</div>
      <div class="header-admin__words-btn">Words</div>
      </div>
      <div class="header-admin__logout">Log out</div>
    `;
  }
}
