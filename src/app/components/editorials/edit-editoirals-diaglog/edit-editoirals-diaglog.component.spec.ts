import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEditoiralsDiaglogComponent } from './edit-editoirals-diaglog.component';

describe('EditEditoiralsDiaglogComponent', () => {
  let component: EditEditoiralsDiaglogComponent;
  let fixture: ComponentFixture<EditEditoiralsDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEditoiralsDiaglogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEditoiralsDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
