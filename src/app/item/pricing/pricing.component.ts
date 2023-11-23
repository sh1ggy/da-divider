import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact, Item, Place } from '../../models';
import { StoreService } from '../../store.service';

@Component({
  selector: 'app-pricing',
  template: `
    <div class="flex join my-4">
      <div class="form-control" (submit)="saveItem()">
        <label class="input-group">
          <!-- TODO: change how focus & unfocus works, this might not be the best way -->
          <input type="text" (focus)="focusForm()" (focusout)="unfocusForm()" [placeholder]="item?.name" [formControl]="itemName" class="input input-bordered"/>
          <input type="number" (focus)="focusForm()" (focusout)="unfocusForm()" [placeholder]="item?.price" [formControl]="itemPrice" min="0.00" max="300.00" step="0.01" class="input input-bordered" />
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
  @Input() item: Item | undefined;
  @Input() contacts: Contact[] | undefined;
  @Input() place: Place | undefined;
  @Input() index: number = 0;

  itemName = new FormControl(null);
  itemPrice = new FormControl(null);
  // contactName = new FormControl(null);

  newItem: Item | undefined;
  editing: boolean = false;

  saveItem() {
    if (!this.place || this.itemName.value == null || this.itemPrice.value == null) {
      console.log("NO CHANGES")
      return
    };
    this.newItem = {
      name: this.itemName.value,
      price: this.itemPrice.value,
      // contact: this.contacts?.find((item) => item.name == this.contactName.value),
    }
    this.place.items[this.index] = this.newItem;
    console.log("SAVED:", this.place);
    this.editing = false;
    return;
  }

  deleteItem() {
    this.place?.items.splice(this.index, 1);
  }

  focusForm() {
    this.editing = true;
  }

  unfocusForm() {
    this.editing = false;
  }
}
