import { Component, OnInit } from '@angular/core';
import { ParksService } from '../parks.service';
import { WeatherForecastService } from '../weather-forecast.service';
import { Hour, WeatherForecast } from '../WeatherForecast';
import { BagItem } from '../BagItem';
import { BagSave } from '../BagSave';
import { HikingBagService } from '../hiking-bag.service';
import { Forecastday } from '../WeatherForecast';

@Component({
  selector: 'app-bag-builder',
  templateUrl: './bag-builder.component.html',
  styleUrls: ['./bag-builder.component.css']
})
export class BagBuilderComponent implements OnInit {
  forecastArray: WeatherForecast[] = [];
  locationString: string = "";
  dailyForecast: Forecastday[] = [];
  hourlyForecastDay1: Hour[] = [];
  hourlyForecastDay2: Hour[] = [];
  hourlyForecastDay3: Hour[] = [];


  constructor(private weather: WeatherForecastService, private hikingBag: HikingBagService, private parks: ParksService) { 
    this.ShowForecast();
  }

  ngOnInit(): void {
  }
  ShowForecast(): void {
    this.weather.GetForecast().subscribe((response) => {
    this.forecastArray.push(response);
      for (let i = 0; i < this.forecastArray[0].forecast.forecastday.length; i ++){
        this.dailyForecast.push(this.forecastArray[0].forecast.forecastday[i]);
        console.log(this.dailyForecast);
      }
      for (let i = 0; i < this.forecastArray[0].forecast.forecastday[0].hour.length; i ++){
        this.hourlyForecastDay1.push(this.forecastArray[0].forecast.forecastday[0].hour[i]);
        this.hourlyForecastDay2.push(this.forecastArray[0].forecast.forecastday[1].hour[i]);
        this.hourlyForecastDay3.push(this.forecastArray[0].forecast.forecastday[2].hour[i]);
      }
    });
  }
}
