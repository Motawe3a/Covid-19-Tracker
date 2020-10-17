import { Component, OnInit } from '@angular/core';
import { GlobalDataSummery } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  totalConfirmed = 0;
  totalDeath = 0;
  totalActive = 0;
  totalRecovered = 0;
  data: GlobalDataSummery[];
  countriesList: string[] = [];

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(result => {
      this.data = result;
      this.data.forEach(cs => {
        this.countriesList.push(cs.country);
      });
    });
  }

  updateValues(country: string) {
    console.log(country);
    this.data.forEach(cs => {
      if (cs.country === country) {
        this.totalActive = cs.active;
        this.totalConfirmed = cs.confirmed;
        this.totalDeath = cs.deaths;
        this.totalRecovered = cs.recoverd;
      }
    });
  }

}
