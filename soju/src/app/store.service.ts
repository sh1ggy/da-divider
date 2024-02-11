import { Injectable } from "@angular/core";
import {
  Contact,
  Item,
  Night,
  Place,
  NewPlaceRequest,
  NewNightRequest,
  NewContactRequest,
  EditContactRequest,
  EditPlaceRequest,
  NewItemRequest,
  EditItemRequest,
  EditNightRequest,
} from "./models";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";

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

  private headers = new HttpHeaders()
    .set("Accept", "application/json")
    .set("Content-Type", "application/json");

  private currentUser = 2147483647;

  getNights() {
    const url = `${environment.apiUrl}/nights`;
    return this.http.get<Night[]>(url);
  }

  getNight(nightId: string) {
    const url = `${environment.apiUrl}/nights/${nightId}`;
    return this.http.get<Night>(url);
  }

  getPlacesByNight(nightId: string) {
    const url = `${environment.apiUrl}/places/${nightId}`;
    return this.http.get<Place[]>(url);
  }

  getContacts() {
    const url = `${environment.apiUrl}/contacts`;
    return this.http.get<Contact[]>(url);
  }

  getContactsByNight(contactIds: number[]) {
    const url = `${environment.apiUrl}/contacts`;
    const contactJSON = new HttpParams({
      fromObject: { "contactIds[]": contactIds },
    });
    return this.http.get<Contact[]>(url, { params: contactJSON });
  }

  getItems(placeId: number | undefined) {
    if (placeId === undefined) return;
    const url = `${environment.apiUrl}/items/${placeId}`;
    return this.http.get<Item[]>(url);
  }

  get placeholderContacts(): Contact[] {
    return this._placeholderContacts;
  }
  set placeholderContacts(newContacts: Contact[]) {
    this._placeholderContacts = newContacts;
    console.log(this._placeholderContacts);
    return;
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

  addNight(): Observable<Night> | undefined {
    console.log("Adding night!");

    const url = `${environment.apiUrl}/nights`;

    const nightReq: NewNightRequest = {
      userCreatedId: this.currentUser,
      date: new Date().toISOString(),
    };

    const req = this.http.post<Night>(url, JSON.stringify(nightReq), {
      headers: this.headers,
    });
    req.subscribe((res) => res);

    console.log("Adding night:", { nightReq });
    return req;
  }

  editNightContacts(night: Night, contact: Contact, isAdd: boolean) {
    const url = `${environment.apiUrl}/nights/${night.id}`;
    if (isAdd) night.contacts.push(contact);
    else {
      const cIndex = night.contacts.findIndex((nContact: Contact) => nContact == contact)
      night.contacts.splice(cIndex, 1);
    }

    const nightReq: EditNightRequest = {
      userCreatedId: this.currentUser,
      night: night,
    };
    console.log(JSON.stringify(nightReq));
    const req = this.http.put<Night>(url, JSON.stringify(nightReq), {
      headers: this.headers,
    });

    req.subscribe((res) => res);
    return req;
  }

  deleteNight(nightId: number) {
    const url = `${environment.apiUrl}/nights/${nightId}`;
    const req = this.http.delete<Night>(url);
    req.subscribe();
    console.log("Deleting night:", nightId);
    return req;
  }

  addPlace(night: Night | undefined): Observable<Place> | undefined {
    if (night === undefined) return;
    const url = `${environment.apiUrl}/places`;

    const placeReq: NewPlaceRequest = {
      userCreatedId: this.currentUser,
      name: `Place X`,
      nightId: night.id,
    };

    const req = this.http.post<Place>(url, JSON.stringify(placeReq), {
      headers: this.headers,
    });
    req.subscribe((res) => res);

    console.log("Adding place:", { placeReq });
    return req;
  }

  editPlace(place: Place | undefined, name: string | null, night: Night) {
    if (place === undefined || name === null) return;
    console.log("Editing place!");

    const url = `${environment.apiUrl}/places/${place.id}`;

    place.name = name;
    place.night = night;
    const placeReq: EditPlaceRequest = {
      userCreatedId: this.currentUser,
      place: place,
    };
    console.log({place})
    console.log(JSON.stringify(placeReq))

    const req = this.http.put<Place>(url, JSON.stringify(placeReq), {
      headers: this.headers,
    });

    req.subscribe((res) => res);
    return req;
  }

  deletePlace(placeId: number | undefined) {
    if (placeId === undefined) return undefined;
    const url = `${environment.apiUrl}/places/${placeId}`;
    const req = this.http.delete<Place>(url);
    req.subscribe();
    console.log("Deleting place:", placeId);
    return req;
  }

  addItem(placeId: number | undefined): Observable<Item> | undefined {
    if (placeId === undefined) return undefined;

    console.log("Adding item!");

    const url = `${environment.apiUrl}/items`;
    const itemReq: NewItemRequest = {
      userCreatedId: this.currentUser,
      name: "",
      price: 0,
      placeId: placeId,
    };
    const req = this.http.post<Item>(url, JSON.stringify(itemReq), {
      headers: this.headers,
    });

    req.subscribe((req) => req);

    console.log("Adding item:", { itemReq });

    return req;
  }

  editItem(item: Item) {
    console.log("Editing item!");

    const url = `${environment.apiUrl}/items/${item.id}`;

    const itemReq: EditItemRequest = {
      userCreatedId: this.currentUser,
      item: item,
    };
    console.log(JSON.stringify(itemReq));

    const req = this.http.put<Item>(url, JSON.stringify(itemReq), {
      headers: this.headers,
    });

    console.log(req);

    req.subscribe((res) => res);
    return req;
  }

  deleteItem(itemId: number) {
    const url = `${environment.apiUrl}/items/${itemId}`;
    const req = this.http.delete<Item>(url);
    req.subscribe();
    console.log("Deleting item:", itemId);
    return req;
  }

  addContact(
    name: string,
    email: string,
    mobile: string,
  ): Observable<Contact> | undefined {
    console.log("Adding contact!");

    const url = `${environment.apiUrl}/contacts`;

    const contactReq: NewContactRequest = {
      userCreatedId: this.currentUser,
      name: name,
      email: email,
      mobile: mobile,
    };

    const req = this.http.post<Contact>(url, JSON.stringify(contactReq), {
      headers: this.headers,
    });
    req.subscribe((res) => res);
    return req;
  }

  editContact(contact: Contact) {
    console.log("Editing contact!");

    const url = `${environment.apiUrl}/contacts/${contact.id}`;

    const contactReq: EditContactRequest = {
      userCreatedId: this.currentUser,
      contact: contact,
    };
    console.log(JSON.stringify(contactReq));

    const req = this.http.put<Contact>(url, JSON.stringify(contactReq), {
      headers: this.headers,
    });
    console.log(req);
    req.subscribe((res) => res);
    return req;
  }

  removeGroupContact(contactId: number) {
    // TODO: also invoke remove contact from night because you need to delete instances
    // of this contact everywhere
    if (contactId === undefined) return undefined;
    const url = `${environment.apiUrl}/contacts/${contactId}`;
    const req = this.http.delete<Contact>(url);
    req.subscribe();
    console.log("Deleting contact:", contactId);
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

  constructor(private http: HttpClient) {}
}
