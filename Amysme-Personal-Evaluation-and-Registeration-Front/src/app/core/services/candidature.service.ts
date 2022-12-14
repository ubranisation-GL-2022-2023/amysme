import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {


  constructor(private http: HttpClient, private socket: Socket) { }

  newCandidature = this.socket.fromEvent<any>('candidature');

  getCandidatures() {
    return this.http.get(environment.candidatureApiBaseUrl + '/').pipe(map((data: any) => {
      return data;
    }));
  }

  postCandidature(newCandidature: any) {
    this.http.post(environment.candidatureApiBaseUrl + '/', newCandidature).subscribe(res => {
      // console.log(res)
    });
  }


}
