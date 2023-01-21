import { Component } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-dashboard',
  templateUrl: './vehicle-dashboard.component.html',
  styleUrls: ['./vehicle-dashboard.component.css']
})
export class VehicleDashboardComponent {
  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
  }

  totalParkedVehicleCount(): number {
    return this.vehicleService.totalParkedVehicleCount();
  }

  totalEmptySlot(): number {
    return this.vehicleService.totalEmptySlotCount();
  }

  getParkedVehiclesByTypeReport(): any[] {
    return this.vehicleService.getParkedVehiclesByTypeReport();
  }

  getParkedFor2HrVehiclesByTypeReport(): Vehicle[] {
    return this.vehicleService.getParkedFor2HrVehiclesByTypeReport();
  }
}
