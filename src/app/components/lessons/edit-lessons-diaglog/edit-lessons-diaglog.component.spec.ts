import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLessonsDiaglogComponent } from './edit-lessons-diaglog.component';

describe('EditLessonsDiaglogComponent', () => {
  let component: EditLessonsDiaglogComponent;
  let fixture: ComponentFixture<EditLessonsDiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLessonsDiaglogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLessonsDiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
