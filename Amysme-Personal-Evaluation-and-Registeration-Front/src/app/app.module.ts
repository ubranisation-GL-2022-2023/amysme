import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips'; 
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { AllCandidaturesComponent } from './all-candidatures/all-candidatures.component';
import { MatTableModule } from '@angular/material/table';
import { AllDemandsComponent } from './all-demands/all-demands.component';
import { DemandsComponent } from './demands/demands.component';
import { AllReclamationsComponent } from './all-reclamations/all-reclamations.component';
import { ReclamationComponent } from './reclamation/reclamation.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    CandidatureComponent,
    AllCandidaturesComponent,
    AllDemandsComponent,
    DemandsComponent,
    AllReclamationsComponent,
    ReclamationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    SocketIoModule.forRoot(config)
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
