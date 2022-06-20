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
  hikeTimeStartAsIndex: number = 100000;


 


  constructor(private weather: WeatherForecastService, private hikingBag: HikingBagService, private parks: ParksService) { 
    this.ShowForecast();
    console.log(weather.tripDuration);
    console.log(weather.hikeDateStart);
    this.GetTimeIndex();
    console.log(this.hikeTimeStartAsIndex);
  }

  ngOnInit(): void {
  }
  ShowForecast(): void {
    this.weather.GetForecast().subscribe((response) => {
    this.forecastArray.push(response);
      for (let i = 0; i < this.forecastArray[0].forecast.forecastday.length; i ++){
        this.dailyForecast.push(this.forecastArray[0].forecast.forecastday[i]);
      }
      for (let i = 0; i < this.forecastArray[0].forecast.forecastday[0].hour.length; i ++){
        this.hourlyForecastDay1.push(this.forecastArray[0].forecast.forecastday[0].hour[i]);
        this.hourlyForecastDay2.push(this.forecastArray[0].forecast.forecastday[1].hour[i]);
        this.hourlyForecastDay3.push(this.forecastArray[0].forecast.forecastday[2].hour[i]);
      }
      for (let i = 0; i < this.hikeTimeStartAsIndex; i++){
        this.hourlyForecastDay1.shift();
      }
      this.hourlyForecastDay1.splice(this.weather.tripDuration);
    });

  }
  GetTimeIndex(): void {
    if (this.weather.hikeTimeStart.setMinutes(0).toString() === "00:00"){
      this.hikeTimeStartAsIndex = 0;
    }
    else if (this.weather.hikeTimeStart.toString() === "01:00"){
      this.hikeTimeStartAsIndex = 1;
    }
    else if (this.weather.hikeTimeStart.toString() === "02:00"){
      this.hikeTimeStartAsIndex = 2;
    }
    else if (this.weather.hikeTimeStart.toString() === "03:00"){
      this.hikeTimeStartAsIndex = 3;
    }
    else if (this.weather.hikeTimeStart.toString() === "04:00"){
      this.hikeTimeStartAsIndex = 4;
    }
    else if (this.weather.hikeTimeStart.toString() === "05:00"){
      this.hikeTimeStartAsIndex = 5;
    }
    else if (this.weather.hikeTimeStart.toString() === "06:00"){
      this.hikeTimeStartAsIndex = 6;
    }
    else if (this.weather.hikeTimeStart.toString() === "07:00"){
      this.hikeTimeStartAsIndex = 7;
    }
    else if (this.weather.hikeTimeStart.toString() === "08:00"){
      this.hikeTimeStartAsIndex = 8;
    }
    else if (this.weather.hikeTimeStart.toString() === "09:00"){
      this.hikeTimeStartAsIndex = 9;
    }
    else if (this.weather.hikeTimeStart.toString() === "10:00"){
      this.hikeTimeStartAsIndex = 10;
    }
    else if (this.weather.hikeTimeStart.toString() === "11:00"){
      this.hikeTimeStartAsIndex = 11;
    }
    else if (this.weather.hikeTimeStart.toString() === "12:00"){
      this.hikeTimeStartAsIndex = 12;
    }
    else if (this.weather.hikeTimeStart.toString() === "13:00"){
      this.hikeTimeStartAsIndex = 13;
    }
    else if (this.weather.hikeTimeStart.toString() === "14:00"){
      this.hikeTimeStartAsIndex = 14;
    }
    else if (this.weather.hikeTimeStart.toString() === "15:00"){
      this.hikeTimeStartAsIndex = 15;
    }
    else if (this.weather.hikeTimeStart.toString() === "16:00"){
      this.hikeTimeStartAsIndex = 16;
    }
    else if (this.weather.hikeTimeStart.toString() === "17:00"){
      this.hikeTimeStartAsIndex = 17;
    }
    else if (this.weather.hikeTimeStart.toString() === "18:00"){
      this.hikeTimeStartAsIndex = 18;
    }
    else if (this.weather.hikeTimeStart.toString() === "19:00"){
      this.hikeTimeStartAsIndex = 19;
    }
    else if (this.weather.hikeTimeStart.toString() === "20:00"){
      this.hikeTimeStartAsIndex = 20;
    }
    else if (this.weather.hikeTimeStart.toString() === "21:00"){
      this.hikeTimeStartAsIndex = 21;
    }
    else if (this.weather.hikeTimeStart.toString() === "22:00"){
      this.hikeTimeStartAsIndex = 22;
    }
    else if (this.weather.hikeTimeStart.toString() === "23:00"){
      this.hikeTimeStartAsIndex = 23;
    }
  }
}
