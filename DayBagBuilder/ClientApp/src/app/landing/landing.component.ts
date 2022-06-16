import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from '../weather-forecast.service';
import { HikingBagService } from '../hiking-bag.service';
import { Convert, WeatherForecast } from '../WeatherForecast';
import { User } from '../User';
import { BagItem } from '../BagItem';
import { BagSave } from '../BagSave';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  forecastArray: WeatherForecast[] = []; ;
  locationString: string = "";
  hikingBagArray: BagItem[] = [];

  constructor(private weather: WeatherForecastService, private hikingBag: HikingBagService) { 
    this.ShowHikingBagItems()
  }

  ShowForecast(): void {
    this.weather.locationString = this.locationString;
    this.weather.GetForecast().subscribe((response) => {
    this.forecastArray.push(response);
    console.log(this.forecastArray)
    });
  }

  ShowHikingBagItems(): void {
    this.hikingBag.ShowAllBagItems().subscribe((response) =>{
      this.hikingBagArray = response
    });
  }

  ngOnInit(): void {
  }

}
