import { Injectable } from '@angular/core';
import { Contact, Item, Place } from './models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _placeholderContacts: Contact[] = [
    { name: "Tyrone", mobile: "0401222222", email: "tyrone@test.com.au" },
    { name: "Doug", mobile: "0401333333", email: "doug@test.com.au" },
    { name: "Ray", mobile: "0401444444", email: "ray@test.com.au" },
  ];
  private _placeholderItems1: Item[] = [
    { name: "Item 1", price: 10 },
    { name: "Item 2", price: 20, contact: this.placeholderContacts[1] },
    { name: "Item 3", price: 30, contact: this.placeholderContacts[2] },
  ];

  private _placeholderItems2: Item[] = [
    { name: "Item 4", price: 40 },
    { name: "Item 5", price: 50, contact: this.placeholderContacts[1] },
    { name: "Item 6", price: 60, contact: this.placeholderContacts[2] },
  ];

  private _placeholderPlaces: Place[] = [
    { name: "Place 1", items: this._placeholderItems1, contactList: this._placeholderContacts },
    { name: "Place 2", items: this._placeholderItems2, contactList: this._placeholderContacts },
  ]

  get placeholderContacts(): Contact[] { return this._placeholderContacts; }
  set placeholderContacts(newContacts: Contact[]) {
    this._placeholderContacts = newContacts;
    console.log(this._placeholderContacts);
    return;
  }

  get placeholderPlaces(): Place[] { return this._placeholderPlaces }

  get placeholderItems(): Item[] { return this._placeholderItems1 }
  set placeholderItems(newItems: Item[]) {
    this._placeholderItems1 = newItems;
    console.log(this._placeholderItems1);
    return;
  }

  addPlace() {
    console.log("Adding place!")
    this.placeholderPlaces.push({ name: `Place ${this.placeholderPlaces.length + 1}`, items: [{ name: "", price: 0 }] })
    return;
  }

  addItem(items: Item[] | undefined) {
    console.log("Adding item!")
    if (!items) return;
    items.push({ name: "", price: 0 });
    return;
  }

  constructor() { }
}
