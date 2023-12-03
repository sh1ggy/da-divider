import { Component } from '@angular/core';
import { StoreService } from '../store.service';
import { Night, Place } from '../models';

@Component({
  selector: 'app-home',
  template: `
  <div class="flex gap-3">
    <!-- NIGHTS -->
    <div class="flex flex-col">
      <h1 class="font-bold text-2xl text-center mt-12">Nights</h1>
      <div *ngIf="!this.night">
        <div *ngFor="let night of this.storeService.placeholderNights; let i = index" class="flex flex-col bg-slate-900 p-4 rounded-lg gap-3" >
          <div class="p-12 bg-base-100 shadow-xl gap-3 rounded-lg">
            <h2>{{night.date.toLocaleDateString()}}</h2>
            <div *ngFor="let contact of night.contacts" class="badge badge-primary">
              {{contact.name}}
            </div>
            <button (click)="setNight(night)" class="btn btn-primary ml-3">Edit night</button>
          </div>
        </div>
      </div>
      <app-night *ngIf="this.night" [night]="this.night"/>
    </div>

    <!-- CONTACT -->
    <div class="flex flex-col">
      <h1 class="font-bold text-2xl text-center mt-12">Contacts</h1>
      <div *ngFor="let contact of this.storeService.placeholderContacts">
        <p>{{contact.name}}</p>
      </div>
      <button (click)="this.storeService.addContact()" class="btn">
        Add Contact
      </button>
    </div>
    
  </div>
  `,
  styles: [
  ]
})
export class HomeComponent {
  constructor(
    public storeService: StoreService,
  ) { }

  night: Night | undefined = undefined;

  setNight(newNight: Night) {
    this.night = newNight;
  }
}
