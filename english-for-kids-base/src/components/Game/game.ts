import { BaseComponent } from '../BaseComponent';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { CategoryField } from '../CategoryField/CategoryField';
import { GameField } from '../GameField/GameField';
import { Header } from '../Header/Header';
import { Navigation } from '../Navigation/Navigation';
import store from '../store';
import cards1 from '../../cards';

export class Game extends BaseComponent {
  private readonly categoryFields: CategoryField;

  private readonly gameField: GameField;

  private readonly header: Header;

  private readonly navigation: Navigation;

  checkbox: HTMLInputElement | null;

  // header: Header;

  constructor() {
    super();
    this.gameField = new GameField();
    this.categoryFields = new CategoryField();
    this.element.appendChild(this.categoryFields.element);
    this.header = new Header();
    this.navigation = new Navigation();
    this.header.element.addEventListener('click', () => console.log('click to header'));
    this.checkbox = document.querySelector('#switch_checkbox');
  }

  newGame(images: string[]): void {
    this.element.appendChild(this.header.element);
    this.element.appendChild(this.navigation.element);
    this.header.burger.addEventListener('click', () => this.navigation.element.classList.toggle('show'));

    this.categoryFields.clearCategoryField();
    const cards = images.map((img) => new CategoryCard(`${img}`));

    this.navigation.menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.textContent === 'main Page') {
          const images1: any[] = cards1[0];
          const game = new Game();
          game.newGame(images1);
          this.element.appendChild(game.element);
          // this.categoryFields.addCategoryCards(cards);
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

        this.header.checkbox?.addEventListener('change', () => {
          console.log('изменили');//не работает.
          card.element.classList.add('play_card');
        });
      });
    });

    this.categoryFields.addCategoryCards(cards);
  }
}
