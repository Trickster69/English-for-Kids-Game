import { addLocalSorage } from './assets/Utils/addLocalStorage';
import cards from './cards';
import { Game } from './components/Game/game';
import { Header } from './components/Header/Header';
import { ICards } from './components/Icards';

export class App {
  header: Header;

  arrayObj:any[];

  constructor(private readonly rootElement: HTMLElement) {
    const images: string[] = cards[0];
    const game = new Game();
    this.header = new Header();
    game.renderGame(images);
    this.rootElement.appendChild(game.element);
    this.arrayObj = cards.slice(1);

    addLocalSorage(this.arrayObj as any);
  }
}
