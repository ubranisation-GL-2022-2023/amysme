import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    jwtHelper = new JwtHelperService();
    userInfo = new BehaviorSubject(null);
    constructor(private http: HttpClient,private router: Router) {
        const access_token = localStorage.getItem('token');
        if (access_token != null) {
            const decodedUser = this.jwtHelper.decodeToken(access_token);
            this.userInfo.next(decodedUser);
           
        }
    }

    get getUserInfo() {
        if (this.userInfo.value != null)
            return this.userInfo.value;
        const access_token = localStorage.getItem('token');
        if (access_token != null) {
            const decodedUser = this.jwtHelper.decodeToken(access_token);
            this.userInfo.next(decodedUser);
            return decodedUser;
        }
    }

      userLogout(){
        localStorage.removeItem('token');
        this.userInfo.next(null)
      }

    userLogin(login: any): Observable<boolean> {
        console.log("logging in")
        console.log(login)
        if (login && login.login && login.password) {
            console.log("reached here")
            return this.http.post("http://localhost:3000/login", login).pipe(
                map((data: any) => {
                    console.log("inside pipe")
                    console.log(data)
                    if (!data) {
                        return false;
                    }
                    console.log("###################### decoded use")
                    localStorage.setItem('token', data.token);
                    const decodedUser = this.jwtHelper.decodeToken(data.token);
                    console.log(decodedUser)
                    this.userInfo.next(decodedUser);
                    this.redirectToPage(decodedUser.role)
                    return true;
                })
            );
        }
        return of(false);
    }

    redirectToPage(role:string):void{
        if(role == 'client'){
            this.router.navigate(['client', 'demand'])
        }else{
            this.router.navigate(['supplier', 'offer'])
        }
    }

    userRegister(register: any): Observable<boolean> {
        console.log(register);
        if (register) {
            return this.http.post("http://localhost:3000/register", register).pipe(
                map((data: any) => {
                    if (!data) {
                        return false;
                    }
                    localStorage.setItem('token', data.token);
                    const decodedUser = this.jwtHelper.decodeToken(data.access_token);
                    console.log(decodedUser)
                    this.userInfo.next(decodedUser);
                    this.redirectToPage(decodedUser.role)
                    return true;
                })
            );
        }
        return of(false);
    }
}
