import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LessonsViewDTO, Pagination } from 'src/app/classes/lessons';
import { Result } from 'src/app/classes/response-dto';
import { LanguageCode } from 'src/app/enums/enums';
import { LessonsService } from 'src/app/services/lessons/lessons.service';
import { AddLessonsDiaglogComponent } from './add-lessons-diaglog/add-lessons-diaglog.component';
import { EditLessonsDiaglogComponent } from './edit-lessons-diaglog/edit-lessons-diaglog.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  lessons: any;

  constructor(private lessonsService: LessonsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLessons();
  }


  getLessons() {
    this.lessonsService.getAll(1, 10).subscribe((res: Result<Pagination>) => {
      this.lessons = res.data.content;
    });
  }

  getArabicName(titles: any[]) {
    if (titles != undefined && titles.length > 0)
      return titles.find(x => x.language == LanguageCode.Arabic).value;
  }

  getTurkishName(titles: any[]) {
    if (titles != undefined && titles.length > 0)
      return titles.find(x => x.language == LanguageCode.Turkish).value;
  }

  editLesson(lessonId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { lessonId };

    this.dialog.open(EditLessonsDiaglogComponent, dialogConfig)
      .afterClosed().subscribe(res => {
        if (res) {
          this.getLessons();
        }
      });
  }


  addLesson() {
    this.dialog.open(AddLessonsDiaglogComponent).afterClosed().subscribe(res => {
      if (res) {
        this.getLessons();
      }
    });
  }
  pageChanged(event: any) {

  }
}
