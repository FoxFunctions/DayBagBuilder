import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import {LandingComponent} from './landing/landing.component';
import { WeatherForecastService } from './weather-forecast.service';
import { ParksService } from './parks.service';
import { BagBuilderComponent } from './bag-builder/bag-builder.component';
import {CustomItemsComponent} from './custom-items/custom-items.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LandingComponent,
    BagBuilderComponent,
    CustomItemsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'landing', component: LandingComponent},
      { path: 'bag-builder', component: BagBuilderComponent},
      { path: 'custom-items', component: CustomItemsComponent}
    ])
  ],
  providers: [WeatherForecastService, ParksService],
  bootstrap: [AppComponent]
})
export class AppModule { }

