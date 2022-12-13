import { StatusEnum } from './../../../client/reclamation/models/status-enum';
import { RawMaterialSchema } from './raw-material';
export interface OfferDTO{
    offerDate: Date,
  status: StatusEnum,
  totalPrice: number,
  components: [RawMaterialSchema],
  comment: string,
}