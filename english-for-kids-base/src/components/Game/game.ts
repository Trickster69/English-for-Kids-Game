import { BaseComponent } from '../BaseComponent';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { CategoryField } from '../CategoryField/CategoryField';
import { GameField } from '../GameField/GameField';
import { Header } from '../Header/Header';
import { Navigation } from '../Navigation/Navigation';
import store from '../store';
import cards1 from '../../cards';
import { Overlay } from '../Overlay/Overlay';

export class Game extends BaseComponent {
  private readonly categoryFields: CategoryField;

  private readonly gameField: GameField;

  private readonly header: Header;

  private readonly navigation: Navigation;

  private readonly overlay: Overlay;

  checkbox: HTMLInputElement | null;

  // header: Header;

  constructor() {
    super();
    this.gameField = new GameField();
    this.categoryFields = new CategoryField();
    this.element.appendChild(this.categoryFields.element);
    this.header = new Header();
    this.navigation = new Navigation();
    this.checkbox = document.querySelector('#switch_checkbox');
    this.overlay = new Overlay();
    document.body.append(this.overlay.element);
  }

  newGame(images: string[]): void {
    this.element.appendChild(this.header.element);
    this.element.appendChild(this.navigation.element);

    this.header.burger.addEventListener('click', () => {
      this.navigation.element.classList.toggle('show');
      this.overlay.element.classList.toggle('overlay_active');
      console.log(this.overlay.element);
    });

    this.overlay.element.addEventListener('click', () => {
      this.navigation.element.classList.remove('show');
      this.overlay.element.classList.remove('overlay_active');
    });

    this.categoryFields.clearCategoryField();
    const cards = images.map((img) => new CategoryCard(`${img}`));

    this.navigation.menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.textContent === 'main page') {
          const images1: any[] = cards1[0];
          this.categoryFields.removeCategoryField();
          this.gameField.removeGameField();
          this.categoryFields.addCategoryCards(cards);
          this.element.appendChild(this.categoryFields.element);
        } else {
          this.gameField.clearGameField();
          this.gameField.removeGameField();
          this.categoryFields.removeCategoryField();
          this.gameField.renderGameCards(item.textContent);
          this.element.appendChild(this.gameField.element);
        }
      });
    });

    cards.forEach((card) => {
      card.element.addEventListener('click', () => {
        const category = card.element.classList[1];
        this.categoryFields.removeCategoryField();
        this.gameField.clearGameField();
        this.gameField.renderGameCards(category);
        this.element.appendChild(this.gameField.element);

        // this.header.checkbox?.addEventListener('click', () => {
        //   console.log('изменили');//не работает.
        //   card.element.classList.add('play_card');
        // });
      });
    });

    this.categoryFields.addCategoryCards(cards);
  }
}
