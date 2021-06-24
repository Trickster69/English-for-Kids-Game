import './styles.scss';
import { Click } from './clicl';

console.log('Hello world');

const h1: HTMLElement | null = document.querySelector('h1');
if (!h1) {
  throw new Error('dsfsdf');
}
const click = new Click(h1);
click.click();
