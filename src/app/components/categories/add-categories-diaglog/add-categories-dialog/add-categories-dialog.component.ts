import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Categories, CategoriesDTO, Image, Names } from 'src/app/classes/categories';
import { Result } from 'src/app/classes/response-dto';
import { LanguageCode } from 'src/app/enums/enums';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-categories-dialog',
  templateUrl: './add-categories-dialog.component.html',
  styleUrls: ['./add-categories-dialog.component.css']
})
export class AddCategoriesDialogComponent {
  category: Categories;
  categoryDto: CategoriesDTO;
  arabicImage: any;
  turkishImage: any;

  constructor(private categoryService: CategoriesService, private dialogRef: MatDialogRef<AddCategoriesDialogComponent>) {
    this.category = new Categories();
    this.categoryDto = new CategoriesDTO();
  }

  async addArabicImage() {
    await this.uploadImage(this.category.arabicImages, LanguageCode.Arabic);
  }

  async addTurkishImage() {
    await this.uploadImage(this.category.turkishImages, LanguageCode.Turkish);
  }


  async addCategory() {
    await this.addArabicImage();
    await this.addTurkishImage();
    await this.addCategoryData();
  }

  onChooseArabicImage(event: any) {
    const file = this.toFile(event);
    this.category.arabicImages = this.toFormData(file);
    const reader = this.readImage(file);
    reader.onload = () => this.arabicImage = reader.result;
  }

  onChooseTurkishImage(event: any) {
    const file = this.toFile(event);
    this.category.turkishImages = this.toFormData(file);
    const reader = this.readImage(file);
    reader.onload = () => this.turkishImage = reader.result;
  }


  async addCategoryData() {
    let names: Names[] =
      [{
        language: LanguageCode.Arabic,
        value: this.category.arabicName
      },
      {
        language: LanguageCode.Turkish,
        value: this.category.turkishName
      }
      ];
    this.categoryDto.code = this.category.code;
    this.categoryDto.names = names;

    await this.categoryService.add(this.categoryDto).then((res: Result<any>) => {
      this.dialogRef.close(true);
    });

  }


  ///////////////////////////////////////////////////////////
  //////////  Common Images Method //////////////////////////
  //////////////////////////////////////////////////////////

  private readImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return reader;
  }

  private toFormData(file: any) {
    let formData = new FormData();
    formData.append("file", file);
    return formData;
  }


  private toFile(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    return files[0];
  }

  async uploadImage(image: FormData, language: LanguageCode) {
    await this.categoryService.upload(image).then((res: Result<any>) => {
      let url = environment.fileServer + res.data;
      let uploadedImage: Image = new Image();
      uploadedImage.language = language;
      uploadedImage.value = url;
      this.categoryDto.images.push(uploadedImage);
    });
  }

  ///////////////////////////////////////////////////////////
  ////////// Images ////////////////////////////////////////
  //////////////////////////////////////////////////////////

}


