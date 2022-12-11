import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {


  constructor(private http: HttpClient) { }


  getReclamations(){
    return this.http.get(environment.reclamationApiBaseUrl + '/').pipe(map((data:any)=>{
      return data;
    }));
  }

  postReclamation(newCandidature : any){
    this.http.post(environment.reclamationApiBaseUrl + '/',newCandidature).subscribe(res=>{
      // console.log(res)
    });
  }

  updateReclamation(newCandidature : any){
    this.http.post(environment.reclamationApiBaseUrl + '/update',newCandidature).subscribe(res=>{
      // console.log(res)
    });
  }


}
