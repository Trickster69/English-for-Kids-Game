export function addPoint(word:string, point:string): void {
  const animal = word.slice(0, 1).toUpperCase() + word.slice(1);
  const objRow = localStorage.getItem(animal as string);
  const cont = JSON.parse(objRow as string);
  ++cont[point];
  localStorage.setItem(animal, JSON.stringify(cont));
}
