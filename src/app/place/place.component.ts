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
      <div *ngIf="pricing">
        <app-pricing *ngFor="let item of this.place?.items; let i = index" [item]="item" [place]="this.place" [contacts]="this.place?.contactList" [index]="i" />
        <div class="flex flex-row">
          <button (click)="addItem(this.place?.items)" class="btn">Add Item</button>
        </div>
      </div>
      <div *ngIf="assignment" class="flex flex-col justify-content gap-3">
        <select (change)="setContact($event)" class="select select-bordered" >
          <option disabled selected>Pick contact</option>
          <option *ngFor="let contact of this.place?.contactList">{{contact.name}}</option>
        </select>
        <app-assignment *ngFor="let item of this.place?.items; let i = index" [item]="item" [place]="this.place" [contacts]="this.place?.contactList" [index]="i" />
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

  total: number = 10;

  pricing: boolean = false;
  assignment: boolean = true;

  constructor(
    private storeService: StoreService,
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
  }

  setContact(event: Event) {
    const target = event.target as HTMLSelectElement;
    console.log("CHOSEN: ", target.value);
    this.chosenContact = target.value;
  }
}
