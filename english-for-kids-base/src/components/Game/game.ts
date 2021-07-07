import { BaseComponent } from '../../assets/Utils/BaseComponent';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { CategoryField } from '../CategoryField/CategoryField';
import { GameField } from '../GameField/GameField';
import { Header } from '../Header/Header';
import { Navigation } from '../Navigation/Navigation';
import store from '../store';
import { Overlay } from '../Overlay/Overlay';
import { AudioController } from '../../assets/Utils/AudioController';
import cardsObj from '../../cards';
import { SuccessPoint } from '../Point/Point';
import { LoosePage } from '../LoosePage/LoosePage';
import { WinnerPage } from '../WinnerPage/WinnerPage';
import { OverlayResult } from '../OverlayResult/OverlayResult';
import { GameCard } from '../GameCard/GameCard';
import { ICards } from '../Icards';
import { addPoint } from '../../assets/Utils/AddPoint';
import { Score } from '../Stats/Stats';
import { Footer } from '../Footer/Footer';

export class Game extends BaseComponent {
  private readonly categoryFields: CategoryField;

  private readonly gameField: GameField;

  private readonly header: Header;

  private readonly footer: Footer;

  private readonly navigation: Navigation;

  private readonly overlay: Overlay;

  private readonly audioController:AudioController;

  private readonly statistic: Score;

  private word: string | undefined;

  constructor() {
    super();
    this.element.style.height = '0';
    this.gameField = new GameField();
    this.categoryFields = new CategoryField();
    this.element.appendChild(this.categoryFields.element);
    this.header = new Header();
    this.footer = new Footer();
    this.navigation = new Navigation();
    this.statistic = new Score();
    this.overlay = new Overlay();
    this.audioController = new AudioController();
    document.body.append(this.overlay.element);
    this.toggleMenu();
  }

  renderGame(images: string[]): void {
    this.categoryFields.clearCategoryField();
    const cards = images.map((img) => new CategoryCard(`${img}`));
    this.element.appendChild(this.header.element);
    this.element.appendChild(this.navigation.element);
    this.changePagetoMenu(cards as CategoryCard[]);
    this.renderCards(cards as CategoryCard[]);
    this.switchGameMode();
    this.startGame();
    this.element.appendChild(this.footer.element);
  }

  startGame():void {
    this.gameField.startBtnWrap.addEventListener('click', () => {
      if (store.btnStatus === 'Start') {
        store.startGame = true;
        store.btnStatus = 'Repeat';
        const index = cardsObj[0].indexOf(store.category as string);
        const arrAnimalsObjs = cardsObj[index + 1];
        const wordsArr = arrAnimalsObjs.map((key:ICards | undefined| string) => {
          if (typeof key === 'object') {
            return key.word.toLowerCase();
          }
          return undefined;
        });

        const wordsSorted = wordsArr.sort(() => Math.random() - 0.5);
        store.storeWords = wordsSorted;

        this.playWordAudio(store.storeWords as string[]);
        this.waitResponse();
      } else {
        new Audio(`https://wooordhunt.ru/data/sound/sow/us/${store.word}.mp3`).play();
      }
    });
  }

  renderCards(cards:CategoryCard[]):void {
    cards.forEach((card) => {
      card.element.addEventListener('click', () => {
        const category = card.element.classList[1];
        if (store.playMode === 'true') {
          this.gameField.startBtnWrap.classList.add('start_btn__active');
        } else {
          this.gameField.startBtnWrap.classList.remove('start_btn__active');
        }

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
          this.clearFields();
          this.categoryFields.addCategoryCards(cards);
          this.element.appendChild(this.categoryFields.element);
        } else if (item.textContent === 'statistic') {
          store.category = 'statistic';
          this.clearFields();
          this.statistic.repeatField.remove();
          this.statistic.getTableData();
          this.statistic.renderTableData();
          this.element.appendChild(this.statistic.element);
        } else {
          this.clearFields();
          this.gameField.renderGameCards(item.textContent as string);
          this.element.appendChild(this.gameField.element);
        }
      });
    });
  }

  clearFields(): void {
    this.statistic.removeScore();
    this.categoryFields.removeCategoryField();
    this.gameField.removeGameField();
    this.gameField.clearGameField();
  }

  playWordAudio(array:string[]):void {
    this.word = array.pop();
    new Audio(`https://wooordhunt.ru/data/sound/sow/us/${this.word}.mp3`).play();
    if (!this.word) {
      throw new Error('check word');
    }
    store.word = this.word;
  }

  waitResponse():void {
    this.gameField.wordsCards.forEach((card) => card.element.addEventListener('click', () => {
      const clickWord = card.element.className.split(' ')[1].toLowerCase();
      if (clickWord === store.word) {
        this.successMatch(card, clickWord);

        if (store.trueWords.length < 8) {
          setTimeout(() => {
            this.playWordAudio(store.storeWords as string[]);
          }, 1000);
        } else {
          this.showGameResult();
          store.startGame = false;
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
    this.deletePoints();
    this.audioController.successPlay();
    addPoint(clickWord, 'correct');
  }

  deletePoints():void {
    if (this.gameField.score.childNodes.length > 8) {
      this.gameField.score.childNodes[0].remove();
    }
  }

  failMatch():void {
    ++store.wrongAnswers;
    this.audioController.failPlay();
    this.gameField.score.append(new SuccessPoint().addPoint('fail'));
    addPoint(store.word, 'wrong');
    this.deletePoints();
  }

  switchGameMode():void {
    this.header.checkbox?.addEventListener('click', () => {
      if (this.header.checkbox?.checked) {
        if (store.category === 'main page') {
          this.categoryFields.categoryCards.forEach((card) => {
            card.categoryCard.style.borderColor = 'rgb(33 201 112)';
          });
        } else if (store.category === 'statistic') {
          return;
        } else {
          store.playMode = 'true';
          this.newFieldRender(store.category);
          this.gameField.startBtnWrap.classList.add('start_btn__active');
        }
      } else if (store.category === 'main page') {
        this.categoryFields.categoryCards.forEach((card) => {
          card.categoryCard.style.borderColor = '#7a2385';
        });
      } else if (store.category === 'statistic') {
        return;
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
      new AudioController().gameOverPlay();
      const loosePage = new LoosePage();
      this.element.append(loosePage.element);
      this.closeOverlayResult(loosePage);
    } else {
      new AudioController().victoryPlay();
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
