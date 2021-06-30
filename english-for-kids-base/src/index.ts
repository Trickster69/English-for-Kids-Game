import './styles.scss';
import { Switcher } from './components/switcher';
import { App } from './app';

window.onload = () => {
  const app = new App(document.body);
};

// import { Click } from './clicl';

const burger = document.querySelector('label');
burger?.addEventListener('click', () => {
  console.log('show');
  // new Audio('https://wooordhunt.ru/data/sound/sow/us/welcome.mp3').play();

  document.querySelector('.menu')?.classList.toggle('show');
});
// const game = new Switcher();
