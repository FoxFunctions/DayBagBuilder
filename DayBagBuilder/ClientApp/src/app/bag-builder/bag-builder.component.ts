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
  hikeTimeStartAsIndex: number = 100000; // set to a high number for testing purposes in console log 
  

  constructor(private weather: WeatherForecastService, private hikingBag: HikingBagService, private parks: ParksService) { 
    this.GetTimeIndex();
    this.ShowForecast();
    console.log(weather.tripDuration);
    console.log(this.hikeTimeStartAsIndex);
  }

  ngOnInit(): void {
  }
  ShowForecast(): void {
    this.weather.GetForecast().subscribe((response) => {
      //creating a daily forecast array
    this.forecastArray.push(response);
      for (let i = 0; i < this.forecastArray[0].forecast.forecastday.length; i ++){
        this.dailyForecast.push(this.forecastArray[0].forecast.forecastday[i]);
      }
      // creating hourly forecast arrays for each day in the daily array. 
      for (let i = 0; i < this.forecastArray[0].forecast.forecastday[0].hour.length; i ++){
        this.hourlyForecastDay1.push(this.forecastArray[0].forecast.forecastday[0].hour[i]);
        this.hourlyForecastDay2.push(this.forecastArray[0].forecast.forecastday[1].hour[i]);
        this.hourlyForecastDay3.push(this.forecastArray[0].forecast.forecastday[2].hour[i]);
      }
      //these for loops will remove the initial items in the array so that the forecast is starting at the desired trip start time
      for (let i = 0; i < this.hikeTimeStartAsIndex; i++){
        if (this.weather.hikeDayStart === "today"){
        this.hourlyForecastDay1.shift();
        }
        else if (this.weather.hikeDayStart ==="tomorrow"){
          this.hourlyForecastDay2.shift();
        }
        else if (this.weather.hikeDayStart ==="the-day-after"){
          this.hourlyForecastDay3.shift();
        }
      }
      // this statement will reduce the daily forecast array for day 1 to only show the forecast for your trips duration
      this.hourlyForecastDay1.splice(this.weather.tripDuration);
      
      // accounting for all conditions with a trip beginning today. if hikeDayStart is today and hikeTimestartAsIndex + tripDuration is < 23, the trip will not go into the second day or and those arrays will be set to empty
      if (this.weather.hikeDayStart === "today"){
        if (this.hikeTimeStartAsIndex + this.weather.tripDuration > 23 && this.hikeTimeStartAsIndex + this.weather.tripDuration < 47){
          this.hourlyForecastDay2.splice((this.hikeTimeStartAsIndex + this.weather.tripDuration)-24);
          this.hourlyForecastDay3 = [];
      } else if (this.hikeTimeStartAsIndex + this.weather.tripDuration < 23){
        this.hourlyForecastDay2 = [];
        this.hourlyForecastDay3 = [];
      }
      else if (this.hikeTimeStartAsIndex + this.weather.tripDuration > 47){
        this.hourlyForecastDay3.splice((this.hikeTimeStartAsIndex + this.weather.tripDuration)-48);
      }
    }
    // accountint for all conditions with a trip beginning tomororw
    if (this.weather.hikeDayStart === "tomorrow"){
      this.hourlyForecastDay1 = [];
      this.hourlyForecastDay2.splice(this.weather.tripDuration);
       if (this.hikeTimeStartAsIndex + this.weather.tripDuration > 23 && this.hikeTimeStartAsIndex + this.weather.tripDuration <47){
        this.hourlyForecastDay3.splice((this.hikeTimeStartAsIndex + this.weather.tripDuration)-24);
       }
       else if (this.hikeTimeStartAsIndex + this.weather.tripDuration <23){
         this.hourlyForecastDay3 = [];
       }
    }
    // accounting for limited conditions that may occur with a trip starting the-day-after
    if (this.weather.hikeDayStart === "the-day-after"){
      this.hourlyForecastDay1 = [];
      this.hourlyForecastDay2 = [];
      this.hourlyForecastDay3.splice(this.weather.tripDuration);
    }
    });

  }
  // creating a variable for the index of the hourly array. This is used to display only the correct forecast for the user's trip info.
  GetTimeIndex(): void {
    if (this.weather.hikeStringStart === "00:00"){
      this.hikeTimeStartAsIndex = 0;
    }
    else if (this.weather.hikeStringStart === "01:00"){
      this.hikeTimeStartAsIndex = 1;
    }
    else if (this.weather.hikeStringStart === "02:00"){
      this.hikeTimeStartAsIndex = 2;
    }
    else if (this.weather.hikeStringStart === "03:00"){
      this.hikeTimeStartAsIndex = 3;
    }
    else if (this.weather.hikeStringStart === "04:00"){
      this.hikeTimeStartAsIndex = 4;
    }
    else if (this.weather.hikeStringStart === "05:00"){
      this.hikeTimeStartAsIndex = 5;
    }
    else if (this.weather.hikeStringStart === "06:00"){
      this.hikeTimeStartAsIndex = 6;
    }
    else if (this.weather.hikeStringStart === "07:00"){
      this.hikeTimeStartAsIndex = 7;
    }
    else if (this.weather.hikeStringStart === "08:00"){
      this.hikeTimeStartAsIndex = 8;
    }
    else if (this.weather.hikeStringStart === "09:00"){
      this.hikeTimeStartAsIndex = 9;
    }
    else if (this.weather.hikeStringStart === "10:00"){
      this.hikeTimeStartAsIndex = 10;
    }
    else if (this.weather.hikeStringStart === "11:00"){
      this.hikeTimeStartAsIndex = 11;
    }
    else if (this.weather.hikeStringStart === "12:00"){
      this.hikeTimeStartAsIndex = 12;
    }
    else if (this.weather.hikeStringStart === "13:00"){
      this.hikeTimeStartAsIndex = 13;
    }
    else if (this.weather.hikeStringStart === "14:00"){
      this.hikeTimeStartAsIndex = 14;
    }
    else if (this.weather.hikeStringStart === "15:00"){
      this.hikeTimeStartAsIndex = 15;
    }
    else if (this.weather.hikeStringStart === "16:00"){
      this.hikeTimeStartAsIndex = 16;
    }
    else if (this.weather.hikeStringStart === "17:00"){
      this.hikeTimeStartAsIndex = 17;
    }
    else if (this.weather.hikeStringStart === "18:00"){
      this.hikeTimeStartAsIndex = 18;
    }
    else if (this.weather.hikeStringStart === "19:00"){
      this.hikeTimeStartAsIndex = 19;
    }
    else if (this.weather.hikeStringStart === "20:00"){
      this.hikeTimeStartAsIndex = 20;
    }
    else if (this.weather.hikeStringStart === "21:00"){
      this.hikeTimeStartAsIndex = 21;
    }
    else if (this.weather.hikeStringStart === "22:00"){
      this.hikeTimeStartAsIndex = 22;
    }
    else if (this.weather.hikeStringStart === "23:00"){
      this.hikeTimeStartAsIndex = 23;
    }
  }
}
