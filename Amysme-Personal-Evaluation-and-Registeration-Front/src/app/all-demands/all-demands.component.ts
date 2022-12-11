import {Component, OnInit} from '@angular/core';
import {CandidatureService} from "../core/services/candidature.service";
import {DemandsService} from "../core/services/demands.service";

@Component({
  selector: 'app-all-demands',
  templateUrl: './all-demands.component.html',
  styleUrls: ['./all-demands.component.css']
})
export class AllDemandsComponent implements OnInit {
  demands :any[] = [];

  constructor(private demandService: DemandsService) {
  }

  ngOnInit(): void {
    this.demandService.getDemands().subscribe((candidature) => {
      this.demands = candidature;


    })
  }

  update(i: any) {
    let demand = this.demands[i]
    demand.status ++
    if (demand.status == 4) {
      demand.status = 0
    }
    this.demandService.updateDemand(demand)
  }

}
