import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceComponent } from './place/place.component';
import { PricingComponent } from './item/pricing/pricing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NightComponent } from './night/night.component';
import { AssignmentComponent } from './item/assignment/assignment.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceComponent,
    PricingComponent,
    NightComponent,
    AssignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
