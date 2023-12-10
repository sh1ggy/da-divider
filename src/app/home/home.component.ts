import { Component } from '@angular/core';
import { StoreService } from '../store.service';
import { Contact, Night, Place } from '../models';

@Component({
  selector: 'app-home',
  template: `
  <div class="flex items-start gap-5">
    <!-- NIGHTS -->
    <div class="flex flex-col">
      <h1 class="font-bold text-2xl text-center mt-12">Nights</h1>
      <div *ngIf="!this.night">
        <div *ngFor="let night of this.storeService.placeholderNights; let nightIndex = index" class="flex flex-col bg-slate-900 p-4 rounded-lg gap-3" >
          <div class="p-12 bg-base-100 shadow-xl gap-3 rounded-lg">
            <h2>{{night.date.toLocaleDateString()}}</h2>
            <div *ngFor="let contact of night.contacts; let contactIndex = index" class="flex flex-row">
              <div (click)="night.contacts && this.storeService.removeContact(nightIndex, contactIndex)" class="badge badge-primary hover:bg-error hover:cursor-pointer">{{contact.name}}</div>
            </div>

            <!-- UNSURE if this is the best approach -->
            <!-- REF: https://chat.openai.com/share/21a60361-f8fd-4148-99cd-c7d19e63601a -->
            <select [(ngModel)]="contact" #contactsList (change)="addContact(night.contacts)" *ngIf="night.contacts" class="badge badge-secondary">
              <option disabled selected>+</option>
              <!-- REF: https://stackoverflow.com/questions/38585720/how-to-apply-multiple-template-bindings-on-one-element-in-angular -->
              <ng-container *ngFor="let contact of this.storeService.placeholderContacts, let i = index">
                <option *ngIf="!checkContact(contact, night.contacts)" [ngValue]="contact">
                  {{contact.name}}
                </option>
              </ng-container>
            </select>
          </div>
          <button routerLink="/night" (click)="this.storeService.chosenNight = night" class="btn btn-primary ml-3">Edit night</button>
        </div>
        <button (click)="this.storeService.addNight()" class="btn btn-secondary ml-3 w-full">New night</button>
      </div>
      <app-night *ngIf="this.night" [night]="this.night"/>
    </div>
    <app-contacts/>
  </div>
  `,
  styles: [
  ]
})
export class HomeComponent {
  contact: Contact | undefined = undefined;
  night: Night | undefined = undefined;

  constructor(
    public storeService: StoreService,
  ) { }

  addContact(nightContacts: Contact[]) {
    if (!this.contact) return;
    nightContacts.push(this.contact);
    this.contact = undefined;
  }

  checkContact(contact: Contact, nightContacts: Contact[]) {
    var flag: boolean = false;
    nightContacts.forEach(nightContact => {
      if (contact.name == nightContact.name) {
        flag = true;
      }
    });
    return flag;
  }
}
