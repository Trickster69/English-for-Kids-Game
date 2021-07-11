import { AudioController } from '../../assets/Utils/AudioController';
import { BaseComponent } from '../../assets/Utils/BaseComponent';
import { OverlayResult } from '../OverlayResult/OverlayResult';
import store from '../store';
import './LoginField.scss';

export class LoginField extends BaseComponent {
  readonly cancelBtn: HTMLInputElement | null;

  readonly loginBtn: HTMLButtonElement | null;

  readonly overlay: OverlayResult;

  readonly form: HTMLFormElement | null;

  readonly loginInput: HTMLFormElement | null;

  readonly passInput: HTMLFormElement | null;

  readonly loginField: HTMLFormElement | null;

  constructor() {
    super('div', ['login-field-wrapper']);
    this.element.innerHTML = `
      <div class="login-field">
        <div class="login-field__title">Login</div>
        <form class="form">
          <div class="login-field__login">
            <input type="text" name="login" id="" class="login login-field_input" placeholder="login" required>
          </div>
          <div class="login-field__pass">
            <input type="password" name="password" id="" class="password login-field_input" placeholder="password" required>
          </div>
          <div class="login-field__buttons">
            <button class="login-field__cancel-btn login-field_btn">Cancel</button>
            <input type="submit" value="Login" class="login-field__login-btn login-field_btn">
          </div>
        </form>
        <div class="login-field__login-data">
          (login/password = admin)
        </div>
      </div>
    `;
    this.overlay = new OverlayResult();
    this.element.appendChild(this.overlay.element);
    this.form = this.element.querySelector('.form');
    this.loginField = this.element.querySelector('.login-field');
    this.loginBtn = this.element.querySelector('.login-field__cancel-btn');
    this.cancelBtn = this.element.querySelector('.login-field__cancel-btn');
    this.loginInput = this.element.querySelector('.login');
    this.passInput = this.element.querySelector('.password');
    this.cancelBtn?.addEventListener('click', () => this.element.remove());
    // this.validForm();
  }

  validForm(element: HTMLElement):void {
    this.form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.loginInput?.value === 'admin' && this.passInput?.value === 'admin') {
        store.login = true;
        this.loginInput.value = '';
        this.passInput.value = '';
        this.element.remove();
        element.style.display = 'none';
      } else {
        new AudioController().failPlay();
        this.loginField?.classList.add('error');
        setTimeout(() => {
          this.loginField?.classList.remove('error');
        }, 400);
      }
    });
  }
}
