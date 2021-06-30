import { AudioController } from '../AudioController';
import { BaseComponent } from '../BaseComponent';
import { Overlay } from '../Overlay/Overlay';
import store from '../store';
import './Navigation.scss';

export class Navigation extends BaseComponent {
  menuItems : NodeListOf<HTMLLIElement>;

  // private overlay: Overlay;

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
    // this.overlay = new Overlay();
    // document.body.append(this.overlay.element);

    this.menuItems = this.element.querySelectorAll('li');
    this.menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.menuItems.forEach((key) => {
          key.classList.remove('active_li');
        });
        item.classList.add('active_li');
      });
    });

    this.menuItems.forEach((item) => item.addEventListener('mouseenter', () => new AudioController().mouseEnterCar()));

    this.menuItems.forEach((item) => item.addEventListener('click', () => new AudioController().clickTOCard()));

    // this.overlay.element.addEventListener('click', () => {
    //   this.element.classList.remove('show');
    //   console.log('show');
    //   console.log(this.overlay.element);
    //   this.overlay.element.classList.remove('overlay_active');
    // });
  }
}
