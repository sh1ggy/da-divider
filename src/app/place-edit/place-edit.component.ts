import { Component, Input } from '@angular/core';
import { Place } from '../models';
import { FormControl } from '@angular/forms';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-place-edit',
  template: `
    <div *ngIf="place" (submit)="savePlace(place)" class="form-control flex join my-4">
      <input type="text" [placeholder]="place.name" [formControl]="placeName" class="input input-bordered"/>
      <div class="flex">
        <button (click)="savePlace(place)" type="submit" class="btn w-1/2 text-green-500">Save</button>
        <button (click)="deletePlace(index)" class="btn w-1/2 text-red-500">Delete</button>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class PlaceEditComponent {
  @Input() place: Place | undefined;
  @Input() index: number = 0;
  placeName = new FormControl(null);

  constructor(
    private storeService: StoreService,
  ) { }
  
  savePlace(place: Place) {
    if (!this.placeName.value) {
      console.log("NO CHANGES");
      return;
    };

    place.name = this.placeName.value;
    console.log("SAVED", place);
    this.storeService.editMode = false;
    return;
  }

  deletePlace(i: number) {
    this.storeService.placeholderPlaces.splice(i, 1);
    this.storeService.editMode = false;
    return;
  }


}
