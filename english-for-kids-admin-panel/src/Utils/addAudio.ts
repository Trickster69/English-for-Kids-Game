import { AudioController } from './AudioController';

export function audioToElement(element: Element | HTMLElement) {
  const audioController = new AudioController();
  element.addEventListener('mouseenter', () => audioController.mouseEnterCar());
  element.addEventListener('click', () => audioController.clickTOCard());
}
