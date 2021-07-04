export class AudioController {
  headerSwitcher: HTMLAudioElement;

  headerMenu: HTMLAudioElement;

  mouseEnterCard: HTMLAudioElement;

  clickCard: HTMLAudioElement;

  success: HTMLAudioElement;

  fail: HTMLAudioElement;

  victory: HTMLAudioElement;

  gameOver: HTMLAudioElement;

  constructor() {
    this.headerSwitcher = new Audio('./audio/switcher.wav');
    this.headerMenu = new Audio('./audio/btn.mp3');
    this.mouseEnterCard = new Audio('./audio/mouseover2.mp3');
    this.clickCard = new Audio('./audio/click.mp3');
    this.success = new Audio('./audio/success.mp3');
    this.fail = new Audio('./audio/fail.mp3');
    this.victory = new Audio('./audio/victory.mp3');
    this.gameOver = new Audio('./audio/game_over.mp3');
    this.mouseEnterCard.volume = 0.3;
    this.fail.currentTime = 0;
  }

  clickMenu() {
    this.headerMenu.play();
  }

  clickSwitcher() {
    this.headerSwitcher.currentTime = 0;
    this.headerSwitcher.play();
  }

  mouseEnterCar() {
    this.mouseEnterCard.play();
  }

  clickTOCard() {
    this.clickCard.play();
  }

  successPlay() {
    this.success.play();
  }

  failPlay() {
    this.fail.play();
  }

  victoryPlay() {
    this.victory.play();
  }

  gameOverPlay() {
    this.gameOver.play();
  }
}
