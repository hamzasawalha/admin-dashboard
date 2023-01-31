import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditorialsViewDTO } from 'src/app/classes/editorials';
import { Result } from 'src/app/classes/response-dto';
import { LanguageCode } from 'src/app/Enums/enums';
import { EditorialsService } from 'src/app/services/editorials/editorials.service';

@Component({
  selector: 'app-editorials',
  templateUrl: './editorials.component.html',
  styleUrls: ['./editorials.component.css']
})
export class EditorialsComponent {
  editorials: any;

  constructor(private editorialsService: EditorialsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEditorials();
  }


  getEditorials() {
    this.editorialsService.getEditorials(1, 10).subscribe((res: Result<EditorialsViewDTO>) => {
      this.editorials = res.data;
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

  editEditorial(categoryId: number) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = { categoryId };
    // dialogConfig.maxWidth = '100vw !important';
    // dialogConfig.width = '100vw !important';


    // this.dialog.open(EditCategoriesDiaglogComponent, dialogConfig)
    //   .afterClosed().subscribe(res => {
    //     if (res) {
    //       this.getCategories();
    //     }
    //   });
  }


  addEditorial() {
    // this.dialog.open(AddCategoriesDialogComponent).afterClosed().subscribe(res => {
    //   if (res) {
    //     this.getCategories();
    //   }
    // });

  }
  pageChanged(event: any) {

  }
}
