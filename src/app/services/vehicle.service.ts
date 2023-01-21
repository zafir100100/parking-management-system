import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  keyVehicles: string = 'vehicles';
  totalVehicleSlot: number = 6;

  constructor() {
    this.seedVehicles();
  }

  seedVehicles(): void {
    let vehicles: Vehicle[] = [];
    let vehicle1: Vehicle = {
      vehicle_license_number: 'KA-01-HH-1234',
      vehicle_type: 'Car',
      vehicle_owner_name: 'Alice',
      vehicle_owner_phone: '123456789',
      status: 'in',
      car_owner_address: 'Dhaka',
      car_entry_time: new Date("2023-01-21T07:18:04.781Z"),
      parking_charge: 100
    };
    let vehicle2: Vehicle = {
      vehicle_license_number: 'LA-01-HH-1234',
      vehicle_type: 'Truck',
      vehicle_owner_name: 'Bob',
      vehicle_owner_phone: '987654321',
      status: 'out',
      car_owner_address: 'Rajshahi',
      car_entry_time: new Date("2023-01-21T07:10:04.781Z"),
      car_exit_time: new Date("2023-01-21T07:28:04.781Z"),
      parking_charge: 300
    };
    let vehicle3: Vehicle = {
      vehicle_license_number: 'JA-01-HH-1234',
      vehicle_type: 'Bus',
      vehicle_owner_name: 'Robin',
      vehicle_owner_phone: '123451234',
      status: 'in',
      car_owner_address: 'Chittagong',
      car_entry_time: new Date("2023-01-18T07:10:04.781Z"),
      parking_charge: 600
    };
    vehicles.push(vehicle1);
    vehicles.push(vehicle2);
    vehicles.push(vehicle3);
    if (localStorage.getItem(this.keyVehicles) == null) {
      localStorage.setItem('vehicles', JSON.stringify(vehicles));
    }
  }

  totalParkedVehicleCount(): number {
    let vehicles: Vehicle[] = JSON.parse(localStorage.getItem(this.keyVehicles) ?? '[]');
    vehicles = vehicles.filter(x => x.status == 'in');
    return vehicles.length;
  }

  totalEmptySlotCount(): number {
    return this.totalVehicleSlot - this.totalParkedVehicleCount();
  }

  getParkedVehiclesByTypeReport(): any[] {
    let map: Map<string, number> = new Map<string, number>();
    let vehicles: Vehicle[] = JSON.parse(localStorage.getItem(this.keyVehicles) ?? '[]');
    vehicles = vehicles.filter(x => x.status == 'in');
    vehicles.forEach(element => {
      if (map.has(element.vehicle_type!)) {
        map.set(element.vehicle_type!, map.get(element.vehicle_type!)! + 1);
      } else {
        map.set(element.vehicle_type!, 1);
      }
    });
    let result: any[] = [];
    map.forEach((value, key) => {
      result.push({ vehicle_type: key, total: value });
    });
    return result;
  }

  getParkedFor2HrVehiclesByTypeReport(): Vehicle[] {
    let vehicles: Vehicle[] = JSON.parse(localStorage.getItem(this.keyVehicles) ?? '[]');
    vehicles = vehicles.filter(x => x.status == 'in' && (new Date().getTime() - new Date(x.car_entry_time ?? "").getTime() > (2 * 60 * 60 * 1000)));
    return vehicles;
  }

  isSlotAvailable(): boolean {
    return this.totalParkedVehicleCount() < this.totalVehicleSlot;
  }

  getAllVehicles(): Vehicle[] {
    let vehicles: Vehicle[] = JSON.parse(localStorage.getItem(this.keyVehicles) ?? '[]');
    return vehicles;
  }

  getVehicleByLicenseNumber(licenseNumber: string): Vehicle | undefined {
    let vehicles: Vehicle[] = JSON.parse(localStorage.getItem(this.keyVehicles) ?? '[]');
    return vehicles.find(x => x.vehicle_license_number == licenseNumber);
  }

  addVehicle(vehicle: Vehicle): boolean {
    if (this.getVehicleByLicenseNumber(vehicle.vehicle_license_number!) == undefined && this.isSlotAvailable()) {
      let vehicles: Vehicle[] = JSON.parse(localStorage.getItem(this.keyVehicles) ?? '[]');
      vehicles.push(vehicle);
      localStorage.setItem(this.keyVehicles, JSON.stringify(vehicles));
      return true;
    }
    return false;
  }

  updateVehicle(vehicle: Vehicle): boolean {
    if (this.getVehicleByLicenseNumber(vehicle.vehicle_license_number!) != undefined) {
      let vehicles: Vehicle[] = JSON.parse(localStorage.getItem(this.keyVehicles) ?? '[]');
      let index = vehicles.findIndex(x => x.vehicle_license_number == vehicle.vehicle_license_number);
      vehicles[index] = vehicle;
      localStorage.setItem(this.keyVehicles, JSON.stringify(vehicles));
      return true;
    }
    return false;
  }
}
