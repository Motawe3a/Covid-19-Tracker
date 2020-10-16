import { Component, OnInit } from '@angular/core';
import { GlobalDataSummery } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalDeath = 0;
  totalActive = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummery[];
  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.dataService.getGlobalData().subscribe(data => {
      console.log(data);
      this.globalData = data;
      data.forEach(result => {
        if (!Number.isNaN(result.confirmed)) {
          this.totalConfirmed += result.confirmed;
          this.totalDeath += result.deaths;
          this.totalActive += result.active;
          this.totalRecovered += result.recoverd;
        }
      });
    });
  }

}
