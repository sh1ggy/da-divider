import { Component } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-night',
  template: `
    <div class="flex flex-col gap-6">
      <div class="flex flex-col bg-slate-900 p-4 rounded-lg gap-3" *ngFor="let place of placeholderPlaces; let i = index">
        <h1 class="text-xl text-center text-green-700 font-bold">{{place.name}}</h1>
        <app-place [place]="place" [index]="i"/>
      </div>
      <div class="flex flex-row">
        <button (click)="addPlace()" class="btn">Add Place</button>
      </div>
      <button class="btn">Submit</button>
    </div>
  `,
  styles: [
  ]
})
export class NightComponent {
  constructor(
    private storeService: StoreService,
  ) {}

  get placeholderPlaces() {
    return this.storeService.placeholderPlaces;
  }

  get addPlace() {
    return this.storeService.addPlace;
  }
}
