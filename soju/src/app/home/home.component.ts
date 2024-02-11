import { Component, OnInit } from "@angular/core";
import { StoreService } from "../store.service";
import { Contact, Night, Place } from "../models";

@Component({
  selector: "app-home",
  template: `
    <div class="flex flex-col items-center gap-5">
      <app-contacts
        [contacts]="this.contacts"
        class="flex w-full flex-col p-3"
      />
      <!-- NIGHTS -->
      <div class="flex flex-col gap-3 p-3">
        <h1 class="text-center text-2xl font-bold">Nights</h1>
        <div
          *ngFor="let night of this.nights"
          class="flex flex-col gap-3 rounded-lg p-4"
        >
          <div
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
                  (click)="this.storeService.chosenNight = night"
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
                <!-- REF: https://stackoverflow.com/questions/38585720/how-to-apply-multiple-template-bindings-on-one-element-in-angular -->
                <ng-container *ngFor="let contact of this.contacts">
                  <!-- *ngIf="!checkContact(contact, getNightContacts(night))" -->
                  <!-- *ngIf="checkContact(contact.id)" -->
                  <option [ngValue]="contact">
                    {{ contact.name }}
                  </option>
                </ng-container>
              </select>
              <!-- *ngIf="checkContact(contact?.id)" -->
              <button
                (click)="
                  contact &&
                    this.storeService.editNightContacts(night, contact, true)
                "
                class="btn btn-success btn-outline btn-xs"
              >
                Add
              </button>
            </div>

            <div class="flex flex-wrap">
              <div
                *ngFor="
                  let contact of night.contacts;
                "
                (click)="editNightContacts(night, contact, false)"
                class="badge badge-primary hover:cursor-pointer hover:bg-error"
              >
                {{ contact.name }}
              </div>
            </div>

          </div>
        </div>
      </div>
      <button
        (click)="this.storeService.addNight()"
        class="btn btn-ghost bg-black"
      >
        Add night
      </button>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  contact: Contact | undefined = undefined;
  contacts: Contact[] | undefined;
  nights: Night[] = [];

  constructor(public storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getNights().subscribe((nights: Night[]) => {
      this.nights = nights;
      return nights;
    });
    this.storeService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      return contacts;
    });
  }

  editNightContacts(night: Night, contact: Contact, isAdd: boolean) {
    this.storeService.editNightContacts(night, contact, isAdd);
  }

  // getNightContacts(night: Night): Contact[] | undefined {
  //   const req = this.storeService.getContactsByNight(night);
  //   let contacts: Contact[] = [];
  //   req.subscribe((contactsByNight: Contact[]) => (contacts = contactsByNight));
  //   return contacts;
  // }

  addContact(nightContacts: Contact[]) {
    if (!this.contact) return;
    if (nightContacts.includes(this.contact)) return;
    nightContacts.push(this.contact);
    this.contact = undefined;
    return nightContacts;
  }

  // Checks contact passed in against the contacts passed in
  // RETURN: true if contact in list and false if contact not in list
  // checkContact(contact: Contact, nightContacts: Contact[] | undefined) {
  //   if (nightContacts === undefined) return undefined;
  //   var flag: boolean = false;
  //   nightContacts.forEach((nightContact) => {
  //     if (contact.name == nightContact.name) {
  //       flag = true;
  //     }
  //   });
  //   return flag;
  // }

  // checkContact(contactId: number | undefined): boolean {
  //   if (!this.contacts || !contactId) return false;
  //   const contactIds = this.contacts.map((contact: Contact) => contact.id);
  //   return contactIds.includes(contactId);
  // }
}
