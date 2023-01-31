import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { CategoriesDTO } from 'src/app/classes/categories';
import { EditorialsDTO } from 'src/app/classes/editorials';
@Injectable({
  providedIn: 'root'
})
export class EditorialsService {
  constructor(private http: HttpClient) { }

  getEditorials(pageIndex: number, pageSize: number): Observable<any> {
    let url = environment.serviceUrl + "editorials?page_size=" + pageSize + "&page_number=" + pageIndex;
    return this.http.get<any>(url);
  }

  getEditorial(id: string): Observable<any> {
    let url = environment.serviceUrl + "editorials/" + id;
    return this.http.get<any>(url);
  }

  addEditorial(category: EditorialsDTO) {
    let url = environment.serviceUrl + "editorials";
    return firstValueFrom(this.http.post(url, category));
  }
}
