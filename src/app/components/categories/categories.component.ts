import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesViewDTO } from 'src/app/classes/categories';
import { Result } from 'src/app/classes/response-dto';
import { LanguageCode } from 'src/app/Enums/enums';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { AddCategoriesDialogComponent } from './add-categories-diaglog/add-categories-dialog/add-categories-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  constructor(private categoriesService: CategoriesService , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories() {
   this.categoriesService.getCategories(1 , 10).subscribe((res:Result<CategoriesViewDTO>)=>{
    this.categories = res.data;
    console.log(this.categories);
   });
  }

  getArabicName(names : any[]){
    if(names != undefined && names.length > 0)
       return  names.find(x=>x.language == LanguageCode.Arabic).value;
  }


  getTurkishName(names : any[]){
    if(names != undefined && names.length > 0)
       return  names.find(x=>x.language == LanguageCode.Turkish).value;
  }

  editCategory(categoryId : number){

  }

  addCategory(){
    this.dialog.open(AddCategoriesDialogComponent).afterClosed().subscribe(res=>{
      if(res){
        this.getCategories();
      }        
    });

  }
  pageChanged(event : any){
   
  }
}

