import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO, UserLoginResponse } from 'src/app/classes/user/user-login-dto';
import { AuthService } from 'src/app/services/security/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   user:UserDTO;

  constructor(private authService:AuthService , private router : Router){
    this.user= new UserDTO();
  }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.user).subscribe((response:UserLoginResponse)=>{
      if(response.isSuccess){
        this.authService.setUserToken(response.data);
        this.router.navigate(['/categories'])
      }
    });
  }

}
