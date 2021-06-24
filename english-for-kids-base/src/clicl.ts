export class Click {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  click() {
    this.element.addEventListener('click', () => {
      console.log('Check click to h1');
    });
  }
}
