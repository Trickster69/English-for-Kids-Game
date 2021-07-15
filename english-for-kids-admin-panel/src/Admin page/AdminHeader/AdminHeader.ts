import store from '../../components/store';
import { AudioController } from '../../Utils/AudioController';
import { BaseComponent } from '../../Utils/BaseComponent';
import './AdminHeader.scss';

export class AdminHeader extends BaseComponent {
  routingPages: HTMLDivElement;

  logout: HTMLDivElement;

  categoriesBtn: HTMLDivElement;

  wordsBtn: HTMLDivElement;

  audioController: AudioController;

  constructor(element: HTMLElement) {
    super('header', ['header-admin']);
    this.routingPages = document.createElement('div');
    this.routingPages.classList.add('header-admin__routing-pages');
    this.element.appendChild(this.routingPages);
    this.logout = document.createElement('div');
    this.logout.classList.add('header-admin__logout', 'header-admin_btn');
    this.logout.textContent = 'Log out';
    this.element.appendChild(this.logout);

    this.categoriesBtn = document.createElement('div');
    this.categoriesBtn.classList.add('header-admin__category-btn', 'header-admin_btn');
    this.categoriesBtn.textContent = 'Categories';
    this.wordsBtn = document.createElement('div');
    this.wordsBtn.classList.add('header-admin__words-btn', 'header-admin_btn');
    this.wordsBtn.textContent = 'Words';
    this.routingPages.appendChild(this.categoriesBtn);
    this.routingPages.appendChild(this.wordsBtn);

    this.audioController = new AudioController();
    this.audioToClick();
  }

  logoutClick(gamePage: HTMLElement, adminPage: HTMLElement):void {
    this.logout?.addEventListener('click', () => {
      gamePage.style.display = 'block';
      store.login = false;
      adminPage.remove();
    });
  }

  audioToClick():void {
    const headerBtns = this.element.querySelectorAll('.header-admin_btn');
    headerBtns.forEach((btn) => btn.addEventListener('click', () => {
      this.audioController.clickMenu();
    }));
  }
}
