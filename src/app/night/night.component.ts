import { Component } from '@angular/core';
import { StoreService } from '../store.service';
import { FormControl } from '@angular/forms';
import { Place } from '../models';

@Component({
  selector: 'app-night',
  template: `
    <div class="flex flex-col gap-6">
      <div class="flex flex-col bg-slate-900 p-4 rounded-lg gap-3" *ngFor="let place of placeholderPlaces; let i = index">
        <app-place *ngIf="!editingPlace" [place]="place" [index]="i"/>
        <app-place-edit *ngIf="editingPlace" [place]="place" [index]="i" />
      </div>
      <div class="flex">
        <button (click)="addPlace()" class="btn w-1/2">Add Place</button>
        <button (click)="setEditMode()" class="btn w-1/2">{{editingPlace ? "Return to Items" : "Edit Places"}}</button>
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
  ) { }

  get placeholderPlaces() {
    return this.storeService.placeholderPlaces;
  }

  get addPlace() {
    return this.storeService.addPlace;
  }

  get editingPlace() {
    return this.storeService.editMode;
  }

  setEditMode() {
    return this.storeService.editMode = !this.editingPlace;
  }

}
