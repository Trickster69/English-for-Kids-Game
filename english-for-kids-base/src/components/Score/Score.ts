/* eslint-disable @typescript-eslint/no-explicit-any */
import { AudioController } from '../../assets/Utils/AudioController';
import { BaseComponent } from '../../assets/Utils/BaseComponent';
import { Iobj } from '../../assets/Utils/Iobj';
import cards from '../../cards';
import './Score.scss';

export class Score extends BaseComponent {
  private readonly table: HTMLTableElement;

  private readonly resetBtn: HTMLButtonElement;

  private readonly repeatWords: HTMLButtonElement;

  thead: HTMLTableSectionElement;

  tbody: HTMLTableSectionElement;

  tableData: any;

  sortDirection: boolean;

  constructor() {
    super('div', ['table__wrapper']);
    this.table = document.createElement('table');
    this.table.classList.add('table');
    this.element.appendChild(this.table);
    this.thead = document.createElement('thead');
    this.table.appendChild(this.thead);
    // this.thead.appendChild(this.table);
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
    // const animalCount = localStorage.length;
    this.resetScore();
    this.tableData = [];
    this.getTableData();
    // console.log(this.getTableData());
    // this.loadTableData(this.getTableData());
    this.sortDirection = false;
    // this.sortColumn('clicks');
    this.thead.querySelectorAll('th').forEach((elem) => {
      elem.addEventListener('click', () => {
        // console.log(elem.textContent.t);

        if (!elem.textContent) {
          throw Error();
        }
        this.sortColumn(elem.textContent.toLowerCase());
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getTableData() {
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
      const currentWord = Object.keys(localStorage)[i];
      const tableRow = document.createElement('tr');
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
      };

      data.push(obj as Iobj);
    }
    this.tableData = data;
  }

  loadTableData() {
    // const tableBody = this.tbody;
    const dataWords = this.tableData;
    this.tbody.innerHTML = '';
    // const tableRow = document.createElement('tr');
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
        <td>${Math.floor(100 - ((word.correct / (word.clicks + word.wrong)) * 100)) || 0}</td>
      `;
      this.tbody.append(tableRow);
    }
  }

  sortColumn(columnName:string) {
    const obj: any = this.tableData;
    const dataType = typeof obj[0][columnName];
    this.sortDirection = !this.sortDirection;

    if (dataType === 'number') {
      this.sortNumberColumn(this.sortDirection, columnName);
    } else {
      this.sortStringColor(this.sortDirection, columnName);
    }
    this.loadTableData();
  }

  sortNumberColumn(sort:boolean, columnName:string):void {
    this.tableData = this.tableData.sort((p1:any, p2:any) => (sort ? p2[columnName] - p1[columnName] : p1[columnName] - p2[columnName]));
  }

  sortStringColor(sort:boolean, columnName:string):void {
    this.tableData = this.tableData.sort((p1:any, p2:any) => {
      if (sort) {
        if (p1[columnName] > p2[columnName]) { return -1; }
        if (p1[columnName] < p2[columnName]) { return 1; }
      } else {
        if (p1[columnName] < p2[columnName]) { return -1; }
        if (p1[columnName] > p2[columnName]) { return 1; }
      }
      return null;
    });
  }

  // renderTable():void {
  //   this.tbody.innerHTML = '';
  //   // const elements = [];
  //   for (let i = 0; i < localStorage.length; i++) {
  //     const currentWord = Object.keys(localStorage)[i];
  //     const tableRow = document.createElement('tr');
  //     const currentStr = localStorage.getItem(currentWord);
  //     const curObj = JSON.parse(currentStr as string);
  //     const categoryWord = curObj.category;
  //     const clicksWord = curObj.clicks;
  //     const correctWord = curObj.correct;
  //     const translationWord = curObj.translation;
  //     const wrongWord = curObj.wrong;
  //     // console.log(translationWord);

  //     tableRow.classList.add('table_row');
  //     tableRow.innerHTML = `
  //       <td>${Object.keys(localStorage)[i]}</td>
  //       <td>${translationWord}</td>
  //       <td>${categoryWord}</td>
  //       <td>${clicksWord}</td>
  //       <td>${correctWord}</td>
  //       <td>${wrongWord}</td>
  //       <td>${Math.floor(100 - ((correctWord / (clicksWord + wrongWord)) * 100)) || 0}</td>
  //     `;
  //     // elements.push(tableRow);
  //     this.tbody.append(tableRow);
  //   }
  // }

  resetScore():void {
    this.resetBtn.addEventListener('click', () => {
      new AudioController().clickTOCard();
      console.log('ckick score reser');
      for (let i = 0; i < localStorage.length; i++) {
        const currentWord = Object.keys(localStorage)[i];
        const currentStr = localStorage.getItem(currentWord);
        const curObj = JSON.parse(currentStr as string);
        curObj.clicks = 0;
        curObj.correct = 0;
        curObj.wrong = 0;
        localStorage.setItem(currentWord as string, JSON.stringify(curObj));
      }
      // this.renderTable();
    });
  }

  removeScore():void {
    this.element.remove();
  }
}
