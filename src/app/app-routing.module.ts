import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleDashboardComponent } from './components/vehicle-dashboard/vehicle-dashboard.component';
import { VehicleManagementComponent } from './components/vehicle-management/vehicle-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/vehicle-dashboard', pathMatch: 'full' },
  { path: 'vehicle-dashboard', component: VehicleDashboardComponent },
  { path: 'vehicle-management', component: VehicleManagementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
