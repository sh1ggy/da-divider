import { Injectable } from '@angular/core';
import { Contact, Item } from './models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _placeholderContacts: Contact[] = [
    { name: "Tyrone", mobile: "0401222222", email: "tyrone@test.com.au" },
    { name: "Doug", mobile: "0401333333", email: "doug@test.com.au" },
    { name: "Ray", mobile: "0401444444", email: "ray@test.com.au" },
  ];
  private _placeholderItems: Item[] = [
    { name: "Item 1", price: 10 },
    { name: "Item 2", price: 20, contact: this.placeholderContacts[1] },
    { name: "Item 3", price: 30, contact: this.placeholderContacts[2] },
  ];

  get placeholderContacts(): Contact[] { return this._placeholderContacts; }
  set placeholderContacts(newContacts: Contact[]) {
    this._placeholderContacts = newContacts;
    console.log(this._placeholderContacts);
    return;
  }

  get placeholderItems(): Item[] { return this._placeholderItems }
  set placeholderItems(newItems: Item[]) {
    this._placeholderItems = newItems;
    console.log(this._placeholderItems);
    return;
  }

  addItem() {
    this.placeholderItems.push({ name: "", price: 0 });
    // console.log(this.placeholderItems);
    return;
  }

  constructor() { }
}
