import cards from '../../cards';
import { BaseComponent } from '../../Utils/BaseComponent';
import { GameCard } from '../GameCard/GameCard';
import { ICards } from '../Icards';
import store from '../store';
import './GameField.scss';

export class GameField extends BaseComponent {
  wordsCards: GameCard[] = [];

  private checkbox: HTMLInputElement | null;

  startBtnWrap: HTMLDivElement;

  startBtn: HTMLButtonElement;

  score: HTMLDivElement;

  succseesPoint: HTMLImageElement;

  constructor() {
    super('div', ['game-cards-field']);
    this.startBtnWrap = document.createElement('div');
    this.startBtnWrap.classList.add('start_btn');
    this.startBtn = document.createElement('button');
    this.startBtn.classList.add('start');
    this.startBtn.textContent = 'Start';
    this.startBtnWrap.appendChild(this.startBtn);
    this.checkbox = document.querySelector('#switch_checkbox');
    this.changeStartBtnText();
    this.score = document.createElement('div');
    this.score.classList.add('score');

    this.succseesPoint = document.createElement('img');
    this.succseesPoint.classList.add('success-point');
    this.succseesPoint.src = './success.svg';
  }

  clearScore() {
    this.score.innerHTML = '';
  }

  removeGameField(): void {
    this.element.remove();
  }

  clearGameField(): void {
    this.wordsCards = [];
    this.element.innerHTML = '';
  }

  changeStartBtnText(): void {
    this.startBtnWrap.addEventListener('click', () => {
      this.startBtn.textContent = 'Repeat';
    });
  }

  renderGameCards(category: string): void {
    const index = cards[0].indexOf(category);
    this.clearGameField();
    const arrAnimalsObjs = cards[index + 1];

    const wordsArr = arrAnimalsObjs.map((key: ICards | undefined | string) => {
      if (typeof key === 'object') {
        return key.word.toLowerCase();
      }
      return undefined;
    });
    const translateArr = arrAnimalsObjs.map(
      (key: ICards | undefined | string) => {
        if (typeof key === 'object') {
          return key.translation;
        }
        return undefined;
      },
    );

    for (let i = 0; i < wordsArr.length; i++) {
      this.wordsCards.push(
        new GameCard(wordsArr[i] as string, translateArr[i] as string, category),
      );
    }

    this.wordsCards.forEach((card) => {
      if (store.playMode === 'false') {
        card.gameDiscription.classList.remove('discription_hidden');
        card.element.classList.remove('play_card');
      } else {
        card.gameDiscription.classList.add('discription_hidden');
        card.element.classList.add('play_card');
      }
      this.element.appendChild(card.element);
    });
    store.category = category;
    this.clearGame();
    this.element.appendChild(this.startBtnWrap);
    this.element.appendChild(this.score);
    this.clearScore();
  }

  clearGame(): void {
    store.trueWords = [];
    store.btnStatus = 'Start';
    store.wrongAnswers = 0;
    this.startBtn.textContent = 'Start';
  }
}
