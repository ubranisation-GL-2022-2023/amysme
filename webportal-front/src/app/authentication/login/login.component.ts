import { AuthService } from './../../services/authentication.service';
import { LoginDTO } from './models/login-dto';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly authService: AuthService) { }

  model: LoginDTO = {
    login: '',
    password: ''
  }

  onSubmit() : void{
    this.authService.userLogin(this.model).subscribe((data)=> {}, (error)=> {console.log(error);alert("error")})
    console.log(this.model)
  }

  ngOnInit(): void {
  }

}
