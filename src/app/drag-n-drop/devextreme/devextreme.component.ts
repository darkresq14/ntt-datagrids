import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { Project, User } from 'src/app/types/dragndrop.types';
import { RowDraggingEndEvent } from 'devextreme/ui/data_grid';

@Component({
  selector: 'app-devextreme',
  standalone: true,
  imports: [CommonModule, DxDataGridModule],
  templateUrl: './devextreme.component.html',
  styles: [
    `
      .table-container {
        display: flex;
      }

      .table {
        flex: 1;
        padding: 10px;
      }
    `,
  ],
})
export class DevextremeComponent implements AfterViewInit {
  @ViewChild('projectsGrid', { static: false }) dataGrid!: DxDataGridComponent;

  users: Array<User> = [
    {
      id: 1,
      name: 'Vasile',
    },
    {
      id: 2,
      name: 'Ion',
    },
    {
      id: 3,
      name: 'Maria',
    },
    {
      id: 4,
      name: 'Magdalena',
    },
  ];
  projects: Array<Project> = [
    {
      id: 1,
      firma: 'BMW',
      aplicari: [],
    },
    {
      id: 2,
      firma: 'VW',
      aplicari: [
        {
          id: 1,
          user: {
            id: 4,
            name: 'Magdalena',
          },
          status: 'pending',
        },
      ],
    },
  ];

  constructor() {
    this.onUserDragEnd = this.onUserDragEnd.bind(this);
  }

  ngAfterViewInit(): void {
    this.dataGrid.instance.expandAll(-1);
    console.log(this.dataGrid.instance.getKeyByRowIndex(0));
    this.dataGrid.instance.collapseAll(-1);
    console.log(this.dataGrid.instance.getKeyByRowIndex(0));
  }

  onProjectDragStart(e: RowDraggingEndEvent) {
    e.cancel = true;
    return;
  }

  onUserDragEnd(e: RowDraggingEndEvent) {
    if (e.toData === 'projects' && e.dropInsideItem === false) {
      e.cancel = true;
      return;
    }
    if (!(e.fromData === 'users')) {
      e.cancel = true;
      return;
    }

    let projectId: number | undefined = undefined;

    if (e.toData.startsWith('aplicari')) {
      projectId = +e.toData.split('aplicari-')[1];
    }

    if (e.toData === 'projects') {
      const key = this.dataGrid.instance.getKeyByRowIndex(+e.toIndex);
      projectId = key;
      this.dataGrid.instance.expandRow(key);
    }

    const user = e.itemData;
    const project = this.projects.find((p) => p.id === projectId);
    console.log('projectId', projectId);

    if (project) {
      project.aplicari.push({
        id: project.aplicari.length + 1,
        user,
        status: 'NEW',
      });
    }

    console.log(e);
  }
}
