import { AuthTokenInterceptors } from './interceptors/auth.interceptor';
import { AuthService } from './services/authentication.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { ClientModule } from './client/client.module';
import { SupplierModule } from './supplier/supplier.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    ClientModule,
    SupplierModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptors,multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
