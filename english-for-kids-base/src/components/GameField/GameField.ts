import cards from '../../cards';
import { BaseComponent } from '../BaseComponent';
import { GameCard } from '../GameCard/GameCard';
import store from '../store';
import './GameField.scss';

export class GameField extends BaseComponent {
  wordsCards: GameCard[] = [];

  checkbox: HTMLInputElement | null;

  startBtnWrap: HTMLDivElement;

  startBtn: HTMLButtonElement;

  constructor() {
    super('div', ['game-cards-field']);
    this.startBtnWrap = document.createElement('div');
    this.startBtnWrap.classList.add('start_btn');
    this.startBtn = document.createElement('button');
    this.startBtn.classList.add('start');
    this.startBtn.textContent = 'Start';
    this.startBtnWrap.appendChild(this.startBtn);
    this.checkbox = document.querySelector('#switch_checkbox');
  }

  removeGameField():void {
    this.element.remove();
  }

  clearGameField():void {
    this.wordsCards = [];
    this.element.innerHTML = '';
  }

  renderGameCards(category:any):void {
    const index = cards[0].indexOf(category);
    this.clearGameField();
    const arrAnimalsObjs = cards[index + 1];

    const wordsArr = arrAnimalsObjs.map((key:any) => key.word);
    const translateArr = arrAnimalsObjs.map((key:any) => key.translation);

    for (let i = 0; i < wordsArr.length; i++) {
      this.wordsCards.push(new GameCard(wordsArr[i], translateArr[i], category));
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

    this.element.appendChild(this.startBtnWrap);
  }
}
