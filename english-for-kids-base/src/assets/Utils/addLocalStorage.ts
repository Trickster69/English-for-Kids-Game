export function addLocalSorage(array: []):void {
  if (!localStorage.key('Rings' as any)) {
    localStorage.clear();
    array.forEach((category: any[]) => category.forEach((card) => {
      const obj = {
        category: card.category,
        word: card.word,
        translation: card.translation,
        clicks: 0,
        correct: 0,
        wrong: 0,
        errors: 0,
      };
      localStorage.setItem(obj.word, JSON.stringify(obj));
    }));
  }
}
