import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HikingBagService } from '../hiking-bag.service';
import { ParksService } from '../parks.service';
import { WeatherForecastService } from '../weather-forecast.service';
import { BagItem } from '../BagItem';
import { BagSave } from '../BagSave';

@Component({
  selector: 'app-custom-items',
  templateUrl: './custom-items.component.html',
  styleUrls: ['./custom-items.component.css']
})
export class CustomItemsComponent implements OnInit {
  bagSaveArray : BagSave[] = [];
  userName: string = "";
  itemName: string = "";
  bagsaveID: number = 0;
  bagSaveUpdateId: number = 0;
  bagSaveUpdateName: string = "";


  constructor(private weather: WeatherForecastService, private hikingBag: HikingBagService, private parks: ParksService, private router: Router) { }

  ngOnInit(): void {
  }
  ShowBagSavesByUserName(): void{
    this.hikingBag.GetBagSavesByUserName(this.userName).subscribe((response) =>{
      this.bagSaveArray = response;
      this.hikingBag.bagSaveArray = this.bagSaveArray;
      this.hikingBag.userName = this.userName;
      console.log(this.bagSaveArray);
    })
  }
  CreateNewBagSave(): void {
    let bagSavePlaceHolder: BagSave = new BagSave (undefined!,this.userName,this.itemName);
    this.hikingBag.CreateBagSave(bagSavePlaceHolder).subscribe();
    console.log(this.itemName);
  }
  DeleteBagSave(id: number): void {
    this.hikingBag.DeleteBagSave(id).subscribe();
  }
  UpdateBagSave(id: number): void{
    let updatedBagSave = new BagSave(undefined!, this.userName, this.bagSaveUpdateName)
    
    this.hikingBag.UpdateBagSave(id, updatedBagSave).subscribe();
  }
}
