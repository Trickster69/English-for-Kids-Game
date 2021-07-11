import { BaseComponent } from '../../src/assets/Utils/BaseComponent';
import './AdminWordCard.scss';

export class AdminWordCard extends BaseComponent {
  constructor(word:string, translation:string, image:string, category:string) {
    super('div', ['admin-word-card']);
    this.element.innerHTML = `
    <div class="admin-word-card__main-card">
      <div class="admin-word-card__close-btn close-btn_admin"></div>
      <div class="admin-word-car__word word_bold-text">
        Word: <span id="new-word_word" class="word_normal-text">${word}</span>
      </div>
      <div class="admin-word-car__translation word_bold-text">
        Translation: <span id="new-word_translation" class="word_normal-text">${translation}</span>
      </div>
      <div class="admin-word-car__sound word_bold-text">
        Sound file: <span id="new-word_word_sound" class="word_normal-text">${word}.mp3</span>
      </div>
      <div class="admin-word-car__image-wrapper">
        <div class="admin-word-car__image__title word_bold-text">Image: </div>
        <div class="admin-word-car__image">
          <img src="./cards/${category}/${image}.png" alt="">
        </div>
      </div>
      <button class="admin-word-car__image__change-btn">Change</button>
    </div>

    <div class="admin-word-card__change-card">
      <div class="admin-word-card__close-btn close-btn_admin"></div>
      <form action="">
        <input type="text" name="" id="new_word-word" placeholder="Word" class="input_new-word" required>
        <input type="text" name="" id="new_word-translation" placeholder="Translation" class="input_new-word" required>
        <div class="new_sound">
          <label for="file" class="label">Sound:</label>
          <input type="file" name="" id="" required class="custom-file-input sound-input">
        </div>
        <div class="new_image">
          <label for="file" class="label">Image:</label>
          <input type="file" name="" id="" required class="custom-file-input image-input">
        </div>
        <input type="submit" value="Submit" class="change-word_btn submit_change-word">
        <button class="change-word_btn cancel_change-word">Cancel</button>
      </form>
    </div>`;
  }
}
