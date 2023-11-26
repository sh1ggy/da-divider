import { Component, Input } from '@angular/core';
import { Contact, Item, Place } from '../models';
import { StoreService } from '../store.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-place',
  template: `
    <div class="flex flex-col gap-4">
      <div role="tablist" class="flex justify-center tabs tabs-boxed">
        <button (click)="setPricing()" role="tab" class="tab">Pricing</button>
        <button (click)="setAssignment()" role="tab" class="tab">Assignment</button>
      </div>
      <!-- Pricing Tab -->
      <div *ngIf="pricing">
        <app-pricing *ngFor="let item of this.place?.items; let i = index" [item]="item" [place]="this.place" [contacts]="this.place?.contactList" [index]="i" />
        <div class="flex flex-row">
          <button (click)="addItem(this.place?.items)" class="btn">Add Item</button>
        </div>
      </div>
      <!-- Assignment Tab -->
      <div *ngIf="assignment" class="flex flex-col justify-content gap-3">
        <select (change)="setContact($event)" class="select select-bordered" >
          <option disabled selected>Pick contact</option>
          <option *ngFor="let contact of this.place?.contactList">{{contact.name}}</option>
        </select>
        <div class="form-control gap-3">
          <table class="table">
            <!-- head -->
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Total Price</th>
                <th>Split Price</th>
                <th>Assigned</th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr *ngFor="let item of this.place?.items; let i = index;">
                <td>{{item?.name}}</td>
                <td>{{item.price}}</td>
                <td>{{this.storeService.getSplitPrice(item)}}</td>
                <td>
                  <input 
                    (change)="setTotal(item, index, $event)" 
                    [disabled]="!chosenContact" 
                    type="checkbox" 
                    className="checkbox"
                    />
                    <!-- [checked]="item.contacts && item.contacts[i].name == chosenContact"  -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p *ngIf="chosenContact" class="font-bold text-sm text-center">Total: {{this.total}}</p>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class PlaceComponent {
  @Input() place: Place | undefined;
  @Input() index: number = 0;

  chosenContact: string = "";
  total: number = 0;

  pricing: boolean = false;
  assignment: boolean = true;

  constructor(
    public storeService: StoreService,
  ) { }

  get addItem() {
    return this.storeService.addItem;
  }

  setPricing() {
    this.pricing = true;
    this.assignment = false;
  }

  setAssignment() {
    this.assignment = true;
    this.pricing = false;
    this.chosenContact = ""
  }

  setContact(event: Event) {
    const target = event.target as HTMLSelectElement;
    console.log("CHOSEN: ", target.value);
    this.chosenContact = target.value;
  }

  setTotal(item: Item, index: number, event: Event) {
    // Initialisation
    if (!item.price) return;
    const target = event.target as HTMLInputElement;
    const contact = this.storeService.placeholderContacts.find((pContact) => {
      return this.chosenContact == pContact.name
    });
    if (!contact) return;

    // Handling checking of item
    if (target.checked) {
      
      if (!item.contacts) {
        const tempArr = Array(0).fill(contact);
        item.contacts = tempArr;
        this.total += item.price; // item price isn't split because only one contact
      }
      item.contacts?.push(contact);

      var splitPrice = this.storeService.getSplitPrice(item);
      if (splitPrice && item.contacts.length != 1) this.total += splitPrice;
      console.log(`ADDED CONTACT: ${contact.name} to ${item.name}`);
    }

    // Handling unchecking of item
    if (!target.checked) {
      this.total -= item.price;
      item.contacts?.splice(index, 1);
      console.log(`REMOVED CONTACT: ${contact.name} from ${item.name}`);
    }

    console.log(this.storeService.placeholderItems);
  }
}
