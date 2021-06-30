import { AudioController } from '../AudioController';
import { BaseComponent } from '../BaseComponent';
import store from '../store';

export class GameCard extends BaseComponent {
  gameDiscription: HTMLDivElement;

  constructor(image:string, rusWord:string, category:string) {
    super('div', ['game-card', image]);
    const front = document.createElement('div');
    front.classList.add('game-card__front');
    this.element.appendChild(front);
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('game-card__img');
    front.appendChild(imageContainer);
    const imageCard = document.createElement('img');
    imageCard.src = `./cards/${category}/${image}.png`;
    imageContainer.appendChild(imageCard);
    this.gameDiscription = document.createElement('div');
    this.gameDiscription.classList.add('game-card__discription');
    front.appendChild(this.gameDiscription);
    const discriptionName = document.createElement('div');
    discriptionName.classList.add('game-card__discription-name');
    discriptionName.textContent = image;
    this.gameDiscription.appendChild(discriptionName);
    const discriptionBtn = document.createElement('div');
    discriptionBtn.classList.add('game-card__discription-btn-back');
    const imageDisctBtn = document.createElement('img');
    imageDisctBtn.src = 'https://img.icons8.com/material-outlined/24/4a90e2/reboot.png';
    discriptionBtn.appendChild(imageDisctBtn);

    this.gameDiscription.appendChild(discriptionBtn);
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
    this.element.addEventListener('click', () => new AudioController().clickTOCard());

    discriptionBtn.addEventListener('click', () => {
      this.element.querySelector('.game-card__front')?.classList.add('flipped-front');
      this.element.querySelector('.game-card__back')?.classList.add('flipped-back');
    });

    this.element.addEventListener('mouseleave', () => {
      this.element.querySelector('.game-card__front')?.classList.remove('flipped-front');
      this.element.querySelector('.game-card__back')?.classList.remove('flipped-back');
    });

    if (store.playMode === 'false') {
      this.element.addEventListener('click', () => this.playWord(this.element));
    }
  }

  playWord(element:HTMLElement) {
    const audio = element.classList[1].slice(0, 1).toLowerCase() + this.element.classList[1].slice(1);
    new Audio(`https://wooordhunt.ru/data/sound/sow/us/${audio}.mp3`).play();
  }

  playMode() {
    if (store.playMode === 'false') {
      this.gameDiscription.classList.add('discription_hidden');
      this.element.classList.add('play_card');
    }
  }

  trainMode() {
    if (store.playMode === 'true') {
      this.gameDiscription.classList.remove('discription_hidden');
      this.element.classList.remove('play_card');
    }
  }
}