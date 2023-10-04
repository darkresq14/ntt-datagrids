import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { UserDJType } from 'src/app/types/user.types';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColGroupDef } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './ag-grid.component.html',
  styles: [],
})
export class AgGridComponent implements OnInit {
  implemented = ['Col Group', 'Sorting', 'Filtering', 'Resize'];
  notImplemented = ['Master Detail (only paid)'];

  columnDefs: (ColDef | ColGroupDef)[] = [
    { field: 'name' },

    { field: 'department' },
    { field: 'title' },
    {
      headerName: 'Company Details',
      children: [{ field: 'company' }, { field: 'city' }],
    },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  users: UserDJType[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$.subscribe((users) => (this.users = users));
  }
}
