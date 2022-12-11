import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {


  constructor(private http: HttpClient) { }


  getCandidatures(){
    return this.http.get(environment.candidatureApiBaseUrl + '/all-candidature').pipe(map((data:any)=>{
        return data;
    }));
  }

  postCandidature(newCandidature : any){
    this.http.post(environment.candidatureApiBaseUrl + '/register',newCandidature).subscribe(res=>{
       // console.log(res)
   });
 }


}
