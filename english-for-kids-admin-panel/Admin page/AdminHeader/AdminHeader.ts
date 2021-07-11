import { BaseComponent } from '../../src/assets/Utils/BaseComponent';
import './AdminHeader.scss';

export class AdminHeader extends BaseComponent {
  logout: HTMLDivElement | null;

  headerWords: HTMLDivElement | null;

  headerCategory: HTMLDivElement | null;

  constructor(element: HTMLElement) {
    super('header', ['header-admin']);
    this.element.innerHTML = `
      <div class="header-admin__routing-pages">
      <div class="header-admin__category-btn">Categories</div>
      <div class="header-admin__words-btn">Words</div>
      </div>
      <div class="header-admin__logout">Log out</div>
    `;

    this.logout = this.element.querySelector('.header-admin__logout');
    this.headerCategory = this.element.querySelector('.header-admin__category-btn');
    this.headerWords = this.element.querySelector('.header-admin__words-btn');
    this.logoutClick(element);
  }

  logoutClick(element: HTMLElement):void {
    this.logout?.addEventListener('click', () => {
      element.style.display = 'block';
      this.element.remove();
    });
  }
}
