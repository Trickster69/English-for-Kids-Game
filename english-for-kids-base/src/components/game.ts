export class Game {
  checkbox: HTMLInputElement | null;

  category: NodeListOf<Element>;

  headerPlayMode: HTMLInputElement | null;

  headerTrainMode: HTMLInputElement | null;

  constructor() {
    this.checkbox = document.querySelector('#switch_checkbox');
    this.category = document.querySelectorAll('.card__category');
    this.headerPlayMode = document.querySelector('.header__play-mode');
    this.headerTrainMode = document.querySelector('.header__train-mode');
    this.switchMode();
  }

  switchMode() {
    this.checkbox?.addEventListener('change', () => {
      if (this.checkbox?.checked) {
        this.category?.forEach((category) => {
          category.classList.add('play_mode');
        });
        this.headerPlayMode?.classList.remove('disabled');
        this.headerTrainMode?.classList.add('disabled');
        console.log('Актив');
      } else {
        this.category?.forEach((category) => {
          category.classList.remove('play_mode');
        });
        this.headerPlayMode?.classList.add('disabled');
        this.headerTrainMode?.classList.remove('disabled');
        console.log('Выкл');
      }
    });
  }
}
