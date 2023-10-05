import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeType } from 'src/app/types/user.types';
import { DxCheckBoxModule, DxDataGridModule } from 'devextreme-angular';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-devextreme',
  standalone: true,
  imports: [CommonModule, DxDataGridModule, DxCheckBoxModule],
  templateUrl: './devextreme.component.html',
  styleUrls: ['./devextreme.component.scss'],
})
export class DevextremeComponent implements OnInit {
  implemented = ['Record Grouping', 'Sorting', 'Global Search', 'Paging'];
  notImplemented = [];

  employees: EmployeeType[] = [];
  autoExpandAllVar: boolean | null | undefined = true;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }
}
