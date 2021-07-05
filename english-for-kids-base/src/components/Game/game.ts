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
import { SuccessPoint } from '../Point/Point';
import { LoosePage } from '../LoosePage/LoosePage';
import { WinnerPage } from '../WinnerPage/WinnerPage';
import { OverlayResult } from '../OverlayResult/OverlayResult';
import { GameCard } from '../GameCard/GameCard';

export class Game extends BaseComponent {
  private readonly categoryFields: CategoryField;

  private readonly gameField: GameField;

  private readonly header: Header;

  private readonly navigation: Navigation;

  private readonly overlay: Overlay;

  private readonly audioController:AudioController;

  private i: number;

  // checkbox: HTMLInputElement | null;

  private word: string | undefined;

  constructor() {
    super();
    this.element.style.height = '0';
    this.gameField = new GameField();
    this.categoryFields = new CategoryField();
    this.element.appendChild(this.categoryFields.element);
    this.header = new Header();
    this.navigation = new Navigation();
    // this.checkbox = document.querySelector('#switch_checkbox');
    this.overlay = new Overlay();
    this.audioController = new AudioController();
    document.body.append(this.overlay.element);
    this.toggleMenu();
    this.i = 0;
  }

  renderGame(images: string[]): void {
    this.categoryFields.clearCategoryField();
    const cards = images.map((img) => new CategoryCard(`${img}`));

    this.changePagetoMenu(cards as CategoryCard[]);
    this.renderGameCards(cards as CategoryCard[]);
    this.switchGameMode();
    this.startGame();
  }

  startGame():void {
    this.gameField.startBtnWrap.addEventListener('click', () => {
      if (store.btnStatus === 'Start') {
        store.btnStatus = 'Repeat';
        /* TODO: fix to function */
        const index = cardsObj[0].indexOf(store.category as any);
        const arrAnimalsObjs = cardsObj[index + 1];
        const wordsArr = arrAnimalsObjs.map((key:any) => key.word.toLowerCase());
        const wordsSorted = wordsArr.sort(() => Math.random() - 0.5);

        store.storeWords = wordsSorted;

        this.playAudio(store.storeWords as string[]);
        this.waitResponse();
      } else {
        new Audio(`https://wooordhunt.ru/data/sound/sow/us/${store.word}.mp3`).play();
      }
    });
  }

  renderGameCards(cards:CategoryCard[]):void {
    cards.forEach((card) => {
      card.element.addEventListener('click', () => {
        const category = card.element.classList[1];
        this.newFieldRender(category);
        this.markerNavigationMenu(category);
      });
    });
    this.categoryFields.addCategoryCards(cards);
  }

  markerNavigationMenu(category:string):void {
    this.navigation.menuItems.forEach((item) => item.classList.remove('active_li'));
    this.navigation.menuItems.forEach((key) => {
      if (key.textContent === category) {
        key.classList.add('active_li');
      }
    });
  }

  changePagetoMenu(cards:CategoryCard[]):void {
    this.navigation.menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.textContent === 'main page') {
          store.category = 'main page';
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
  }

  playAudio(array:string[]):void {
    this.word = array.pop();
    new Audio(`https://wooordhunt.ru/data/sound/sow/us/${this.word}.mp3`).play();
    store.word = this.word;
  }

  waitResponse():void {
    this.gameField.wordsCards.forEach((card) => card.element.addEventListener('click', () => {
      const clickWord = card.element.className.split(' ')[1].toLowerCase();
      if (clickWord === store.word) {
        this.successMatch(card, clickWord);

        if (store.trueWords.length < 8) {
          setTimeout(() => {
            this.playAudio(store.storeWords as string[]);
          }, 1000);
        } else {
          this.showGameResult();
        }
      } else {
        this.failMatch();
      }
    }));
  }

  successMatch(card:GameCard, clickWord:string):void {
    card.element.classList.add('true-game-card');
    const outer = card.element.outerHTML;
    card.element.outerHTML = outer;
    store.trueWords?.push(clickWord);
    this.gameField.score.append(new SuccessPoint().addPoint('success'));
    this.audioController.successPlay();
  }

  failMatch():void {
    ++store.wrongAnswers;
    this.audioController.failPlay();
    this.gameField.score.append(new SuccessPoint().addPoint('fail'));
  }

  switchGameMode():void {
    this.header.checkbox?.addEventListener('click', () => {
      if (this.header.checkbox?.checked) {
        if (store.category === 'main page') {
          this.categoryFields.categoryCards.forEach((card) => {
            card.categoryCard.style.borderColor = 'rgb(33 201 112)';
          });
        } else {
          store.playMode = 'true';
          this.newFieldRender(store.category);
          this.gameField.startBtnWrap.classList.add('start_btn__active');
        }
      } else if (store.category === 'main page') {
        this.categoryFields.categoryCards.forEach((card) => {
          card.categoryCard.style.borderColor = '#7a2385';
        });
      } else {
        store.playMode = 'false';
        this.newFieldRender(store.category);
        this.gameField.startBtnWrap.classList.remove('start_btn__active');
      }

      this.gameField.wordsCards.forEach((card) => {
        card.playMode();
        card.trainMode();
      });
    });
  }

  newFieldRender(category:string):void {
    this.gameField.clearGameField();
    this.gameField.removeGameField();
    this.categoryFields.removeCategoryField();
    this.gameField.renderGameCards(category);
    this.element.appendChild(this.gameField.element);
  }

  showGameResult():void {
    if (store.wrongAnswers > 0) {
      const loosePage = new LoosePage();
      this.element.append(loosePage.element);
      this.closeOverlayResult(loosePage);
    } else {
      const winnerPage = new WinnerPage();
      this.element.append(winnerPage.element);
      this.closeOverlayResult(winnerPage);
    }
  }

  closeOverlayResult(resultpage: LoosePage | WinnerPage): void {
    resultpage.overlay.element.addEventListener('click', () => {
      resultpage.element.remove();
      this.newFieldRender(store.category);
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
