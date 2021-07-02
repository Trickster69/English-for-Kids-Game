import { BaseComponent } from '../BaseComponent';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { CategoryField } from '../CategoryField/CategoryField';
import { GameField } from '../GameField/GameField';
import { Header } from '../Header/Header';
import { Navigation } from '../Navigation/Navigation';
import store from '../store';
import { Overlay } from '../Overlay/Overlay';
import { AudioController } from '../AudioController';
import cardsObj from '../../cards';

export class Game extends BaseComponent {
  private readonly categoryFields: CategoryField;

  private readonly gameField: GameField;

  private readonly header: Header;

  private readonly navigation: Navigation;

  private readonly overlay: Overlay;

  private i: number;

  checkbox: HTMLInputElement | null;

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
    this.toggleMenu();
    this.i = 0;
  }

  newGame(images: string[]): void {
    this.categoryFields.clearCategoryField();
    const cards = images.map((img) => new CategoryCard(`${img}`));

    this.navigation.menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.textContent === 'main page') {
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

        this.navigation.menuItems.forEach((item) => item.classList.remove('active_li'));
        this.navigation.menuItems.forEach((key) => {
          if (key.textContent === category) {
            key.classList.add('active_li');
          }
        });
        // store.category = category;
      });
    });
    this.categoryFields.addCategoryCards(cards);
    this.switchGameMode();

    //кнопка старт
    this.gameField.startBtnWrap.addEventListener('click', () => {
      //TODO: fix to function
      const index = cardsObj[0].indexOf(store.category as any);
      const arrAnimalsObjs = cardsObj[index + 1];
      const wordsArr = arrAnimalsObjs.map((key:any) => key.word.toLowerCase());
      const wordsSorted = wordsArr.sort(() => Math.random() - 0.5);

      store.storeWords = wordsSorted;

      this.playAudio(store.storeWords as string[]);
      this.waitResponse();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  playAudio(array:string[]):void {
    const word = array.pop();
    new Audio(`https://wooordhunt.ru/data/sound/sow/us/${word}.mp3`).play();
    store.word = word;
    // this.waitResponse();
  }

  waitResponse():void {
    console.log('ckjdj');

    this.gameField.wordsCards.forEach((card) => card.element.addEventListener('click', () => {
      const clickWord = card.element.className.split(' ')[1].toLowerCase();
      if (clickWord === store.word) {
        console.log('верно');
        setTimeout(() => {
          this.playAudio(store.storeWords as string[]);
        }, 3000);
      } else {
        console.log('мимо');
      }
    }));
  }

  gameCycle(array: string[]):void {
    new Audio(`https://wooordhunt.ru/data/sound/sow/us/${array[this.i]}.mp3`).play();
    this.gameField.wordsCards.forEach((card) => card.element.addEventListener('click', () => {
      const clickWord = card.element.className.split(' ')[1].toLowerCase();
      if (array[this.i] === clickWord) {
        console.log('ПРАВИЛЬНО');
        card.element.style.backgroundColor = 'green';
        ++this.i;
        if (this.i <= 7) {
          this.gameCycle(array);
        } else if (this.i === 8) {
          console.log('ПОБЕДА');
        }
      }
      if (array[this.i] !== clickWord) {
        console.log('ERROOOOOR');
      }
    }));
  }

  switchGameMode():void {
    this.header.checkbox?.addEventListener('click', () => {
      if (this.header.checkbox?.checked) {
        store.playMode = 'true';
        this.gameField.startBtnWrap.classList.add('start_btn__active');
        this.categoryFields.categoryCards.forEach((card) => {
          // card.categoryCard.style.color = 'rgb(60 231 194)';
          card.categoryCard.style.color = 'rgb(33 201 112)';
        });
      } else {
        store.playMode = 'false';
        this.gameField.startBtnWrap.classList.remove('start_btn__active');
        this.categoryFields.categoryCards.forEach((card) => {
          card.categoryCard.style.color = '#b383d4';
        });
      }
      this.gameField.wordsCards.forEach((card) => {
        card.playMode();
        card.trainMode();
      });
    });
  }

  toggleMenu():void {
    this.element.appendChild(this.header.element);
    this.element.appendChild(this.navigation.element);

    this.header.burger.addEventListener('click', () => {
      this.navigation.element.classList.toggle('show');
      this.overlay.element.classList.toggle('overlay_active');
    });

    this.navigation.menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.overlay.element.classList.remove('overlay_active');
      });
    });

    this.overlay.element.addEventListener('click', () => {
      new AudioController().clickMenu();
      this.navigation.element.classList.remove('show');
      this.overlay.element.classList.remove('overlay_active');
    });
  }
}
