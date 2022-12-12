import { Component } from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {DemandsService} from "../core/services/demands.service";
import {ReclamationService} from "../core/services/reclamation.service";

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent {
  public newReclamation = {
    userId: "userId",
    content: "",
    status: 0,
  };

  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private reclamationService: ReclamationService) {
  }


  sendData() {
    console.log(this.newReclamation)
    this.reclamationService.postReclamation(this.newReclamation);
  }
}
