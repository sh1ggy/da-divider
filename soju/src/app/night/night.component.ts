import { Component, Input, OnInit } from "@angular/core";
import { StoreService } from "../store.service";
import { FormControl } from "@angular/forms";
import { Night, Place } from "../models";

@Component({
  selector: "app-night",
  template: `
    <div class="flex flex-col items-center justify-center gap-6">
      <h1 class="text-3xl">Night #{{this.storeService.chosenNight.id}}</h1>
      <code>{{ this.storeService.chosenNight.date }} </code>
      <div class="flex"></div>
      <div
        *ngFor="
          let place of this.storeService.chosenNight.places;
          let i = index
        "
        class="flex flex-col gap-3 rounded-lg bg-slate-900 p-4"
      >
        <app-place [place]="place" [index]="i" />
      </div>
      <button
        (click)="this.storeService.addPlace(storeService.chosenNight)"
        class="btn w-1/2"
      >
        Add Place
      </button>
      <button class="btn">Submit</button>
    </div>
    <div></div>
  `,
  styles: [],
})
export class NightComponent implements OnInit {
  @Input() night: Night | undefined;

  constructor(public storeService: StoreService) {}
  ngOnInit(): void {
    this.storeService.getNight();
  }

  setNight(newNight: Night) {
    this.night = newNight;
  }
}
