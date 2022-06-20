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
  activitiesArray: string[]= [];
  constructor(private weather: WeatherForecastService, private hikingBag: HikingBagService, private parks: ParksService) { 
  
  }

  ShowForecast(): void {
    this.weather.locationString2 = this.locationString;
    this.weather.GetForecast().subscribe((response) => {
    this.forecastArray.push(response);
    });
  }

  ShowHikingBagItems(): void {
    this.hikingBag.ShowAllBagItems().subscribe((response) =>{
      this.hikingBagArray = response
    });
  }
  ShowParkActivities(): void  {
    this.activitiesArray = [];
    this.parks.locationString2 = this.locationString2;
    this.weather.locationString2 = this.locationString2;
    this.parks.ShowParkActivities().subscribe((response) => {
    this.parksArray.push(response);
  
    for (let i = 0; i < this.parksArray[0].data.length; i++){

      this.activitiesArray.push(this.parksArray[0].data[i].name);
    } 
    this.parksArray = [];
    });
  }
  ngOnInit(): void {
  }

}
