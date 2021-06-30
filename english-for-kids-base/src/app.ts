import { CategoryField } from './components/CategoryField/CategoryField';
import cards from './cards';
import { Game } from './components/Game/game';
import { Switcher } from './components/switcher';
import { Header } from './components/Header/Header';

export class App {
  header: Header;
  // private readonly categoryField: CategoryField;

  constructor(private readonly rootElement: HTMLElement) {
    const images: any[] = cards[0];
    const game = new Game();
    this.header = new Header();
    game.newGame(images);
    // this.categoryField = new CategoryField();
    // this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(game.element);
    const switcher = new Switcher();
  }
}
