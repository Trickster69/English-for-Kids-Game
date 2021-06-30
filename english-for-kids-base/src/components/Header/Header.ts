import { AudioController } from '../AudioController';
import { BaseComponent } from '../BaseComponent';
import store from '../store';
import './Header.scss';

export class Header extends BaseComponent {
  checkbox: HTMLInputElement | null;

  burger: HTMLDivElement;

  constructor() {
    super('header');
    this.element.innerHTML = `
      <div class="header__container">
        <div class="header__item">
          <input type="checkbox" id="menu_checkbox">
          <label for="menu_checkbox" class="burger">
            <div></div>
            <div></div>
            <div></div>
          </label>
        </div>

        <div class="header__game-mode">
          <div class="header__train-mode">Train</div>
          <label class="switch">
            <input type="checkbox" id="switch_checkbox" ${store.playMode === 'true' ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
          <div class="header__play-mode disabled">Play</div>
        </div>
      </div>
    `;
    this.burger = this.element.querySelector('.burger') as HTMLDivElement;
    this.burger.addEventListener('click', () => new AudioController().clickMenu());
    this.checkbox = this.element.querySelector('#switch_checkbox');
    this.checkbox?.addEventListener('change', () => {
      if (this.checkbox?.checked) {
        store.playMode = 'true';
      } else {
        store.playMode = 'false';
      }
    });
  }
}
