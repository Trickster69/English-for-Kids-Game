import { AudioController } from '../../Utils/AudioController';
import { BaseComponent } from '../../Utils/BaseComponent';
import { Iobj } from '../Iobj';
import { GameCard } from '../GameCard/GameCard';
import './Stats.scss';

export class Score extends BaseComponent {
  private readonly table: HTMLTableElement;

  private readonly resetBtn: HTMLButtonElement;

  private readonly repeatWords: HTMLButtonElement;

  repeatField: HTMLDivElement;

  thead: HTMLTableSectionElement;

  tbody: HTMLTableSectionElement;

  tableData: any;

  sortDirection: boolean;

  private noRepeatBlock: HTMLDivElement;

  constructor() {
    super('div', ['table__wrapper']);
    this.table = document.createElement('table');
    this.table.classList.add('table');
    this.element.appendChild(this.table);
    this.thead = document.createElement('thead');
    this.table.appendChild(this.thead);
    this.thead.innerHTML = `
      <tr class="table_head">
        <th>Word</th>
        <th>Translation</th>
        <th>Category</th>
        <th>Clicks</th>
        <th>Correct</th>
        <th>Wrong</th>
        <th>% errors</th>
      </tr>
    `;
    this.tbody = document.createElement('tbody');
    this.tbody.id = 'tableData';
    this.table.appendChild(this.tbody);

    this.resetBtn = document.createElement('button');
    this.resetBtn.classList.add(...['reset_btn', 'score_btn']);
    this.resetBtn.textContent = 'reset';
    this.element.append(this.resetBtn);

    this.repeatWords = document.createElement('button');
    this.repeatWords.classList.add(...['repeat_btn', 'score_btn']);
    this.repeatWords.textContent = 'repeat difficult words';
    this.element.append(this.repeatWords);

    this.repeatField = document.createElement('div');
    this.repeatField.classList.add('repeat-field');

    this.noRepeatBlock = document.createElement('div');
    this.resetScore();
    this.tableData = [];
    this.getTableData();
    this.sortDirection = false;
    this.sortTable();
    this.renderDifiicultWord();
  }

  noRepeatWordsRender() {
    this.noRepeatBlock.classList.add('no-repeat');
    const noRepeatImageWrap = document.createElement('div');
    noRepeatImageWrap.classList.add('no-repeat__image');
    const noRepeatImage = document.createElement('img');
    noRepeatImage.src = './no_words.png';
    this.noRepeatBlock.appendChild(noRepeatImageWrap);
    noRepeatImageWrap.appendChild(noRepeatImage);
    const noRepeatText = document.createElement('div');
    noRepeatText.classList.add('no-repeat__text');
    noRepeatText.textContent = 'There are no words to repeat!';
    this.noRepeatBlock.appendChild(noRepeatText);
  }

  sortTable(): void {
    this.thead.querySelectorAll('th').forEach((elem) => {
      elem.addEventListener('click', () => {
        if (elem.textContent) {
          this.sortColumn(elem.textContent.toLowerCase());
        }
      });
    });
  }

  getTableData(): void {
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
      const currentWord = Object.keys(localStorage)[i];
      const currentStr = localStorage.getItem(currentWord);
      const curObj = JSON.parse(currentStr as string);
      const categoryWord = curObj.category;
      const clicksWord = curObj.clicks;
      const correctWord = curObj.correct;
      const translationWord = curObj.translation;
      const wrongWord = curObj.wrong;

      const obj = {
        word: currentWord as string,
        translation: translationWord as string,
        category: categoryWord as string,
        clicks: clicksWord as number,
        correct: correctWord as number,
        wrong: wrongWord as number,
        errors:
          Math.floor(100 - (correctWord / (clicksWord + wrongWord)) * 100) || 0,
      };

      data.push(obj as Iobj);
    }
    this.tableData = data;
  }

  renderTableData(): void {
    this.thead.style.display = 'table-row-group';
    this.repeatWords.style.display = 'block';
    this.resetBtn.style.display = 'block';
    const dataWords = this.tableData;
    this.tbody.innerHTML = '';
    for (let i = 0; i < dataWords.length; i++) {
      const word = dataWords[i] as Iobj;
      const tableRow = document.createElement('tr');
      tableRow.classList.add('table_row');
      tableRow.innerHTML = `
        <td>${word.word}</td>
        <td>${word.translation}</td>
        <td>${word.category}</td>
        <td>${word.clicks}</td>
        <td>${word.correct}</td>
        <td>${word.wrong}</td>
        <td>${word.errors}</td>
      `;
      this.tbody.append(tableRow);
    }
  }

  sortColumn(columnName: string): void {
    let colName = columnName;
    if (columnName === '% errors') {
      colName = columnName.replace(/% /g, '');
    }

    const obj: never[] = this.tableData;
    const dataType: string | number = typeof obj[0][colName];

    this.sortDirection = !this.sortDirection;

    if (dataType === 'number') {
      this.sortNumberColumn(this.sortDirection, colName);
    } else {
      this.sortStringColor(this.sortDirection, colName);
    }
    this.renderTableData();
  }

  sortNumberColumn(sort: boolean, columnName: string): void {
    this.tableData = this.tableData.sort((p1: never, p2: never) => (sort ? p2[columnName] - p1[columnName] : p1[columnName] - p2[columnName]));
  }

  sortStringColor(sort: boolean, columnName: string): void {
    this.tableData = this.tableData.sort((p1: never, p2: never) => {
      if (sort) {
        if (p1[columnName] > p2[columnName]) {
          return -1;
        }
        if (p1[columnName] < p2[columnName]) {
          return 1;
        }
      } else {
        if (p1[columnName] < p2[columnName]) {
          return -1;
        }
        if (p1[columnName] > p2[columnName]) {
          return 1;
        }
      }
      return null;
    });
  }

  resetScore(): void {
    this.resetBtn.addEventListener('click', () => {
      new AudioController().clickTOCard();
      for (let i = 0; i < localStorage.length; i++) {
        const currentWord = Object.keys(localStorage)[i];
        const currentStr = localStorage.getItem(currentWord);
        const curObj = JSON.parse(currentStr as string);
        curObj.clicks = 0;
        curObj.correct = 0;
        curObj.wrong = 0;
        localStorage.setItem(currentWord as string, JSON.stringify(curObj));
      }
      this.getTableData();
      this.renderTableData();
    });
  }

  removeScore(): void {
    this.element.remove();
  }

  renderDifiicultWord(): void {
    this.repeatWords.addEventListener('click', () => {
      const difficultWords: Iobj[] = [];
      this.tbody.innerHTML = '';
      this.thead.style.display = 'none';
      this.repeatField.innerHTML = '';
      this.noRepeatBlock.innerHTML = '';
      this.repeatWords.style.display = 'none';
      this.resetBtn.style.display = 'none';
      this.getTableData();
      this.element.appendChild(this.repeatField);
      for (let i = 0; i < this.tableData.length; i++) {
        const word = this.tableData[i];
        if (word.errors >= 60) {
          if (difficultWords.length < 8) {
            difficultWords.push(word);
          }
        }
      }
      if (difficultWords.length === 0) {
        this.noRepeatWordsRender();
        this.repeatField.appendChild(this.noRepeatBlock);
      } else {
        difficultWords.forEach((key) => {
          const newCard = new GameCard(
            key.word.toLowerCase(),
            key.translation,
            key.category,
          );
          this.repeatField.appendChild(newCard.element);
        });
      }
    });
  }
}
