import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from '../weather-forecast.service';
import { HikingBagService } from '../hiking-bag.service';
import { Convert, WeatherForecast } from '../WeatherForecast';
import { User } from '../User';
import { BagItem } from '../BagItem';
import { BagSave } from '../BagSave';
import { ParksService } from '../parks.service';
import { Parks } from '../Parks';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  forecastArray: WeatherForecast[] = []; ;
  locationString: string = "";
  locationString2: string = "";
  hikingBagArray: BagItem[] = [];
  parksArray: Parks [] =[];
  constructor(private weather: WeatherForecastService, private hikingBag: HikingBagService, private parks: ParksService) { 
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
  ShowParkActivities(): void  {
    this.parks.locationString2 = this.locationString2;
    this.parks.ShowParkActivities().subscribe((response) => {
      this.parksArray.push(response);
      console.log(this.parksArray)
      console.log(this.locationString2)
    });


  }

  ngOnInit(): void {
  }

}
