import { BusinessService } from './../../services/business.service';
import { DemandDTO } from './models/demand-dto';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss']
})
export class DemandComponent implements OnInit {

  constructor(private readonly businessService: BusinessService) { }

  model: DemandDTO = {
    house: {
      hasGarage: false,
      housePlan: 'plan.jpg',
      surface: 0,
      numberOfRooms: 0
    },
    budget: 0
  }

  onSubmit(): void {
    console.log(this.model)
    this.businessService.clientDemand(this.model).subscribe((data) => { console.log("success") }, (error) => { console.log(error) });
  }


  ngOnInit(): void {
  }

}
