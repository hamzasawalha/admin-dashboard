import { Component, Inject } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editorials, EditorialsDTO, Localization, Pagination } from 'src/app/classes/editorials';
import { LessonsViewDTO } from 'src/app/classes/lessons';
import { Result } from 'src/app/classes/response-dto';
import { LanguageCode } from 'src/app/enums/enums';
import { EditorialsService } from 'src/app/services/editorials/editorials.service';
import { LessonsService } from 'src/app/services/lessons/lessons.service';

@Component({
  selector: 'app-edit-editoirals-diaglog',
  templateUrl: './edit-editoirals-diaglog.component.html',
  styleUrls: ['./edit-editoirals-diaglog.component.css']
})
export class EditEditoiralsDiaglogComponent {

  editorial: Editorials;
  editEditorialsDTO: EditorialsDTO;
  lessons: any;
  lessonsForm: NgModel;

  constructor(private editorialsService: EditorialsService, private lessonService: LessonsService, private dialogRef: MatDialogRef<EditEditoiralsDiaglogComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editorial = new Editorials();
  }


  ngOnInit(): void {
    this.getLessons();
    this.getEditorial();
  }

  getLessons() {
    this.lessonService.getLessons(1, 100).subscribe((res: Result<Pagination>) => {
      this.lessons = res.data.content;
    });
  }

  getEditorial() {
    this.editorialsService.getEditorial(this.data.editorialId).subscribe((res: Result<EditorialsDTO>) => {
      console.log(res.data);
      (res.data);
      this.editEditorialsDTO = res.data;
      this.editorial.id = this.editEditorialsDTO.id;
      this.editorial.lessons = this.editEditorialsDTO.lessons;

      // fill localizations 
      this.editorial.arabicTitle = this.getLocalization(this.editEditorialsDTO.titles, LanguageCode.Arabic);
      this.editorial.turkishTitle = this.getLocalization(this.editEditorialsDTO.titles, LanguageCode.Turkish);

    });
  }



  async addLesson() {
    await this.addlessonData();
  }


  async addlessonData() {


    let title: Localization[] =
      [
        {
          language: LanguageCode.Arabic,
          value: this.editorial.arabicTitle
        },
        {
          language: LanguageCode.Turkish,
          value: this.editorial.turkishTitle
        }
      ];


    this.editEditorialsDTO.lessons = this.editorial.lessons;
    await this.editorialsService.addEditorial(this.editEditorialsDTO).then((res: Result<any>) => {
      this.dialogRef.close(true);
    });
  }



  getLocalization(values: any[], lang: LanguageCode) {
    if (values != undefined && values.length > 0)
      return values.find(x => x.language == lang).value;
  }

}
