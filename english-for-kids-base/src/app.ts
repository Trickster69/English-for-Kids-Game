import { addLocalSorage } from './assets/Utils/addLocalStorage';
import cards from './cards';
import { Game } from './components/Game/game';
import { ICards } from './components/Icards';

export class App {
  arrayObj: (string[] | ICards[])[];

  constructor(private readonly rootElement: HTMLElement) {
    const images: string[] = cards[0];
    const game = new Game();
    game.renderGame(images);
    this.rootElement.appendChild(game.element);
    this.arrayObj = cards.slice(1);
    addLocalSorage(this.arrayObj as never);
  }
}
