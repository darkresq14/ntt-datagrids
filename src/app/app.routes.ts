import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AgGridComponent } from './datagrids/ag-grid/ag-grid.component';
import { DevextremeComponent } from './datagrids/devextreme/devextreme.component';
import { DevextremeComponent as DragndropDevextremeComponent } from './drag-n-drop/devextreme/devextreme.component';
import { PrimeNgComponent } from './datagrids/prime-ng/prime-ng.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'datagrid/ag-grid', component: AgGridComponent },
  { path: 'datagrid/devextreme', component: DevextremeComponent },
  { path: 'datagrid/prime-ng', component: PrimeNgComponent },
  { path: 'dragndrop/devextreme', component: DragndropDevextremeComponent },
];
