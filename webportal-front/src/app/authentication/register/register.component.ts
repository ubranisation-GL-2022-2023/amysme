import { RegisterDTO } from './models/register-dto';
import { Component, OnInit } from '@angular/core';
import { RoleEnum } from '../models/role-enum';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  model: RegisterDTO = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    repeatedPassword: '',
    role: RoleEnum.client,
  }

  roles = Object.values(RoleEnum)

  onSubmit() : void{
    console.log(this.model)
  }

  ngOnInit(): void {
  }

}
