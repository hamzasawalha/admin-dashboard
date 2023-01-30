import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoriesDiaglogComponent } from './edit-categories-diaglog.component';

describe('EditCategoriesDiaglogComponent', () => {
  let component: EditCategoriesDiaglogComponent;
  let fixture: ComponentFixture<EditCategoriesDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCategoriesDiaglogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategoriesDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
