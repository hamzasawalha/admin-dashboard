import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Image, Lessons, LessonsDTO, Localization } from 'src/app/classes/lessons';
import { Result } from 'src/app/classes/response-dto';
import { LanguageCode } from 'src/app/Enums/enums';
import { LessonsService } from 'src/app/services/lessons/lessons.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-lessons-diaglog',
  templateUrl: './add-lessons-diaglog.component.html',
  styleUrls: ['./add-lessons-diaglog.component.css']
})
export class AddLessonsDiaglogComponent {
  lesson: Lessons;
  addLessonsDTO: LessonsDTO;

  constructor(private lessonsService: LessonsService, private dialogRef: MatDialogRef<AddLessonsDiaglogComponent>) {
    this.lesson = new Lessons();
    this.addLessonsDTO = new LessonsDTO();
  }


  onChooseArabicImage(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let formData = new FormData();
    formData.append("file", files[0]);
    this.lesson.arabicImages = formData;
  }

  onChooseTurkishImage(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let formData = new FormData();
    formData.append("file", files[0]);
    this.lesson.turkishImages = formData;
  }


  onChooseArabicPoster(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let formData = new FormData();
    formData.append("file", files[0]);
    this.lesson.arabicPosters = formData;
  }

  onChooseTurkishPoster(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let formData = new FormData();
    formData.append("file", files[0]);
    this.lesson.turkishPosters = formData;
  }

  async addCategory() {
    await this.addArabicImage();
    await this.addTurkishImage();
    await this.addCategoryData();
  }

  async addArabicImage() {
    await this.lessonsService.uploadLessonFiles(this.lesson.arabicImages).then((res: Result<any>) => {
      this.lesson.arabicImages = environment.fileServer + res.data;
      let arabicImage: Image = new Image();
      arabicImage.language = LanguageCode.Arabic;
      arabicImage.value = this.lesson.arabicImages;
      this.addLessonsDTO.images.push(arabicImage);
    });
  }

  async addTurkishImage() {
    await this.lessonsService.uploadLessonFiles(this.lesson.turkishImages).then((res: Result<any>) => {
      this.lesson.turkishImages = environment.fileServer + res.data;
      let turkishImage: Image = new Image();
      turkishImage.language = LanguageCode.Turkish;
      turkishImage.value = this.lesson.turkishImages;
      this.addLessonsDTO.images.push(turkishImage);
    });
  }

  async addCategoryData() {
    let titles: Localization[] =
      [
        {
          language: LanguageCode.Arabic,
          value: this.lesson.arabicTitle
        },
        {
          language: LanguageCode.Turkish,
          value: this.lesson.turkishTitle
        }
      ];
    this.addLessonsDTO.level = this.lesson.level;

    this.addLessonsDTO.titles = titles;
    await this.lessonsService.addLesson(this.addLessonsDTO).then((res: Result<any>) => {
      this.dialogRef.close(true);
    });
  }
}
