import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { CategoriesDTO } from 'src/app/classes/categories';
import { LessonsDTO } from 'src/app/classes/lessons';
@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  constructor(private http: HttpClient) { }

  getLessons(pageIndex: number, pageSize: number): Observable<any> {
    let url = environment.serviceUrl + "lessons?page_size=" + pageSize + "&page_number=" + pageIndex;
    return this.http.get<any>(url);
  }

  getLesson(id: string): Observable<any> {
    let url = environment.serviceUrl + "lessons/" + id;
    return this.http.get<any>(url);
  }

  uploadLessonFiles(formData: FormData) {
    let url = environment.serviceUrl + "files";
    return firstValueFrom(this.http.post(url, formData));
  }

  addLesson(category: LessonsDTO) {
    let url = environment.serviceUrl + "lessons";
    return firstValueFrom(this.http.post(url, category));
  }
}
