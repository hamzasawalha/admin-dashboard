import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { CategoriesDTO } from 'src/app/classes/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) { }

  getCategories(pageIndex : number , pageSize : number) :Observable<any>{
    let url = environment.serviceUrl + "categories?page_size="+pageSize +"&page_number="+pageIndex;
    return this.http.get<any>(url);
  }

  uploadCategoryFiles(formData : FormData) {
   let url = environment.serviceUrl + "files";
   return firstValueFrom(this.http.post(url , formData));
  }

  addCategory(category:CategoriesDTO){
   let url = environment.serviceUrl + "categories";
   return firstValueFrom( this.http.post(url , category));
  }
}
