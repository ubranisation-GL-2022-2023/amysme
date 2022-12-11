import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandsService {


  constructor(private http: HttpClient) { }


  getDemands(){
    return this.http.get(environment.demandApiBaseUrl + '/').pipe(map((data:any)=>{
      return data;
    }));
  }

  postDemand(newCandidature : any){
    this.http.post(environment.demandApiBaseUrl + '/',newCandidature).subscribe(res=>{
      // console.log(res)
    });
  }

  updateDemand(newCandidature : any){
    this.http.post(environment.demandApiBaseUrl + '/update',newCandidature).subscribe(res=>{
      // console.log(res)
    });
  }


}
