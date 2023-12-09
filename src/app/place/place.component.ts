import { Component, Input } from '@angular/core';
import { Contact, Item, Place } from '../models';
import { StoreService } from '../store.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-place',
  template: `
    <div class="flex flex-col gap-4">
      <h1 class="hover:cursor-pointer text-xl text-center text-green-700 font-bold">{{this.place?.name}}</h1>
      
      <div *ngIf="!this.editMode">
        <div role="tablist" class="flex justify-center tabs tabs-boxed">
          <button (click)="setPricing()" role="tab" class="tab">Pricing</button>
          <button (click)="setAssignment()" role="tab" class="tab">Assignment</button>
          <button (click)="setContacts()" role="tab" class="tab">Contacts</button>
        </div>
        <!-- Pricing Tab -->
        <div *ngIf="pricing">
          <app-pricing *ngFor="let item of this.place?.items; let i = index" [item]="item" [place]="this.place" [contacts]="this.place?.contactList" [index]="i" />
          <div class="flex flex-row">
            <button (click)="this.place && this.storeService.addItem(this.place.items)" class="btn">Add Item</button>
          </div>
        </div>
        <!-- CONTACT ASSIGNMENT -->
        <div *ngIf="contacts" class="flex flex-col form-control gap-3">
          <!-- Change this from this.place.contactList to this.storeService.night -->
          <label *ngFor="let contact of this.place?.contactList" class="label cursor-pointer w-full hover:bg-secondary rounded-lg duration-500 transition-color">
            <span class="label-text w-1/2">{{contact.name}}</span> 
            <input type="checkbox" checked="checked" class="checkbox" />
          </label>
        </div>
        <!-- Assignment Tab -->
        <div *ngIf="assignment" class="flex flex-col justify-content gap-3">
          <select (change)="setContact($event)" class="select select-bordered" >
            <option disabled selected>Pick contact</option>
            <option *ngFor="let contact of this.place?.contactList">{{contact.name}}</option>
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
        </div>
      </div>
      <app-place-edit *ngIf="this.storeService.editMode" [place]="this.place" [index]="this.index" />
    </div>
  `,
  styles: [
  ]
})
export class PlaceComponent {
  @Input() place: Place | undefined;
  @Input() index: number = 0;

  placeName = new FormControl(null);

  chosenContact: Contact | undefined = undefined;
  total: number = 0;

  pricing: boolean = true;
  assignment: boolean = false;
  contacts: boolean = false;

  constructor(
    public storeService: StoreService,
  ) { }

  get editMode() {
    return this.storeService.editMode;
  }

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

  setContact(event: Event) {
    this.total = 0;
    const target = event.target as HTMLSelectElement;
    console.log("CHOSEN: ", target.value);
    this.chosenContact = this.storeService.placeholderContacts.find((pContact) => {
      // Find the contact based on the selected contact
      return target.value == pContact.name
    });
    if (this.chosenContact) this.total = this.storeService.calcTotal(this.chosenContact);
    // console.log("LIST: ", this.storeService.placeholderItems);
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
        this.total += item.price; // item price isn't split because only one contact
      }
      // Add in the selected contact into the item's contactList
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

    // console.log("LIST: ", this.storeService.placeholderItems);
  }
}
