import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleManagementComponent } from './vehicle-management.component';

describe('VehicleManagementComponent', () => {
  let component: VehicleManagementComponent;
  let fixture: ComponentFixture<VehicleManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
