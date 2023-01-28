import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoriesDialogComponent } from './add-categories-dialog.component';

describe('AddCategoriesDialogComponent', () => {
  let component: AddCategoriesDialogComponent;
  let fixture: ComponentFixture<AddCategoriesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoriesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
