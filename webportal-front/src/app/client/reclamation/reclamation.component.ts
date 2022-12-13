import { BusinessService } from './../../services/business.service';
import { ReclamationDTO } from './models/reclamation-dto';
import { Component, OnInit } from '@angular/core';
import { StatusEnum } from './models/status-enum';

@Component({
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {

  constructor(private readonly businessService:BusinessService) { }

  model: ReclamationDTO = {
    content: '',
    status: StatusEnum.done,
  }

  statuses = Object.values(StatusEnum)

  onSubmit() : void{
    console.log(this.model)
    this.businessService.clientReclamation(this.model).subscribe((data) => { console.log("success") }, (error) => { console.log(error) });
  }

  ngOnInit(): void {
  }

}
