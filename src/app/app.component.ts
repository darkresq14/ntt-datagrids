import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, TabMenuModule],
})
export class AppComponent implements OnInit {
  title = 'ntt-datagrids';

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      routerLink: '/',
      routerLinkActiveOptions: { exact: true },
    },
    { label: 'AgGrid', routerLink: 'datagrid/ag-grid' },
    { label: 'DevExtreme', routerLink: 'datagrid/devextreme' },
    { label: 'PrimeNg', routerLink: 'datagrid/prime-ng' },
    { disabled: true, separator: true },
    { label: 'Drag-n-Drop DevExtreme', routerLink: 'dragndrop/devextreme' },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsersDJ();
  }
}
