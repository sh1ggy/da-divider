import { Component } from '@angular/core';
import { Contact, Item } from '../models';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-place',
  template: `
    <div class="flex flex-col gap-4">
      <div class="cart-item" *ngFor="let item of placeholderItems; let i = index">
        <app-item [item]="item" [index]="i"/>
      </div>
      <div class="flex flex-row">
        <button (click)="addItem()" class="btn">Add</button>
        <button (click)="saveItems(placeholderItems)" class="btn">Save</button>
      </div>
      <button class="btn">Submit</button>
    </div>
  `,
  styles: [
  ]
})
export class PlaceComponent {
  constructor(
    private storeService: StoreService,
  ) {}

  get placeholderContacts() {
    return this.storeService.placeholderContacts;
  }
  get placeholderItems() {
    return this.storeService.placeholderItems;
  }

  get addItem() {
    return this.storeService.addItem;
  }

  saveItems(newItems: Item[]) {
    this.storeService.placeholderItems = newItems;
    return;
  }
}
