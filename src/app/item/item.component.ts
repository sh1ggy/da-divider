import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact, Item, Place } from '../models';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-item',
  template: `
    <div class="flex join">
      <div class="form-control" (submit)="saveItem()">
        <label class="input-group">
          <!-- TODO: change how focus & unfocus works, this might not be the best way -->
          <input type="text" (focus)="focusForm()" (focusout)="unfocusForm()" [placeholder]="item?.name" [formControl]="itemName" class="input input-bordered"/>
          <input type="number" (focus)="focusForm()" (focusout)="unfocusForm()" [placeholder]="item?.price" [formControl]="itemPrice" min="0.00" max="300.00" step="0.01" class="input input-bordered" />
          <select (focus)="focusForm()" (focusout)="unfocusForm()" [formControl]="contactName" class="select select-bordered" >
            <option *ngIf="!(item?.contact)" disabled selected>Pick contact</option>
            <option *ngFor="let contact of contacts" [selected]="item?.contact?.name == contact?.name">{{contact.name}}</option>
          </select>
        </label>
        <button (mousedown)="saveItem()" *ngIf="editing" type="submit" class="btn">Save</button>
      </div>
    </div>
  `,
  styles: [
  ],
})
export class ItemComponent {
  @Input() item: Item | undefined;
  @Input() contacts: Contact[] | undefined;
  @Input() place: Place | undefined;
  @Input() index: number = 0;

  itemName = new FormControl();
  itemPrice = new FormControl();
  contactName = new FormControl();

  newItem: Item | undefined;
  editing: boolean = false;

  saveItem() {
    if (!this.place) return;
    // if (this.itemName == null || this.itemPrice == null || this.contactName == undefined) {
    //   console.log("NO CHANGES");
    //   return;
    // }
    this.newItem = {
      name: this.itemName.value,
      price: this.itemPrice.value,
      contact: this.contacts?.find((item) => item.name == this.contactName.value),
    }
    this.place.items[this.index] = this.newItem;
    console.log("SAVED:", this.place);
    this.editing = false;
    return;
  }

  focusForm() {
    this.editing = true;
  }

  unfocusForm() {
    this.editing = false;
  }
}
