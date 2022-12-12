import { Component, OnInit } from '@angular/core';
import { DemandsService } from "../core/services/demands.service";
import { ReclamationService } from "../core/services/reclamation.service";

@Component({
  selector: 'app-all-reclamations',
  templateUrl: './all-reclamations.component.html',
  styleUrls: ['./all-reclamations.component.css']
})
export class AllReclamationsComponent implements OnInit {
  reclamations: any[] = [];

  constructor(private reclamationService: ReclamationService) {
  }

  ngOnInit(): void {
    this.reclamationService.getReclamations().subscribe((reclamations) => {
      this.reclamations = reclamations;
    })
    this.reclamationService.newReclamation.subscribe((data) => {
      console.log(data);

      const filter = this.reclamations.filter(c => c._id === data._id)
      console.log(filter);

      if (filter.length === 0)
        this.reclamations = this.reclamations.concat(data)
    })
  }

  update(i: any) {
    let reclamation = this.reclamations[i]
    reclamation.status++
    if (reclamation.status == 4) {
      reclamation.status = 0
    }
    this.reclamationService.updateReclamation(reclamation)
  }
}
