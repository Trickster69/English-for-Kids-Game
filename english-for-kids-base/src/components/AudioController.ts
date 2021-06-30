export class AudioController {
  headerSwitcher: HTMLAudioElement;

  headerMenu: HTMLAudioElement;

  mouseEnterCard: HTMLAudioElement;

  clickCard: HTMLAudioElement;

  constructor() {
    this.headerSwitcher = new Audio('./audio/switcher.wav');
    this.headerMenu = new Audio('./audio/btn.mp3');
    this.mouseEnterCard = new Audio('./audio/mouseover2.mp3');
    this.clickCard = new Audio('./audio/click.mp3');
    this.mouseEnterCard.volume = 0.3;
  }

  clickMenu() {
    this.headerMenu.play();
  }

  clickSwitcher() {
    this.headerSwitcher.play();
  }

  mouseEnterCar() {
    this.mouseEnterCard.play();
  }

  clickTOCard() {
    this.clickCard.play();
  }
}
