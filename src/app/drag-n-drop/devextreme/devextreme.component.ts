import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';
import { Project, User } from 'src/app/types/dragndrop.types';
import { RowDraggingEndEvent } from 'devextreme/ui/data_grid';
import { projects } from './projects';
import notify from 'devextreme/ui/notify';

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
export class DevextremeComponent {
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
  projects: Array<Project> = projects;

  constructor() {
    this.onUserDragEnd = this.onUserDragEnd.bind(this);
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
      projectId = this.dataGrid.instance.getKeyByRowIndex(+e.toIndex);
      this.dataGrid.instance.expandRow(projectId);
    }

    const user = e.itemData;
    const project = this.projects.find((p) => p.id === projectId);

    if (project) {
      const userAlreadyInProject = project.aplicari.find(
        (a) => a.user.id === user.id
      );

      if (userAlreadyInProject) {
        notify(
          `User ${user.name} is already allocated in project ${project.firma} - ${project.proiect}`,
          'warning'
        );
        return;
      }

      project.aplicari.push({
        id: project.aplicari.length + 1,
        user,
        status: 'NEW',
      });
      notify(
        `User ${user.name} added to project ${project.firma} - ${project.proiect}`,
        'success'
      );
    }
  }
}
