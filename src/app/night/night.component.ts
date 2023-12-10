import { Component, Input } from '@angular/core';
import { StoreService } from '../store.service';
import { FormControl } from '@angular/forms';
import { Night, Place } from '../models';

@Component({
  selector: 'app-night',
  template: `
    <div class="flex flex-col gap-6 justify-center items-center">
      <h1 class="text-3xl">Night {{this.storeService.chosenNight.date.toLocaleDateString()}}</h1>
      <div *ngFor="let place of this.storeService.chosenNight.places; let i = index" class="flex flex-col bg-slate-900 p-4 rounded-lg gap-3" >
        <app-place *ngIf="!this.storeService.editMode" [place]="place" [index]="i"/>
        <app-place-edit *ngIf="this.storeService.editMode" [place]="place" [index]="i" />
      </div>
      <div class="flex">
        <button (click)="this.storeService.addPlace(storeService.chosenNight)" class="btn w-1/2">Add Place</button>
        <button (click)="this.storeService.editMode = !this.storeService.editMode" class="btn w-1/2">{{this.storeService.editMode ? "Return to Items" : "Edit Places"}}</button>
      </div>
      <button class="btn">Submit</button>
    </div>
    <div>
  `,
  styles: [
  ]
})
export class NightComponent {
  @Input() night: Night | undefined;
 
  constructor(
    public storeService: StoreService,
  ) { }

  setNight(newNight: Night) {
    this.night = newNight;
  }
}
