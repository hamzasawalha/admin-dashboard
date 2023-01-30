import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image, Lessons, LessonsDTO, Localization } from 'src/app/classes/lessons';
import { Result } from 'src/app/classes/response-dto';
import { LanguageCode } from 'src/app/Enums/enums';
import { LessonsService } from 'src/app/services/lessons/lessons.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-lessons-diaglog',
  templateUrl: './edit-lessons-diaglog.component.html',
  styleUrls: ['./edit-lessons-diaglog.component.css']
})
export class EditLessonsDiaglogComponent {
  lesson: Lessons;
  editLessonsDTO: LessonsDTO;
  arabicImage: any;
  turkishImage: any;
  arabicPoster: any;
  turkishPoster: any;

  constructor(private lessonService: LessonsService, private dialogRef: MatDialogRef<EditLessonsDiaglogComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) {
    this.lesson = new Lessons();
  }


  ngOnInit(): void {
    this.getlesson();
  }

  getlesson() {
    this.lessonService.getLesson(this.data.lessonId).subscribe((res: Result<LessonsDTO>) => {
      this.editLessonsDTO = res.data;
      this.lesson.id = this.editLessonsDTO.id;
      this.lesson.level = this.editLessonsDTO.level;
      this.lesson.videoUrl = this.editLessonsDTO.videoUrl;

      // fill localizations 
      this.lesson.arabicTitle = this.getLocalization(this.editLessonsDTO.titles, LanguageCode.Arabic);
      this.lesson.turkishTitle = this.getLocalization(this.editLessonsDTO.titles, LanguageCode.Turkish);
      this.lesson.arabicDescription = this.getLocalization(this.editLessonsDTO.descriptions, LanguageCode.Arabic);
      this.lesson.turkishDescription = this.getLocalization(this.editLessonsDTO.descriptions, LanguageCode.Turkish);
      this.lesson.turkishImages = this.getLocalization(this.editLessonsDTO.images, LanguageCode.Turkish);
      this.lesson.arabicImages = this.getLocalization(this.editLessonsDTO.images, LanguageCode.Arabic);
      this.lesson.turkishPosters = this.getLocalization(this.editLessonsDTO.posterImages, LanguageCode.Turkish);
      this.lesson.arabicPosters = this.getLocalization(this.editLessonsDTO.posterImages, LanguageCode.Arabic);

      // for render image 
      this.turkishImage = this.lesson.turkishImages;
      this.arabicImage = this.lesson.arabicImages;
      this.turkishPoster = this.lesson.turkishPosters;
      this.arabicPoster = this.lesson.arabicPosters;
    });
  }


  onChooseArabicImage(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let formData = new FormData();
    formData.append("file", files[0]);
    this.lesson.arabicImages = formData;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.arabicImage = reader.result;
    };
  }


  onChooseTurkishImage(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let formData = new FormData();
    formData.append("file", files[0]);
    this.lesson.turkishImages = formData;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.turkishImage = reader.result;
    };
  }



  onChooseArabicPoster(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let formData = new FormData();
    formData.append("file", files[0]);
    this.lesson.arabicPosters = formData;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.arabicPoster = reader.result;
    };
  }


  onChooseTurkishPoster(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let formData = new FormData();
    formData.append("file", files[0]);
    this.lesson.turkishPosters = formData;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.turkishPoster = reader.result;
    };
  }

  async addLesson() {
    await this.addArabicImage();
    await this.addTurkishImage();
    await this.addlessonData();
  }

  async addArabicImage() {
    if (this.lesson.arabicImages instanceof FormData) {
      await this.lessonService.uploadLessonFiles(this.lesson.arabicImages).then((res: Result<any>) => {
        this.lesson.arabicImages = environment.fileServer + res.data;
        let arabicImage: Image = new Image();
        arabicImage.language = LanguageCode.Arabic;
        arabicImage.value = this.lesson.arabicImages;
        const existingIndex = this.editLessonsDTO.images.findIndex(img => img.language === LanguageCode.Arabic);
        if (existingIndex !== -1) {
          this.editLessonsDTO.images[existingIndex] = arabicImage;
        } else {
          this.editLessonsDTO.images.push(arabicImage);
        }
      });
    }
  }


  async addTurkishImage() {
    if (this.lesson.turkishImages instanceof FormData) {
      await this.lessonService.uploadLessonFiles(this.lesson.turkishImages).then((res: Result<any>) => {
        this.lesson.turkishImages = environment.fileServer + res.data;
        let turkishImage: Image = new Image();
        turkishImage.language = LanguageCode.Turkish;
        turkishImage.value = this.lesson.turkishImages;
        const existingIndex = this.editLessonsDTO.images.findIndex(img => img.language === LanguageCode.Turkish);
        if (existingIndex !== -1) {
          this.editLessonsDTO.images[existingIndex] = turkishImage;
        } else {
          this.editLessonsDTO.images.push(turkishImage);
        }
      });
    }
  }


  async addlessonData() {
    let title: Localization[] =
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
    this.editLessonsDTO.level = this.lesson.level;
    this.editLessonsDTO.id = this.lesson.id;
    this.editLessonsDTO.titles = title;
    await this.lessonService.addLesson(this.editLessonsDTO).then((res: Result<any>) => {
      this.dialogRef.close(true);
    });
  }



  getLocalization(values: any[], lang: LanguageCode) {
    if (values != undefined && values.length > 0)
      return values.find(x => x.language == lang).value;
  }

}
