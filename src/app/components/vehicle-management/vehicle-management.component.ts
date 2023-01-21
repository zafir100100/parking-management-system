import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css']
})
export class VehicleManagementComponent {
  vehicles: Vehicle[] = [];
  form!: FormGroup;
  constructor(private vehicleService: VehicleService, private fb: FormBuilder) {
    this.form = this.fb.group({
      vehicle_license_number: ['', Validators.required],
      vehicle_type: ['', Validators.required],
      vehicle_owner_name: ['', Validators.required],
      vehicle_owner_phone: ['', Validators.required],
      status: ['in', Validators.required],
      car_owner_address: ['', Validators.required],
      car_entry_time: [new Date(), Validators.required],
      car_exit_time: [''],
      parking_charge: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles() {
    this.vehicles = this.vehicleService.getAllVehicles();
  }

  parkVehicle(vehicle: Vehicle) {
    this.vehicleService.addVehicle(vehicle);
    this.getAllVehicles();
  }

  updateVehicle(vehicle: Vehicle) {
    this.vehicleService.updateVehicle(vehicle);
    this.getAllVehicles();
  }

  save() {
    this.vehicleService.addVehicle(this.form.value);
    this.getAllVehicles();
    Swal.fire("Success", "Vehicle info added successfully", "success");
  }

  update() {
    this.vehicleService.updateVehicle(this.form.value);
    this.getAllVehicles();
    Swal.fire("Success", "Vehicle info updated successfully", "success");
  }

  setValue(item: any) {
    let data: any = item;
    data.car_entry_time = data.car_entry_time?.substring(0, 16);
    data.car_exit_time = data.car_exit_time?.substring(0, 16);
    this.form.patchValue(data);
  }
}
