import { OfferComponent } from './supplier/offer/offer.component';
import { ReclamationComponent } from './client/reclamation/reclamation.component';
import { DemandComponent } from './client/demand/demand.component';
import { LoginComponent } from './authentication/login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './authentication/register/register.component';

const routes: Routes = [
  {component: LoginComponent,path:'login'},
{component: RegisterComponent,path:'register'},
{path:'client', children:[
  {path: 'demand', component:DemandComponent},
  {path: 'reclamation', component:ReclamationComponent}
]},
{path:'supplier', children: [
  {path: 'offer', component:OfferComponent}
]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
