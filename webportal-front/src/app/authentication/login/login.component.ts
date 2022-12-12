import { LoginDTO } from './models/login-dto';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  model: LoginDTO = {
    login: '',
    password: ''
  }

  onSubmit() : void{
    console.log(this.model)
  }

  ngOnInit(): void {
  }

}
