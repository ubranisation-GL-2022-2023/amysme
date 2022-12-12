import { DemandDTO } from './models/demand-dto';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss']
})
export class DemandComponent implements OnInit {

  constructor() { }

  model: DemandDTO = {
    houseData: {
      hasGarage: false,
      housePlan: 'plan.jpg',
      surface:0,
      numberOfRooms:0
    },
    totalBudget: 0
  }

  onSubmit() : void{
    console.log(this.model)
  }


  ngOnInit(): void {
  }

}
