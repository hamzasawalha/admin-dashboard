import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories, CategoriesDTO, CategoriesViewDTO, Image, Names } from 'src/app/classes/categories';
import { Result } from 'src/app/classes/response-dto';
import { LanguageCode } from 'src/app/Enums/enums';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-categories-diaglog',
  templateUrl: './edit-categories-diaglog.component.html',
  styleUrls: ['./edit-categories-diaglog.component.css']
})
export class EditCategoriesDiaglogComponent implements OnInit {
  category: Categories;
  editCategoriesDTO: CategoriesDTO;
  arabicImage: any;
  turkishImage: any;

  constructor(private categoryService: CategoriesService, private dialogRef: MatDialogRef<EditCategoriesDiaglogComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) {
    this.category = new Categories();
  }


  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategory(this.data.categoryId).subscribe((res: Result<CategoriesDTO>) => {
      this.editCategoriesDTO = res.data;
      this.category.id = this.editCategoriesDTO.id;
      this.category.code = this.editCategoriesDTO.code;

      // fill localizations 
      this.category.arabicName = this.getLocalization(this.editCategoriesDTO.names, LanguageCode.Arabic);
      this.category.turkishName = this.getLocalization(this.editCategoriesDTO.names, LanguageCode.Turkish);
      this.category.turkishImages = this.getLocalization(this.editCategoriesDTO.images, LanguageCode.Turkish);
      this.category.arabicImages = this.getLocalization(this.editCategoriesDTO.images, LanguageCode.Arabic);

      // for render image 
      this.turkishImage = this.category.turkishImages;
      this.arabicImage = this.category.arabicImages;
    });
  }


  onChooseArabicImage(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    let formData = new FormData();
    formData.append("file", files[0]);
    this.category.arabicImages = formData;
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
    this.category.turkishImages = formData;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.turkishImage = reader.result;
    };
  }

  async addCategory() {
    await this.addArabicImage();
    await this.addTurkishImage();
    await this.addCategoryData();
  }

  async addArabicImage() {
    if (this.category.arabicImages instanceof FormData) {
      await this.categoryService.uploadCategoryFiles(this.category.arabicImages).then((res: Result<any>) => {
        this.category.arabicImages = environment.fileServer + res.data;
        let arabicImage: Image = new Image();
        arabicImage.language = LanguageCode.Arabic;
        arabicImage.value = this.category.arabicImages;
        const existingIndex = this.editCategoriesDTO.images.findIndex(img => img.language === LanguageCode.Arabic);
        if (existingIndex !== -1) {
          this.editCategoriesDTO.images[existingIndex] = arabicImage;
        } else {
          this.editCategoriesDTO.images.push(arabicImage);
        }
      });
    }
  }


  async addTurkishImage() {
    if (this.category.turkishImages instanceof FormData) {
      await this.categoryService.uploadCategoryFiles(this.category.turkishImages).then((res: Result<any>) => {
        this.category.turkishImages = environment.fileServer + res.data;
        let turkishImage: Image = new Image();
        turkishImage.language = LanguageCode.Turkish;
        turkishImage.value = this.category.turkishImages;
        const existingIndex = this.editCategoriesDTO.images.findIndex(img => img.language === LanguageCode.Turkish);
        if (existingIndex !== -1) {
          this.editCategoriesDTO.images[existingIndex] = turkishImage;
        } else {
          this.editCategoriesDTO.images.push(turkishImage);
        }
      });
    }
  }


  async addCategoryData() {
    let names: Names[] =
      [
        {
          language: LanguageCode.Arabic,
          value: this.category.arabicName
        },
        {
          language: LanguageCode.Turkish,
          value: this.category.turkishName
        }
      ];
    this.editCategoriesDTO.code = this.category.code;
    this.editCategoriesDTO.id = this.category.id;
    this.editCategoriesDTO.names = names;
    await this.categoryService.addCategory(this.editCategoriesDTO).then((res: Result<any>) => {
      this.dialogRef.close(true);
    });
  }



  getLocalization(values: any[], lang: LanguageCode) {
    if (values != undefined && values.length > 0)
      return values.find(x => x.language == lang).value;
  }


}


