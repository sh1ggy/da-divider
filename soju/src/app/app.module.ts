import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlaceComponent } from "./place/place.component";
import { PricingComponent } from "./place/pricing.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NightComponent } from "./night/night.component";
import { HomeComponent } from "./home/home.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { TotalComponent } from "./total/total.component";
import { HttpClientModule } from "@angular/common/http";
import { NightSmComponent } from './nightsm/nightsm.component';
import { AssignmentComponent } from "./place/assignment.component";
import { ItemsComponent } from "./place/items.component";

@NgModule({
  declarations: [
    AppComponent,
    PlaceComponent,
    PricingComponent,
    NightComponent,
    HomeComponent,
    ContactsComponent,
    TotalComponent,
    NightSmComponent,
    AssignmentComponent,
    ItemsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
