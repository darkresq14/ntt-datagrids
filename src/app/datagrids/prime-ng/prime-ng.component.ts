import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeType } from 'src/app/types/user.types';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

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
    'Filter Row',
  ];
  notImplemented = [
    'Row / Cell Edit',
    'Frozen Rows / Cols',
    'Resizable Columns',
    'Row Groups',
    'Column Groups (no functionality)',
    'Pagination',
  ];

  employees: EmployeeType[] = [];

  cols!: Column[];

  _selectedColumns!: Column[];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'status', header: 'status' },
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
