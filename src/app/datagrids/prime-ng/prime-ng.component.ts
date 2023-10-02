import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { UserType } from 'src/app/types/user.types';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-prime-ng',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    MultiSelectModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './prime-ng.component.html',
  styles: [],
})
export class PrimeNgComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  implemented = [
    'Sorting',
    'Row Expand',
    'Column Toggle',
    'Global Search',
    'Filter',
  ];
  notImplemented = [
    'Row / Cell Edit',
    'Frozen Rows / Cols',
    'Resizable Columns',
    'Row Groups',
    'Column Groups (no functionality)',
    'Pagination',
  ];

  users: UserType[] = [];

  cols!: Column[];

  _selectedColumns!: Column[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$.subscribe((users) => (this.users = users));

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'company', header: 'Company' },
      { field: 'department', header: 'Department' },
      { field: 'title', header: 'Title' },
      { field: 'city', header: 'City' },
    ];

    this._selectedColumns = this.cols;
  }

  get selectedColumns(): Column[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: Column[]) {
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
