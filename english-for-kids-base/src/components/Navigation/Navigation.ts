import { AudioController } from '../AudioController';
import { BaseComponent } from '../BaseComponent';
import store from '../store';
import './Navigation.scss';

export class Navigation extends BaseComponent {
  menuItems : NodeListOf<HTMLLIElement>;

  constructor() {
    super('nav', ['menu']);
    this.element.innerHTML = `
      <ul>
        <li>main page</li>
        <li>animals</li>
        <li>animals2</li>
        <li>clothing</li>
        <li>gastronomy</li>
        <li>music</li>
        <li>sport</li>
        <li>toys</li>
        <li>travel</li>
      </ul>
    `;

    this.menuItems = this.element.querySelectorAll('li');
    this.menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.menuItems.forEach((key) => {
          key.style.color = 'white';
        });
        item.style.color = 'red';
      });
    });
    this.menuItems.forEach((item) => item.addEventListener('mouseenter', () => new AudioController().mouseEnterCar()));
  }
}
