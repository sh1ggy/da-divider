import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PlaceComponent } from "./place/place.component";
import { PricingComponent } from "./pricing/pricing.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NightComponent } from "./night/night.component";
import { HomeComponent } from "./home/home.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { TotalComponent } from "./total/total.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PlaceComponent,
    PricingComponent,
    NightComponent,
    HomeComponent,
    ContactsComponent,
    TotalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
