import { BaseComponent } from '../BaseComponent';
import './Overlay.scss';

export class Overlay extends BaseComponent {
  constructor() {
    super('div', ['overlay']);
  }
}
