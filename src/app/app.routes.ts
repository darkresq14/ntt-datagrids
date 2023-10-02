import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AgGridComponent } from './datagrids/ag-grid/ag-grid.component';
import { DevextremeComponent } from './datagrids/devextreme/devextreme.component';
import { PrimeNgComponent } from './datagrids/prime-ng/prime-ng.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'ag-grid', component: AgGridComponent },
  { path: 'devextreme', component: DevextremeComponent },
  { path: 'prime-ng', component: PrimeNgComponent },
];
