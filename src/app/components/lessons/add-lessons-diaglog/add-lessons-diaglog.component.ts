import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesViewDTO } from 'src/app/classes/categories';
import { Image, Lessons, LessonsDTO, Localization, Subtitle } from 'src/app/classes/lessons';
import { Result } from 'src/app/classes/response-dto';
import { LanguageCode } from 'src/app/enums/enums';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { LessonsService } from 'src/app/services/lessons/lessons.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-lessons-diaglog',
  templateUrl: './add-lessons-diaglog.component.html',
  styleUrls: ['./add-lessons-diaglog.component.css']
})
export class AddLessonsDiaglogComponent {

  lesson: Lessons;
  editLessonsDTO: LessonsDTO;
  arabicImage: any;
  turkishImage: any;
  arabicPoster: any;
  turkishPoster: any;
  categories: any;

  constructor(private categoriesService: CategoriesService, private lessonService: LessonsService, private dialogRef: MatDialogRef<AddLessonsDiaglogComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) {
    this.lesson = new Lessons();
    this.editLessonsDTO = new LessonsDTO();
  }


  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getAll(1, 10).subscribe((res: Result<CategoriesViewDTO>) => {
      this.categories = res.data;
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
    await this.addArabicPoster();
    await this.addTurkishPoster();
    await this.addlessonData();
  } 

  async addArabicImage() {
    if (this.lesson.arabicImages instanceof FormData) {
      await this.lessonService.upload(this.lesson.arabicImages).then((res: Result<any>) => {
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
      await this.lessonService.upload(this.lesson.turkishImages).then((res: Result<any>) => {
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

  async addArabicPoster() {
    if (this.lesson.arabicPosters instanceof FormData) {
      await this.lessonService.upload(this.lesson.arabicPosters).then((res: Result<any>) => {
        this.lesson.arabicPosters = environment.fileServer + res.data;
        let arabicImage: Image = new Image();
        arabicImage.language = LanguageCode.Arabic;
        arabicImage.value = this.lesson.arabicPosters;
        const existingIndex = this.editLessonsDTO.posterImages.findIndex(img => img.language === LanguageCode.Arabic);
        if (existingIndex !== -1) {
          this.editLessonsDTO.posterImages[existingIndex] = arabicImage;
        } else {
          this.editLessonsDTO.posterImages.push(arabicImage);
        }
      });
    }
  }


  async addTurkishPoster() {
    if (this.lesson.turkishPosters instanceof FormData) {
      await this.lessonService.upload(this.lesson.turkishPosters).then((res: Result<any>) => {
        this.lesson.turkishPosters = environment.fileServer + res.data;
        let turkishImage: Image = new Image();
        turkishImage.language = LanguageCode.Turkish;
        turkishImage.value = this.lesson.turkishPosters;
        const existingIndex = this.editLessonsDTO.posterImages.findIndex(img => img.language === LanguageCode.Turkish);
        if (existingIndex !== -1) {
          this.editLessonsDTO.posterImages[existingIndex] = turkishImage;
        } else {
          this.editLessonsDTO.posterImages.push(turkishImage);
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


    let descriptions: Localization[] =
      [
        {
          language: LanguageCode.Arabic,
          value: this.lesson.arabicDescription
        },
        {
          language: LanguageCode.Turkish,
          value: this.lesson.turkishDescription
        }
      ];

    this.editLessonsDTO.level = this.lesson.level;
    this.editLessonsDTO.titles = title;
    this.editLessonsDTO.descriptions = descriptions;
    this.editLessonsDTO.category = this.lesson.category;
    this.editLessonsDTO.subtitles = this.lesson.subtitles;
    this.editLessonsDTO.videoUrl = this.lesson.videoUrl;
    this.editLessonsDTO.language = this.lesson.language;
    
    console.log(this.editLessonsDTO);
    
    await this.lessonService.add(this.editLessonsDTO).then((res: Result<any>) => {
      this.dialogRef.close(true);
    });
  }



  getLocalization(values: any[], lang: LanguageCode) {
    if (values != undefined && values.length > 0)
      return values.find(x => x.language == lang).value;
  }

  onDeleteSubtitle(index: number) {
    this.lesson.subtitles.splice(index, 1);
  }


  onAdd() {
    var subtitle = new Subtitle();
    subtitle.translations.push(new Localization(LanguageCode.Arabic))
    subtitle.translations.push(new Localization(LanguageCode.Turkish))
    this.lesson.subtitles.push(subtitle);
  }
}
