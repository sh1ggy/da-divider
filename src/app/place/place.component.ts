import { Component, Input } from '@angular/core';
import { Contact, Item, Place } from '../models';
import { StoreService } from '../store.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-place',
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center">
        <h1 class="hover:cursor-pointer text-xl text-center text-green-700 font-bold">{{this.place?.name}}</h1>
        <button (click)="placeModal.showModal()" class="btn ml-auto">Edit Place</button>
      </div>
      <dialog id="placeModal" #placeModal class="modal">
        <div class="modal-box flex flex-col">
          <h3 class="font-bold text-lg">Contact Form</h3>
          <span class="label-text">Place Name</span>
          <input type="text" [formControl]="placeName" [placeholder]="this.place?.name" class="input input-bordered"/>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <div class="flex items-center justify-center">
                <button (click)="this.deletePlace(index)" class="btn btn-error w-1/2">Delete</button>
                <button (click)="this.savePlace(this.place!);" class="btn w-1/2">Save</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <div role="tablist" class="flex justify-center tabs tabs-boxed">
        <button (click)="setPricing()" role="tab" class="tab">Pricing</button>
        <button (click)="setAssignment()" role="tab" class="tab">Assignment</button>
        <button (click)="setContacts()" role="tab" class="tab">Contacts</button>
      </div>
      <!-- Pricing Tab -->
      <div *ngIf="pricing">
        <app-pricing *ngFor="let item of this.place?.items; let i = index" [item]="item" [place]="this.place" [contacts]="this.place?.contacts" [index]="i" />
        <div class="flex flex-row">
          <button (click)="this.place && this.storeService.addItem(this.place.items)" class="btn">Add Item</button>
        </div>
      </div>
      <!-- Contact Assignment Tab, maybe move this to placeEditModal -->
      <div *ngIf="contacts" class="flex flex-col form-control gap-3">
        <!-- Change this from this.place.contacts to this.storeService.night -->
        <label *ngFor="let contact of this.storeService.chosenNight.contacts" class="label cursor-pointer w-full hover:bg-secondary rounded-lg duration-500 transition-color">
          <span class="label-text w-1/2">{{contact.name}}</span> 
          <input type="checkbox" (change)="addContact(contact)" [checked]="checkContact(contact)" class="checkbox" />
        </label>
      </div>
      <!-- Assignment Tab -->
      <div *ngIf="assignment" class="flex flex-col justify-content gap-3">
        <select (change)="setContact($event)" class="select select-bordered" >
          <option disabled selected>Pick contact</option>
          <option *ngFor="let contact of this.place?.contacts">{{contact.name}}</option>
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
              <tr *ngFor="let item of this.place?.items; let i = index;">
                <td>{{item?.name}}</td>
                <td>{{item?.quantity ? item?.quantity : 1}}</td>
                <td>{{(item?.quantity ? this.storeService.calcQuantPrice(item) : item.price)  | number:'1.2-2'}}</td>
                <td>{{this.storeService.getSplitPrice(item) | number:'1.2-2'}}</td>
                <td>
                  <div *ngFor="let contact of item.contacts" className="badge badge-primary">{{contact.name}}</div>
                </td>
                <td>
                  <input 
                    (change)="setTotal(item, $event)" 
                    [disabled]="!chosenContact" 
                    [checked]="chosenContact && item.contacts?.includes(chosenContact)"
                    type="checkbox" 
                    className="checkbox"
                    />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p *ngIf="chosenContact" class="font-bold text-sm text-center">Total: {{this.total | number:'1.2-2'}}</p>
        <app-total [place]="this.place"/>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class PlaceComponent {
  @Input() place: Place | undefined;
  @Input() index: number = 0;

  placeName = new FormControl(undefined);

  chosenContact: Contact | undefined = undefined;
  total: number = 0;

  pricing: boolean = true;
  assignment: boolean = false;
  contacts: boolean = false;

  constructor(
    public storeService: StoreService,
  ) { }

  setPricing() {
    this.pricing = true;
    this.assignment = false;
    this.contacts = false;
  }

  setContacts() {
    this.contacts = true;
    this.pricing = false;
    this.assignment = false;
  }

  setAssignment() {
    this.assignment = true;
    this.pricing = false;
    this.contacts = false;
    this.chosenContact = undefined;
  }

  // Logic for modal
  savePlace(place: Place) {
    if (!this.placeName.value) {
      console.log("NO CHANGES");
      return;
    };

    place.name = this.placeName.value;
    console.log("SAVED", place);
    return;
  }

  deletePlace(i: number) {
    this.storeService.chosenNight.places.splice(i, 1);
    return;
  }


  checkContact(contact: Contact) {
    var flag: boolean = false;
    if (!this.place || !this.place.contacts) {
      console.log("swag")
      return
    }
    // Check if the chosen night's contact is equal to the currently allocated place's contact
    this.place.contacts.forEach(placeContact => {
      if (contact.name == placeContact.name) {
        flag = true;
      }
    })
    return flag;
  }

  setContact(event: Event) {
    if (!this.place?.contacts) return;

    this.total = 0;
    const target = event.target as HTMLSelectElement;
    console.log("CHOSEN: ", target.value);
    this.chosenContact = this.place.contacts.find((pContact) => {
      // Find the contact based on the selected contact
      return target.value == pContact.name
    });
    if (this.chosenContact) this.total = this.storeService.calcTotal(this.chosenContact, this.place.items);
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
        this.total += item.quantity ? item.price * item.quantity : item.price // item price isn't split because only one contact
      }
      // Add in the selected contact into the item's contacts
      if (item.contacts?.includes(this.chosenContact)) {
        console.log("CONTACT EXISTS")
        return
      };
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
      contactIndex = item.contacts?.findIndex((pContact) => pContact == this.chosenContact);

      if (contactIndex == undefined || !item.contacts) return;

      console.log(`REMOVED CONTACT: ${item.contacts[contactIndex].name} from ${item.name}`);
      item.contacts?.splice(contactIndex, 1);
    }
  }

  addContact(contact: Contact) {
    if (!this.place || !contact) return
    this.place?.contacts?.push(contact);
    console.log(this.place.contacts);
  }
}
