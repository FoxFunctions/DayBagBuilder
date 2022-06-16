import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parks } from './Parks';


@Injectable({
  providedIn: 'root'
})
export class ParksService {
locationString: string = "";
  constructor(private http: HttpClient) { }

  ShowParkActivites(): Observable <Parks>{
    return this.http.get<Parks>("https://developer.nps.gov/api/v1/activities?q="+this.locationString+"&api_key=kXqcWPcYb2fgVVAVO30bfMdi217VOjEgkWdL7uLV");
  }

}
