import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferComponent } from './offer/offer.component';



@NgModule({
  declarations: [
    OfferComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SupplierModule { }
