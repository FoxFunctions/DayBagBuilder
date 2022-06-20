import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecast } from './WeatherForecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
locationString2: string = "";
tripDuration: number = 0;
hikeTimeStart: Date = new Date();
hikeDateStart: Date = new Date();
hikeStringStart: string = "";
  constructor(private http: HttpClient) { }

  GetForecast(): Observable<WeatherForecast>{
    return this.http.get<WeatherForecast>("https://api.weatherapi.com/v1/forecast.json?key=decce63ab48c465fbff134804221506&q="+this.locationString2+"&days=3&aqi=yes&alerts=yes");
  }
}
