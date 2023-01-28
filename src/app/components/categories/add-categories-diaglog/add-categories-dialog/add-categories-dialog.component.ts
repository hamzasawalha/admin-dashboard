import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Categories, CategoriesDTO , Image, Names } from 'src/app/classes/categories';
import { Result } from 'src/app/classes/response-dto';
import { LanguageCode } from 'src/app/Enums/enums';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-categories-dialog',
  templateUrl: './add-categories-dialog.component.html',
  styleUrls: ['./add-categories-dialog.component.css']
})
export class AddCategoriesDialogComponent {
   category : Categories ;
   addCategoriesDTO : CategoriesDTO ;

   constructor(private categoryService:CategoriesService, private dialogRef: MatDialogRef<AddCategoriesDialogComponent>){
    this.category = new Categories();
    this.addCategoriesDTO = new CategoriesDTO();
   }

    
   onChooseArabicImage(event :any){
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let formData = new FormData();
    formData.append("file",files[0]);
    this.category.arabicImages = formData;
   }

   onChooseTurkishImage(event :any){
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let formData = new FormData();
    formData.append("file",files[0]);
    this.category.turkishImages =  formData;
   }

   async addCategory(){
    await this.addArabicImage();
    await this.addTurkishImage();
    await this.addCategoryData();
   }

  async addArabicImage(){
    await this.categoryService.uploadCategoryFiles(this.category.arabicImages).then((res : Result<any>)=>{
      this.category.arabicImages = environment.fileServer + res.data;
      let arabicImage : Image = new Image();
      arabicImage.language = LanguageCode.Arabic;
      arabicImage.value = this.category.arabicImages;
      this.addCategoriesDTO.images.push(arabicImage);
    });
   }

   async addTurkishImage(){
    await this.categoryService.uploadCategoryFiles(this.category.turkishImages).then((res : Result<any>)=>{
      this.category.turkishImages = environment.fileServer + res.data;
      let turkishImage : Image = new Image();
      turkishImage.language = LanguageCode.Turkish;
      turkishImage.value = this.category.turkishImages;
      this.addCategoriesDTO.images.push(turkishImage);
    });
   }

   async addCategoryData(){
    let names : Names[] = 
    [
      {
        language:LanguageCode.Arabic ,
        value : this.category.arabicName
      },
      {
        language:LanguageCode.Turkish ,
        value : this.category.turkishName
      }
    ]; 
    this.addCategoriesDTO.code = this.category.code;

    this.addCategoriesDTO.names = names;
    await this.categoryService.addCategory(this.addCategoriesDTO).then((res : Result<any>)=>{ 
      this.dialogRef.close(true);
    });
   }

}
