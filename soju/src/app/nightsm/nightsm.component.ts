import { Component, Input, OnInit } from "@angular/core";
import { Contact, Night } from "../models";
import { StoreService } from "../store.service";

@Component({
  selector: "app-nightsm",
  template: `
    <div
      *ngIf="night && contacts"
      class="flex flex-col items-center justify-center gap-3 rounded-lg bg-slate-800 px-2 py-12 shadow-xl"
    >
      <div class="flex items-center justify-center gap-3">
        <h1>
          <code class="rounded-lg bg-gray-700 p-2">{{ night.id }}</code>
        </h1>
        <h2>{{ night.date }}</h2>
        <div class="ml-auto flex">
          <button
            [routerLink]="['/night', night.id]"
            class="btn btn-accent btn-outline btn-sm relative right-0 top-0 hover:bg-slate-700"
          >
            ✏️
          </button>
          <button
            (click)="this.storeService.deleteNight(night.id)"
            class="btn btn-error btn-outline btn-sm relative right-0 top-0 hover:bg-slate-700"
          >
            🗑️
          </button>
        </div>
      </div>

      <!-- SELECT CONTACT -->
      <div class="flex items-center justify-center">
        <select
          #contactsList
          [(ngModel)]="contact"
          class="badge badge-lg bg-slate-700"
        >
          <option disabled selected>+</option>
          <ng-container *ngFor="let contact of this.contacts">
            <option *ngIf="checkContact(contact, this.night.contacts)" [ngValue]="contact">
              {{ contact.name }}
            </option>
          </ng-container>
        </select>
        <button
          *ngIf="checkContact(contact, this.night.contacts)"
          (click)="
            contact && this.storeService.assignContactToNight(night, contact)
          "
          class="btn btn-success btn-outline btn-xs"
        >
          Add
        </button>
      </div>

      <div class="flex flex-wrap">
        <div
          *ngFor="let contact of night.contacts"
          (click)="
            contact &&
              this.storeService.assignContactToNight(night, contact, true)
          "
          class="badge badge-primary hover:cursor-pointer hover:bg-error"
        >
          {{ contact.name }}
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class NightSmComponent {
  @Input() night: Night | undefined = undefined;
  @Input() contacts: Contact[] | undefined = [];
  contact: Contact | undefined = undefined;
  constructor(public storeService: StoreService) {}

  checkContact(contact: Contact | undefined, nightContacts: Contact[] | undefined) {
    if (contact === undefined || nightContacts === undefined) return;
    if (nightContacts.some((c) => c.id === contact.id)) {
      return false;
    }
    return true;
  }
}
