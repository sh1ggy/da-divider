import { Component, Input } from '@angular/core';
import { Contact, Item, Place } from '../models';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-place',
  template: `
    <div class="flex flex-col gap-4">
      <div *ngFor="let item of this.place?.items; let i = index">
        <app-item [item]="item" [place]="this.place" [contacts]="this.place?.contactList" [index]="i" />
      </div>
      <div class="flex flex-row">
        <button (click)="addItem(this.place?.items)" class="btn">Add Item</button>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class PlaceComponent {
  @Input() place: Place | undefined;
  @Input() index: number = 0;
  
  constructor(
    private storeService: StoreService,
  ) {}

  get addItem() {
    return this.storeService.addItem;
  }
}
