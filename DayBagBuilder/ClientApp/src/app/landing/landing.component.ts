import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from '../weather-forecast.service';
import { HikingBagService } from '../hiking-bag.service';
import { Convert, WeatherForecast } from '../WeatherForecast';
import { User } from '../User';
import { BagItem } from '../BagItem';
import { BagSave } from '../BagSave';
import { ParksService } from '../parks.service';
import { Parks } from '../Parks';
import { Router } from '@angular/router';


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
  tripDuration: number = 0;
  tripLocation: string = "";
  hikeTimeStart: Date = new Date();
  hikeDateStart: Date = new Date();
  hikeStringStart: string = "";

  constructor(private weather: WeatherForecastService, private hikingBag: HikingBagService, private parks: ParksService, private router: Router) { 


  }

  ShowForecast(): void {
    this.weather.locationString2 = this.locationString;
    this.weather.GetForecast().subscribe((response) => {
    this.forecastArray.push(response);
    });
  }

  GetTripDurationAndMoveToBagBuilder(): void{
    this.weather.hikeTimeStart.setMinutes(0);
    this.weather.tripDuration = this.tripDuration;
    this.parks.locationString2 = this.locationString2;
    this.weather.locationString2 = this.locationString2;
    this.weather.hikeTimeStart = this.hikeTimeStart;
    this.weather.hikeDateStart = this.hikeDateStart;
    this.weather.hikeStringStart = this.hikeStringStart;

    this.router.navigateByUrl(`bag-builder`);
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
    this.tripLocation = this.locationString2;
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
