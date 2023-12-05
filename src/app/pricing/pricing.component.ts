import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact, Item, Place } from '../models';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-pricing',
  template: `
    <div class="flex join my-4 w-full">
      <div *ngIf="item" class="form-control" (submit)="saveItem()">
        <label class="input-group">
          <!-- TODO: change how focus & unfocus works, this might not be the best way -->
          <input type="number" (focus)="focusForm()" (focusout)="unfocusForm()" [placeholder]="item.quantity ? item.quantity : 1" [formControl]="itemQuantity" class="input input-bordered w-1/6"/>
          <input type="text" (focus)="focusForm()" (focusout)="unfocusForm()" [placeholder]="item.name" [formControl]="itemName" class="input input-bordered w-4/6"/>
          <input type="number" (focus)="focusForm()" (focusout)="unfocusForm()" [placeholder]="this.storeService.calcQuantPrice(item)" [formControl]="itemPrice" min="0.00" max="300.00" step="0.01" class="input input-bordered" />
        </label>
        <div class="flex">
          <button (mousedown)="saveItem()" *ngIf="editing" type="submit" class="btn w-1/2 text-green-500">Save</button>
          <button (mousedown)="deleteItem()" *ngIf="editing" class="btn w-1/2 text-red-500">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [
  ],
})
export class PricingComponent {
  constructor(
    public storeService: StoreService,
  ) { }

  @Input() item: Item | undefined;
  @Input() contacts: Contact[] | undefined;
  @Input() place: Place | undefined;
  @Input() index: number = 0;

  itemQuantity = new FormControl(null);
  itemName = new FormControl(null);
  itemPrice = new FormControl(null);
  
  newItem: Item | undefined;
  editing: boolean = false;

  // TODO: move all this logic to the service.
  saveItem() {
    if (!this.place || !this.item) {
      console.log("NO CHANGES")
      return
    };
    this.newItem = {
      name: this.itemName.value ? this.itemName.value : this.item.name,
      quantity: this.itemQuantity.value ? this.itemQuantity.value : this.item.quantity,
      price: this.itemPrice.value ? this.itemPrice.value : this.item.price,
    }
    this.place.items[this.index] = this.newItem;
    console.log("SAVED:", this.place);
    this.editing = false;
    return;
  }

  deleteItem() {
    this.place?.items.splice(this.index, 1);
    return;
  }

  focusForm() {
    this.editing = true;
    return;
  }

  unfocusForm() {
    this.editing = false;
    return;
  }
}
