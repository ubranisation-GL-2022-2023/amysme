import { OfferDTO } from './models/offer-dto';
import { Component, OnInit } from '@angular/core';
import { StatusEnum } from 'src/app/client/reclamation/models/status-enum';

@Component({
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  constructor() { }

  model: OfferDTO = {
    status: StatusEnum.done,
    components: [{
      name: '',
      price: 0,
      quantity: 0,
    }],
    offerDate: new Date(),
    totalPrice: 0,
    comment: '',
  }

  statuses = Object.values(StatusEnum)

  onSubmit() : void{
    this.model.totalPrice = this.model.components[0].price
    console.log(this.model)
  }

  ngOnInit(): void {
  }

}
