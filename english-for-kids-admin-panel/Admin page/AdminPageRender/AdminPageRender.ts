import { BaseComponent } from '../../src/assets/Utils/BaseComponent';
import { AdminHeader } from '../AdminHeader/AdminHeader';

export class AdminPageRender extends BaseComponent {
  // adminHeader: AdminHeader;

  constructor() {
    super('div', ['admin-page']);
    // this.adminHeader = new AdminHeader();
  }

  // renderAdminHeader() {
  //   this.element.appendChild(this.adminHeader.element);
  //   this.adminHeader.logout?.addEventListener('click', () => {
  //     this.element.remove();
  //   });
  // }
}
