import { Injectable } from "@angular/core";
import { Contact, Item, Night, Place } from "./models";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  // PLACEHOLDER
  //-- Group contacts
  private _placeholderContacts: Contact[] = [
    // { id: 1, name: "Tyrone", mobile: "0401222222", email: "tyrone@test.com.au" },
    // { id: 2, name: "Doug", mobile: "0401333333", email: "doug@test.com.au" },
    // { id: 3, name: "Ray", mobile: "0401444444", email: "ray@test.com.au" },
    // { id: 4, name: "Amara", mobile: "0401444444", email: "amara@test.com.au" },
  ];
  private _night1PlaceholderContacts: Contact[] = [
    {
      id: 1,
      name: "Tyrone",
      mobile: "0401222222",
      email: "tyrone@test.com.au",
    },
    { id: 4, name: "Amara", mobile: "0401444444", email: "amara@test.com.au" },
  ];
  private _night2PlaceholderContacts: Contact[] = [
    { id: 2, name: "Doug", mobile: "0401333333", email: "doug@test.com.au" },
    { id: 3, name: "Ray", mobile: "0401444444", email: "ray@test.com.au" },
  ];
  private _placeholderItems1: Item[] = [
    { id: 1, name: "Item 1", price: 10 },
    {
      id: 2,
      name: "Item 2",
      price: 20,
      quantity: 2,
      contacts: [
        this._night1PlaceholderContacts[1],
        this._night1PlaceholderContacts[0],
      ],
    },
    {
      id: 3,
      name: "Item 3",
      price: 30,
      quantity: 3,
      contacts: [
        this._night1PlaceholderContacts[1],
        this._night1PlaceholderContacts[0],
      ],
    },
  ];
  private _placeholderItems2: Item[] = [
    { id: 4, name: "Item 4", price: 40 },
    {
      id: 5,
      name: "Item 5",
      price: 50,
      contacts: [this._night2PlaceholderContacts[1]],
    },
    {
      id: 6,
      name: "Item 6",
      price: 60,
      contacts: [
        this._night2PlaceholderContacts[0],
        this._night2PlaceholderContacts[1],
      ],
    },
  ];
  private _placeholderPlaces: Place[] = [
    {
      id: 1,
      name: "Place 1",
      items: this._placeholderItems1,
      contacts: this._night1PlaceholderContacts,
    },
    {
      id: 2,
      name: "Place 2",
      items: this._placeholderItems2,
      contacts: this._night2PlaceholderContacts,
    },
  ];
  private _placeholderPlaces2: Place[] = [
    {
      id: 3,
      name: "Place 3",
      items: this._placeholderItems2,
      contacts: this._night2PlaceholderContacts,
    },
    {
      id: 4,
      name: "Place 4",
      items: this._placeholderItems1,
      contacts: this._night1PlaceholderContacts,
    },
  ];
  // private _placeholderNights: Night[] = [
  //   { id: 1, places: this._placeholderPlaces, date: new Date(Date.now()), contacts: this._night1PlaceholderContacts},
  //   { id: 2, places: this._placeholderPlaces2, date: new Date(Date.now()), contacts: this._night2PlaceholderContacts},
  // ]
  private _placeholderNights: Night[] = [];

  private _chosenNight: Night = this._placeholderNights[0];

  getNights() {
    const url = `${environment.apiUrl}/nights`
    return this.http.get<Night[]>(url);
  }

  get chosenNight(): Night {
    return this._chosenNight;
  }
  set chosenNight(chosenNight: Night) {
    this._chosenNight = chosenNight;
    console.log(this._chosenNight);
    return;
  }

  get placeholderContacts(): Contact[] {
    return this._placeholderContacts;
  }
  set placeholderContacts(newContacts: Contact[]) {
    this._placeholderContacts = newContacts;
    console.log(this._placeholderContacts);
    return;
  }

  get placeholderNights(): Night[] {
    return this._placeholderNights;
  }

  get placeholderPlaces(): Place[] {
    return this._placeholderPlaces;
  }

  get placeholderItems(): Item[] {
    return this._placeholderItems1;
  }
  set placeholderItems(newItems: Item[]) {
    this._placeholderItems1 = newItems;
    console.log(this._placeholderItems1);
    return;
  }

  getSplitPrice(item: Item) {
    if (!item.price || !item.contacts || item.contacts.length == 0) return;
    if (!item.quantity) return item.price / item.contacts.length;
    return (item.price * item.quantity) / item.contacts.length;
  }

  calcQuantPrice(item: Item) {
    if (item.quantity == null || item.price == null) return item.price;
    return item.price * item.quantity;
  }

  addNight() {
    console.log("Adding night!");

    this.placeholderNights.push({
      id: this._placeholderNights.length + 1,
      date: new Date(Date.now()),
      places: [],
      contacts: [],
    });
    console.log(this.placeholderNights);
  }

  addPlace(night: Night) {
    console.log("Adding place!");

    night.places.push({
      id: this.placeholderNights.length + 1,
      name: `Place ${this.chosenNight.places.length + 1}`,
      items: [{ id: this.placeholderItems.length + 1, name: "", price: 0 }],
      contacts: [],
    });

    console.log(night.places);
    return;
  }

  addItem(items: Item[]) {
    if (!items) return;
    console.log("Adding item!");

    items.push({ id: this.placeholderItems.length + 1, name: "", price: 0 });
    return;
  }

  addContact(name: string, email: string, mobile: string) {
    console.log("Adding contact!");

    this.placeholderContacts.push({
      id: this.placeholderContacts.length + 1,
      name: name,
      email: email,
      mobile: mobile,
    });
    return;
  }

  editContact(name: string, email: string, mobile: string, index: number) {
    console.log("Editing contact!");

    this.placeholderContacts[index] = {
      id: this.placeholderContacts.length + 1,
      name: name,
      email: email,
      mobile: mobile,
    };
    return;
  }

  removeContact(nightIndex: number, contactIndex: number) {
    if (this.placeholderNights[nightIndex].contacts?.length == 1) {
      console.log("ERROR: Night needs to have at least one contact");
      return false;
    }
    this.placeholderNights[nightIndex].contacts?.splice(contactIndex, 1);
    return true;
  }

  removeGroupContact(contactIndex: number) {
    // TODO: also invoke remove contact from night because you need to delete instances
    // of this contact everywhere
    if (this.placeholderContacts.length == 1) {
      console.log("ERROR: Night needs to have at least one contact");
      return false;
    }
    this.placeholderContacts.splice(contactIndex, 1);
    return true;
  }

  calcTotal(contact: Contact, items: Item[]) {
    if (!items) return 0;
    var total: number = 0;

    items.forEach((item: Item, i: number) => {
      var splitPrice = this.getSplitPrice(item);
      if (item.contacts?.includes(contact)) {
        if (splitPrice) total += splitPrice;
      }
    });
    return total;
  }

  constructor
  (
    private http: HttpClient, 
  ) {}
}
