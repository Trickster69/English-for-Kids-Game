import './styles.scss';
// import { Click } from './clicl';
import { Game } from './components/game';

const burger = document.querySelector('label');
burger?.addEventListener('click', () => {
  console.log('show');
  document.querySelector('.menu')?.classList.toggle('show');
});
// const game = new Game();
// el?.addEventListener('change', () => {
//   console.log((el as any).prop('checked', true));
// });

// function gameFieldMode() {

// }
