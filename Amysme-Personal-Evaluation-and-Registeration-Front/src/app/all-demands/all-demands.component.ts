import { Component, OnInit } from '@angular/core';
import { CandidatureService } from "../core/services/candidature.service";
import { DemandsService } from "../core/services/demands.service";

@Component({
  selector: 'app-all-demands',
  templateUrl: './all-demands.component.html',
  styleUrls: ['./all-demands.component.css']
})
export class AllDemandsComponent implements OnInit {
  demands: any[] = [];

  constructor(private demandService: DemandsService) {
  }

  ngOnInit(): void {
    this.demandService.getDemands().subscribe((demands) => {
      this.demands = demands;
    })
    this.demandService.newDemand.subscribe((data) => {
      console.log(data);

      const filter = this.demands.filter(c => c._id === data._id)
      console.log(filter);

      if (filter.length === 0)
        this.demands = this.demands.concat(data)
    })
  }

  update(i: any) {
    let demand = this.demands[i]
    demand.status++
    if (demand.status == 4) {
      demand.status = 0
    }
    this.demandService.updateDemand(demand)
  }

}
