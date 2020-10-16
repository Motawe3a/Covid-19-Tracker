import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummery } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/10-15-2020.csv";

  constructor(private http: HttpClient) { }

  getGlobalData(): any {
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map(result => {
        let data: GlobalDataSummery[] = [];
        let raw = {};
        let rows = result.split('\n');
        rows.splice(0, 1);
        rows.forEach(row => {
          let columns = row.split(/,(?=\S)/);
          let cs = {
            country: columns[3],
            // add + to covert string to number
            confirmed: +columns[7],
            deaths: +columns[8],
            recoverd: +columns[9],
            active: +columns[10],
          };
          let temp: GlobalDataSummery = raw[cs.country];
          if (temp) {
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.deaths = cs.deaths + temp.deaths;
            temp.recoverd = cs.recoverd + temp.recoverd;
            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }
          data.push(cs);
        });
        return <GlobalDataSummery>Object.values(raw);
      })
    );
  }

}
