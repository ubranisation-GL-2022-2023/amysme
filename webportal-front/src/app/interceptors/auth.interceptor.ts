import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthTokenInterceptors implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler)
  :Observable<HttpEvent<any>> {
   const token = localStorage.getItem("token");
   const transformedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
   });
   console.log("intercepted #############################")
   console.log(transformedReq)
   return next.handle(transformedReq);
  }
}