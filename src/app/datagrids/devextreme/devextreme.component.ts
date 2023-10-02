import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserType } from 'src/app/types/user.types';
import { UserService } from 'src/app/services/user.service';
import { DxCheckBoxModule, DxDataGridModule } from 'devextreme-angular';

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

  users: UserType[] = [];
  autoExpandAllVar: boolean | null | undefined = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$.subscribe((users) => (this.users = users));
  }
}
