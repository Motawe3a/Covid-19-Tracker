import { Component, OnInit } from '@angular/core';
import { GoogleChartComponent, GoogleChartInterface } from 'ng2-google-charts';
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
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  };
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart'
  };
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
          this.initChart();
        }
      });
    });
  }

  initChart() {
    let dataTable = [];
    dataTable.push(["country", "Cases"]);
    this.globalData.forEach(value => {
      if (value.confirmed > 350000) {
        dataTable.push([
          value.country, value.confirmed
        ]);
      }
    })
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {
        height: 500,
      },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {
        height: 500,
      },
    };
  }

}
