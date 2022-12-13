import { DemandDTO } from './../client/demand/models/demand-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ReclamationDTO } from '../client/reclamation/models/reclamation-dto';
import { OfferDTO } from '../supplier/offer/models/offer-dto';

@Injectable({
    providedIn: 'root'
})
export class BusinessService {
    constructor(private http: HttpClient) { }

    clientDemand(demand: DemandDTO): Observable<boolean> {
        const data = {...demand.house,"budget": demand.budget};
        return this.http.post("http://localhost:3000/customerDemand", data).pipe(map((data:any)=> {return !data}))  
    }

    clientReclamation(demand: ReclamationDTO): Observable<boolean> {
        return this.http.post("http://localhost:3000/reclamation", demand).pipe(map((data:any)=> {return !data}))  
    }

    supplierOffer(demand: OfferDTO): Observable<boolean> {
        return this.http.post("http://localhost:3000/supplier/offer", demand).pipe(map((data:any)=> {return !data}))  
    }
}
