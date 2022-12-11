import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../core/services/candidature.service';

@Component({
  selector: 'app-all-candidatures',
  templateUrl: './all-candidatures.component.html',
  styleUrls: ['./all-candidatures.component.css']
})
export class AllCandidaturesComponent implements OnInit {
  candidatures: any[] = [];


  constructor(private candidatureService: CandidatureService) { }
  ngOnInit(): void {
    this.candidatureService.getCandidatures().subscribe((candidature) => {
      this.candidatures = candidature;
    })
    this.candidatureService.newCandidature.subscribe((data) => {
      console.log(data);

      const filter = this.candidatures.filter(c => c._id === data._id)
      console.log(filter);

      if (filter.length === 0)
        this.candidatures = this.candidatures.concat(data)
    })
  }



}
