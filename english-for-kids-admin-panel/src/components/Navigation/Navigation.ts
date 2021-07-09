import { AudioController } from '../../assets/Utils/AudioController';
import { BaseComponent } from '../../assets/Utils/BaseComponent';
import './Navigation.scss';

export class Navigation extends BaseComponent {
  menuItems : NodeListOf<HTMLLIElement>;

  constructor() {
    super('nav', ['menu']);
    this.element.innerHTML = `
      <ul>
        <li class="active_li">main page</li>
        <li>animals</li>
        <li>animals2</li>
        <li>clothing</li>
        <li>gastronomy</li>
        <li>music</li>
        <li>sport</li>
        <li>toys</li>
        <li>travel</li>
        <li class="statistic">statistic</li>
        <li class="login">login</li>
      </ul>
    `;
    this.menuItems = this.element.querySelectorAll('li');
    this.selectNavigationItem();

    this.menuItems.forEach((item) => item.addEventListener('click', () => {
      new AudioController().clickTOCard();
      this.element.classList.remove('show');
    }));
  }

  selectNavigationItem() {
    this.menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.menuItems.forEach((key) => {
          key.classList.remove('active_li');
        });
        item.classList.add('active_li');
      });
    });
  }
}
