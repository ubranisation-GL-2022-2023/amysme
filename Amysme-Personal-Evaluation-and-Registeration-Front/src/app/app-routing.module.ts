import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllCandidaturesComponent} from './all-candidatures/all-candidatures.component';
import {CandidatureComponent} from './candidature/candidature.component';
import {AllDemandsComponent} from "./all-demands/all-demands.component";
import {AllReclamationsComponent} from "./all-reclamations/all-reclamations.component";
import {DemandsComponent} from "./demands/demands.component";
import {ReclamationComponent} from "./reclamation/reclamation.component";

const routes: Routes = [
  {
    path: "candidatureForm",
    component: CandidatureComponent,
  }, {
    path: "allCandidatures",
    component: AllCandidaturesComponent,
  }, {
    path: "demands",
    component: AllDemandsComponent,
  },
  {
    path: "reclamations",
    component: AllReclamationsComponent,
  },
  {
    path: "demandForm",
    component: DemandsComponent,
  },
  {
    path: "reclamationForm",
    component: ReclamationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
