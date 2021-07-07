import './Game.Card.scss';
import { AudioController } from '../../assets/Utils/AudioController';
import { BaseComponent } from '../../assets/Utils/BaseComponent';
import { addPoint } from '../../assets/Utils/AddPoint';
import store from '../store';

export class GameCard extends BaseComponent {
  gameDiscription: HTMLDivElement;

  front: HTMLDivElement;

  discriptionBtn: HTMLDivElement;

  constructor(image:string, rusWord:string, category:string) {
    super('div', ['game-card', image]);
    this.front = document.createElement('div');
    this.front.classList.add('game-card__front');
    this.element.appendChild(this.front);
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('game-card__img');
    this.front.appendChild(imageContainer);
    const imageCard = document.createElement('img');
    imageCard.src = `./cards/${category}/${image}.png`;
    imageContainer.appendChild(imageCard);
    this.gameDiscription = document.createElement('div');
    this.gameDiscription.classList.add('game-card__discription');
    this.front.appendChild(this.gameDiscription);
    const discriptionName = document.createElement('div');
    discriptionName.classList.add('game-card__discription-name');
    discriptionName.textContent = image;
    this.gameDiscription.appendChild(discriptionName);
    this.discriptionBtn = document.createElement('div');
    this.discriptionBtn.classList.add('game-card__discription-btn-back');
    const imageDisctBtn = document.createElement('img');
    imageDisctBtn.src = 'https://img.icons8.com/material-outlined/24/4a90e2/reboot.png';
    this.discriptionBtn.appendChild(imageDisctBtn);

    this.gameDiscription.appendChild(this.discriptionBtn);
    const backCard = document.createElement('div');
    backCard.classList.add('game-card__back');
    backCard.innerHTML = `
        <div class="game-card__img">
          <img src="./cards/${category}/${image}.png" alt="">
          </div>
          <div class="game-card__discription">
            <div class="game-card__discription-name">${rusWord}</div>
        </div>
    `;
    this.element.appendChild(backCard);

    this.element.addEventListener('mouseenter', () => new AudioController().mouseEnterCar());
    this.flipCard();
  }

  flipCard():void {
    this.discriptionBtn.addEventListener('click', () => {
      this.element.querySelector('.game-card__front')?.classList.add('flipped-front');
      this.element.querySelector('.game-card__back')?.classList.add('flipped-back');
    });

    this.element.addEventListener('mouseleave', () => {
      this.element.querySelector('.game-card__front')?.classList.remove('flipped-front');
      this.element.querySelector('.game-card__back')?.classList.remove('flipped-back');
    });

    this.front.addEventListener('click', () => {
      if (store.playMode === 'false') {
        new Audio(`https://wooordhunt.ru/data/sound/sow/us/${this.element.classList[1].toLowerCase()}.mp3`).play();
      }
      if (store.startGame) {
        addPoint(this.element.classList[1], 'clicks');
      }
    });
  }

  playMode():void {
    if (store.playMode === 'true') {
      this.gameDiscription.classList.add('discription_hidden');
      this.element.classList.add('play_card');
    }
  }

  trainMode():void {
    if (store.playMode === 'false') {
      this.gameDiscription.classList.remove('discription_hidden');
      this.element.classList.remove('play_card');
    }
  }
}
