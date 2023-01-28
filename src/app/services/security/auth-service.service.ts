import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO, UserLoginResponse } from 'src/app/classes/user/user-login-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: UserDTO) : Observable<UserLoginResponse>{
    let url = environment.serviceUrl + "auth/signin";
    return this.http.post<UserLoginResponse>(url , user);
  }


  setUserToken(token:string){
    let userStorage = {
      token : token
    }
    localStorage.setItem("user" , JSON.stringify(userStorage));
  }

  getAuthToken(){
    let user = JSON.parse(localStorage.getItem("user"));
    
    return user != null ? user.token : null;
  }
   
}
