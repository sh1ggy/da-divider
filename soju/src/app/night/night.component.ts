import { Component, Input, OnInit } from "@angular/core";
import { StoreService } from "../store.service";
import { FormControl } from "@angular/forms";
import { Night, Place } from "../models";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-night",
  template: `
    <div class="flex flex-col items-center justify-center gap-6">
      <h1 class="text-3xl">Night #{{this.night?.id}}</h1>
      <code>{{ this.night?.date }} </code>
      <div class="flex"></div>
      <div
        *ngFor="
          let place of this.places;
          let i = index
        "
        class="flex flex-col gap-3 rounded-lg bg-slate-900 p-4"
      >
        <app-place [place]="place" [index]="i" />
      </div>
      <button
        (click)="addPlace()"
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
  night: Night | undefined;
  places: Place[] | undefined;

  constructor(public storeService: StoreService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const nightId: string | null = this.route.snapshot.paramMap.get('id');
    if (nightId == null) return;
    this.storeService.getNight(nightId).subscribe((night: Night) => this.night = night);
    this.storeService.getPlacesByNight(nightId).subscribe((places: Place[]) => this.places = places)
  }

  addPlace() {
    const nightId: string | undefined = this.night?.id.toString();
    if (nightId === undefined) return;
    this.storeService.addPlace(this.night);
    this.storeService.getPlacesByNight(nightId).subscribe((places: Place[]) => this.places = places)
  }

  setNight(newNight: Night) {
    this.night = newNight;
  }
}
