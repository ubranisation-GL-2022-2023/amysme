import {Component} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {CandidatureService} from "../core/services/candidature.service";
import {DemandsService} from "../core/services/demands.service";

@Component({
  selector: 'app-demands',
  templateUrl: './demands.component.html',
  styleUrls: ['./demands.component.css']
})
export class DemandsComponent {

  public newDemand = {
    userId: "userId",
    reason: 0,
    comment: "",
    status: 0,
  };

  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private demandService: DemandsService) {
  }


  sendData() {
    console.log(this.newDemand)
    this.demandService.postDemand(this.newDemand);

  }

}
