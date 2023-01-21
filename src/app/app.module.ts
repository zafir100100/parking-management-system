import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleDashboardComponent } from './components/vehicle-dashboard/vehicle-dashboard.component';
import { VehicleManagementComponent } from './components/vehicle-management/vehicle-management.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleDashboardComponent,
    VehicleManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
