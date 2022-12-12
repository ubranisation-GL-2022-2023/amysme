import { ReclamationDTO } from './models/reclamation-dto';
import { Component, OnInit } from '@angular/core';
import { StatusEnum } from './models/status-enum';

@Component({
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {

  constructor() { }

  model: ReclamationDTO = {
    content: '',
    status: StatusEnum.done,
  }

  statuses = Object.values(StatusEnum)

  onSubmit() : void{
    console.log(this.model)
  }

  ngOnInit(): void {
  }

}
