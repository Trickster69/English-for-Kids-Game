import { CategoryField } from './components/CategoryField/CategoryField';
import cards from './cards';
import { Game } from './components/Game/game';
import { Header } from './components/Header/Header';
import { ICards } from './components/Icards';
import { Score } from './components/Score/Score';

export class App {
  header: Header;
  // private readonly categoryField: CategoryField;

  constructor(private readonly rootElement: HTMLElement) {
    const images: string[] = cards[0];
    const game = new Game();
    this.header = new Header();
    game.renderGame(images);
    // this.categoryField = new CategoryField();
    // this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(game.element);
    // const switcher = new Switcher();
    const arrayObj: any[] = cards.slice(1);

    if (!localStorage.key('Rings' as any)) {
      localStorage.clear();
      arrayObj.forEach((category: any[]) => category.forEach((card) => {
        const obj = {
          category: card.category,
          word: card.word,
          translation: card.translation,
          clicks: 0,
          correct: 0,
          wrong: 0,
        };
        localStorage.setItem(obj.word, JSON.stringify(obj));
      }));
    }
    // const score = new Score();
    // this.rootElement.appendChild(score.element);
  }
}
