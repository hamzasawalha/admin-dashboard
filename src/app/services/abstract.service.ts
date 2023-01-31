import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
 providedIn: 'root'
})
export abstract class AbstractService {
 constructor(private http: HttpClient) { }

 abstract path: string;


 getAll(pageIndex: number, pageSize: number): Observable<any> {
  let url = environment.serviceUrl + this.path + "?page_size=" + pageSize + "&page_number=" + pageIndex;
  return this.http.get<any>(url);
 }

 get(id: string): Observable<any> {
  let url = environment.serviceUrl + this.path + "/" + id;
  return this.http.get<any>(url);
 }

 upload(formData: FormData) {
  let url = environment.serviceUrl + "files";
  return firstValueFrom(this.http.post(url, formData));
 }

 add(body: any) {
  let url = environment.serviceUrl + this.path;
  return firstValueFrom(this.http.post(url, body));
 }

}