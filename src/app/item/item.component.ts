import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Item } from '../models';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-item',
  template: `
    <div class="flex join">
      <div class="form-control">
        <label class="label">
          <span class="label-text">{{item?.name}}</span>
        </label>
        <label class="input-group">
          <!-- TODO: change how focus & unfocus works, this might not be the best way -->
          <input type="text" (focus)="focusForm()" (focusout)="unfocusForm()" [placeholder]="item?.name" [formControl]="itemName" class="input input-bordered"/>
          <input type="number" (focus)="focusForm()" (focusout)="unfocusForm()" [placeholder]="item?.price" [formControl]="itemPrice" class="input input-bordered" />
          <select (focus)="focusForm()" (focusout)="unfocusForm()" [formControl]="contactName" class="select select-bordered" >
            <option *ngIf="!(item?.contact)" disabled selected>Pick contact</option>
            <option *ngFor="let contact of placeholderContacts" [selected]="item?.contact?.name == contact?.name">{{contact.name}}</option>
          </select>
        </label>
        <button *ngIf="editing" class="btn" (click)="saveItem()">Save</button>
      </div>
    </div>
  `,
  styles: [
  ], 
})
export class ItemComponent {
  @Input() item: Item | undefined;
  @Input() index: number = 0;
  
  itemName = new FormControl();
  itemPrice = new FormControl();
  contactName = new FormControl();

  newItem: Item | undefined;
  editing: boolean = false;

  constructor(
    private storeService: StoreService,
  ) {}

  get placeholderContacts() {
    return this.storeService.placeholderContacts;
  }

  get placeholderItems() {
    return this.storeService.placeholderItems;
  }

  saveItem() {
    this.newItem = {
      name: this.itemName.value,
      price: this.itemPrice.value,
      contact: this.placeholderContacts.find((item) => item.name == this.contactName.value),
    }
    // var currentIndex = this.placeholderItems.findIndex((item) => item.name == "");
    this.placeholderItems[this.index] = this.newItem;
    console.log("SAVED:", this.placeholderItems);
    this.editing = false;
  }

  focusForm() {
    this.editing = true;
  }

  unfocusForm() {
    this.editing = false;
  }
}
