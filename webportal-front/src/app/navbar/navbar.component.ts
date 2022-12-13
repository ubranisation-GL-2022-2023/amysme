import { Router } from '@angular/router';
import { AuthService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn = false;
  isClient = false;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.userInfo.subscribe((value)=>{
      this.loggedIn = value != null;
      if(value != null){
        this.isClient = (value['role'] as String).includes('client');
      }else{
        this.isClient = false;
      }
    })
   }

   onClicked(): void{
    if(this.loggedIn){//logout
      this.authService.userLogout();
      this.router.navigate(['/login'])
    }else{
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

}
