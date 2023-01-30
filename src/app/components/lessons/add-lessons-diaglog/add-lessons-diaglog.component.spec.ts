import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonsDiaglogComponent } from './add-lessons-diaglog.component';

describe('AddLessonsDiaglogComponent', () => {
  let component: AddLessonsDiaglogComponent;
  let fixture: ComponentFixture<AddLessonsDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLessonsDiaglogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLessonsDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
