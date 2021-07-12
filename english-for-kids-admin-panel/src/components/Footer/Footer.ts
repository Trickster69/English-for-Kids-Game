import { BaseComponent } from '../../Utils/BaseComponent';
import './Footer.scss';

export class Footer extends BaseComponent {
  constructor() {
    super('footer', ['footer']);
    this.element.innerHTML = `
      <div class="footer_gitHub">
        <a href="http://github.com/Trickster69">
          <img src="./GitHub_Logo.png" alt="">
        </a>
      </div>
      <div class="footer__year">2021 © English for Kids</div>
      <div class="footer__rs">
        <a href="https://rs.school/js/">
        <img src="./rs_school_js.svg" alt=""></a>
      </div>
    `;
  }
}
