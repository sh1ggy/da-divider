import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Contact, Item, Place } from '../models';
import { StoreService } from '../store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignment',
  template: `
    <button (click)="this.location.back()" class="btn w-full">← Back to {{this.place?.name}}</button>
    <div class="justify-content flex flex-col gap-3 rounded-lg bg-slate-900 p-3">
      <select (change)="setContact($event)" class="select select-bordered">
        <option disabled selected>Pick contact</option>
        <option *ngFor="let contact of this.place?.contacts">
          {{ contact.name }}
        </option>
      </select>
      <div class="form-control gap-3">
        <table class="table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Split Price</th>
              <th>Contacts</th>
              <th>Assigned</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of this.items; let i = index">
              <td>{{ item?.name }}</td>
              <td>{{ item?.quantity ? item?.quantity : 1 }}</td>
              <td>
                {{
                  "$" + (item?.quantity
                    ? this.storeService.calcQuantPrice(item)
                    : item.price?.toFixed(2)
                  )
                }}
              </td>
              <td>
                {{ this.storeService.getSplitPrice(item) | number: "1.2-2" }}
              </td>
              <td>
                <div
                  *ngFor="let contact of item.contacts"
                  className="badge badge-primary"
                >
                  {{ contact.name }}
                </div>
              </td>
              <td>
                <input
                  ngModel
                  (ngModelChange)="handleAssignContactToItem(item, $event)"
                  [disabled]="!chosenContact"
                  [checked]="checkItemContact(item, this.chosenContact)"
                  type="checkbox"
                  className="checkbox"
                />
                <!-- (change)="setTotal(item, $event)" -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <p *ngIf="chosenContact" class="text-center text-sm font-bold">
        Total: {{ this.total | number: "1.2-2" }}
      </p> -->
    </div>
  `,
  styles: [
  ]
})
export class AssignmentComponent implements OnInit {
  place: Place | undefined;
  items: Item[] = [];
  chosenContact: Contact | undefined = undefined;
  total: number = 0;

  constructor(
    public storeService: StoreService,
    public route: ActivatedRoute,
    public location: Location
  ) {}

  ngOnInit(): void {
    const placeId: string | null = this.route.snapshot.paramMap.get("id");
    if (!placeId) return;
    this.storeService.getPlace(placeId).subscribe((res: Place) => {
      this.place = res;
      this.items = res.items;
    });
    this.storeService.getItems(parseInt(placeId))?.subscribe((items: Item[]) => {
      this.items = items;
      console.log(items)
    });
    if (this.place !== undefined) {
      let placeContacts: Contact[] = [];
      this.storeService
        .getContactsByPlace(this.place.id.toString())
        .subscribe((res: Contact[]) => {
          if (this.place) {
            this.place.contacts = res;
          }
        });
      this.place.contacts = placeContacts;
    }
  }

  setContact(event: Event) {
    if (!this.place?.contacts) return;

    this.total = 0;
    const target = event.target as HTMLSelectElement;
    console.log("CHOSEN: ", target.value);
    this.chosenContact = this.place.contacts.find((pContact) => {
      // Find the contact based on the selected contact
      return target.value == pContact.name;
    });
    if (this.chosenContact)
      this.total = this.storeService.calcTotal(
        this.chosenContact,
        this.place.items,
      );
  }

  handleAssignContactToItem(item: Item, event: boolean) {
    if (this.chosenContact === undefined) return;
    if (event) {
      item.contacts?.push(this.chosenContact);
    }
    else {
      this.items.some((res: Item, i: number) => {
        if (res.id === item.id) {
          item.contacts?.splice(i, 1);
        }
      }) 
    }
    
    this.storeService.assignContactToItem(this.chosenContact, item, !event);
  }

  checkItemContact(item: Item, contact: Contact | undefined) {
    if (item.contacts === undefined || contact === undefined) return;
    if (item.contacts.some((c) => c.id === contact.id)) {
      return true;
    }
    return false;
  }

  setTotal(item: Item, event: Event) {
    // Initialisation
    if (!item || item.price == undefined) return;
    var splitPrice: number | undefined = undefined;
    const target = event.target as HTMLInputElement;
    if (!this.chosenContact) return;

    // Handle item being checked/assigned
    if (target.checked) {
      if (!item.contacts || item.contacts.length == 0) {
        const tempArr = Array(0).fill(this.chosenContact);
        item.contacts = tempArr;
        this.total += item.quantity ? item.price * item.quantity : item.price; // item price isn't split because only one contact
      }
      // Add in the selected contact into the item's contacts
      if (item.contacts?.includes(this.chosenContact)) {
        console.log("CONTACT EXISTS");
        return;
      }
      item.contacts?.push(this.chosenContact);

      // Add the split price to the total
      splitPrice = this.storeService.getSplitPrice(item);
      if (splitPrice && item.contacts.length != 1) this.total += splitPrice;
      console.log(`ADDED CONTACT: ${this.chosenContact.name} to ${item.name}`);
    }

    // Handle item being unchecked/unassigned
    if (!target.checked) {
      splitPrice = this.storeService.getSplitPrice(item);
      if (splitPrice) this.total -= splitPrice;

      var contactIndex: number | undefined = 0;
      contactIndex = item.contacts?.findIndex(
        (pContact) => pContact == this.chosenContact,
      );

      if (contactIndex == undefined || !item.contacts) return;

      console.log(
        `REMOVED CONTACT: ${item.contacts[contactIndex].name} from ${item.name}`,
      );
      item.contacts?.splice(contactIndex, 1);
    }
  }
}
