import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parks } from './Parks';


@Injectable({
  providedIn: 'root'
})
export class ParksService {
locationString2: string = "";
activitiesArray: string [] = [];
customItemWeight: number = 0;
  constructor(private http: HttpClient) { }
  ShowParkActivities(): Observable <Parks>{
    return this.http.get<Parks>("https://developer.nps.gov/api/v1/activities?q="+this.locationString2+"&api_key=kXqcWPcYb2fgVVAVO30bfMdi217VOjEgkWdL7uLV");
  }
}
