import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditoiralsDiaglogComponent } from './add-editoirals-diaglog.component';

describe('AddEditoiralsDiaglogComponent', () => {
  let component: AddEditoiralsDiaglogComponent;
  let fixture: ComponentFixture<AddEditoiralsDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditoiralsDiaglogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditoiralsDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
