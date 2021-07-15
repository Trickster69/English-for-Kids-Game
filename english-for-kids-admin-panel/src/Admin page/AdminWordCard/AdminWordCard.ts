import { BaseComponent } from '../../Utils/BaseComponent';
import './AdminWordCard.scss';
import { audioToElement } from '../../Utils/addAudio';

export class AdminWordCard extends BaseComponent {
  mainSideCard: HTMLElement | null;

  changeSideCard: HTMLElement | null;

  audioShowWord: HTMLElement | null;

  removeWordBtn: NodeListOf<Element>;

  constructor(word:string, translation:string, sound:string, category:string) {
    super('div', ['admin-word-card']);
    this.element.innerHTML = `
    <div class="admin-word-card__main-card">
      <div class="admin-word-card__close-btn close-btn_admin"></div>
      <div class="admin-word-car__word word_bold-text">
        Word: <span class="word_normal-text new-word_word">${word}</span>
      </div>
      <div class="admin-word-car__translation word_bold-text">
        Translation: <span class="word_normal-text new-word_translation">${translation}</span>
      </div>
      <div class="admin-word-car__sound word_bold-text">
        Sound file:
        <audio preload="none" controlsList="nodownload" src="https://wooordhunt.ru/data/sound/sow/us/${sound}.mp3" class="audio_word" controls="false"></audio><br>
      </div>
      <div class="admin-word-car__image-wrapper">
        <div class="admin-word-car__image__title word_bold-text">Image: </div>
        <div class="admin-word-car__image">
          <img class="word-image" src="./cards/${category}/${word}.png" alt="">
        </div>
      </div>
      <button class="admin-word-car__change-btn">Change</button>
    </div>

    <div class="admin-word-card__change-card">
      <div class="admin-word-card__close-btn close-btn_admin"></div>
      <form class="form-change-word" action="">
        <input type="text" name="" placeholder="Word" class="input_new-word new_word-translation new_word-word" value="${word}" required>
        <input type="text" name="" placeholder="Translation" class="input_new-word" value="${translation}" required>
        <div class="new_sound">
          <label for="file" class="label">Sound:</label>
          <input type="file" name="" accept="audio/*"  class="custom-file-input sound-input input_change-audio">
        </div>
        <div class="new_image">
          <label for="file" class="label">Image:</label>
          <input type="file" name="" accept="image/*" class="custom-file-input image-input">
        </div>
        <input type="submit" value="Submit" class="change-word_btn submit_change-word">
      </form>
      <button class="change-word_btn cancel_change-word">Cancel</button>
    </div>`;
    this.removeWordBtn = this.element.querySelectorAll('.admin-word-card__close-btn');
    this.mainSideCard = this.element.querySelector('.admin-word-card__main-card');
    this.changeSideCard = this.element.querySelector('.admin-word-card__change-card');
    this.audioShowWord = this.element.querySelector('.new-word_word_sound');
    this.audioShowWord?.addEventListener('click', () => {
      if (this.audioShowWord) {
        new Audio(`https://wooordhunt.ru/data/sound/sow/us/${sound}.mp3`).play();
      }
    });
    audioToElement(this.element);
    this.removeWordCard();
    this.changeBtnFlipped();
    this.cancelChangeCard();
    this.submitChangeCard();
  }

  removeWordCard():void {
    this.removeWordBtn?.forEach((element) => {
      element.addEventListener('click', () => {
        this.element.remove();
      });
    });
  }

  changeBtnFlipped(): void {
    const changeBtn = this.element.querySelector('.admin-word-car__change-btn');
    changeBtn?.addEventListener('click', () => {
      this.flipToBackSide();
    });
  }

  flipToBackSide():void {
    this.mainSideCard?.classList.add('flipped-front');
    this.changeSideCard?.classList.add('flipped-back');
  }

  flipToMainSide(): void {
    if (this.mainSideCard && this.changeSideCard) {
      this.mainSideCard.classList.remove('flipped-front');
      this.changeSideCard.classList.remove('flipped-back');
    }
  }

  clearInputs(): void {
    const allWordCardInputs = this.element.querySelectorAll('input');
    allWordCardInputs.forEach((input) => {
      if (!input.classList.contains('submit_change-word')) {
        input.value = '';
      }
    });
  }

  cancelChangeCard(): void {
    const cancelBtn = this.element.querySelector('.cancel_change-word');
    cancelBtn?.addEventListener('click', () => {
      this.flipToMainSide();
    });
  }

  submitChangeCard(): void {
    const formChangeWord = this.element.querySelector('.form-change-word');
    const wordChangeInput: HTMLInputElement | null = this.element.querySelector('.new_word-word');
    const translateChangeInput: HTMLInputElement | null = this.element.querySelector('.new_word-translation');
    const imageChangeInput: HTMLInputElement | null = this.element.querySelector('.image-input');
    const audioChangeInput : HTMLInputElement | null = this.element.querySelector('.input_change-audio');
    const audio: HTMLAudioElement | null = this.element.querySelector('.audio_word');

    if (audioChangeInput) {
      audioChangeInput.addEventListener('change', (e:Event) => {
        const target = e.target as HTMLInputElement;
        if (audio) {
          if (!target.files) return;
          audio.src = URL.createObjectURL(target?.files[0]);
        }
      });
    }

    imageChangeInput?.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;
      const selectedFile = target.files[0];
      const reader = new FileReader();
      const imageShowSide: HTMLImageElement | null = this.element.querySelector('.word-image');
      if (imageShowSide) imageShowSide.title = selectedFile.name;
      reader.onload = function (ev) {
        if (imageShowSide) imageShowSide.src = ev.target ? ev.target.result as string : 'nul';
      };
      reader.readAsDataURL(selectedFile);
    });

    const wordShowSide: HTMLElement | null = this.element.querySelector('.new-word_word');
    const translateShowSide: HTMLElement | null = this.element.querySelector('.new-word_translation');
    formChangeWord?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (wordShowSide) wordShowSide.innerHTML = wordChangeInput?.value as string;
      if (translateShowSide) translateShowSide.innerHTML = translateChangeInput?.value as string;
      this.flipToMainSide();
    });
  }
}
