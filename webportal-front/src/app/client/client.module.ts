import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { DemandComponent } from './demand/demand.component';



@NgModule({
  declarations: [
    ReclamationComponent,
    DemandComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ClientModule { }
