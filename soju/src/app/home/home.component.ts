import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
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
          <app-nightsm [night]="night" [contacts]="this.contacts" />
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

      this.nights.forEach((night: Night) => {
        this.storeService
          .getContactsByNight(night.id.toString())
          ?.subscribe((res: Contact[]) => {
            night.contacts = res;
            console.log(night.contacts);
          });
      });
      return nights;
    });
    this.storeService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      return contacts;
    });
  }

  addContact(nightContacts: Contact[]) {
    if (!this.contact) return;
    if (nightContacts.includes(this.contact)) return;
    nightContacts.push(this.contact);
    this.contact = undefined;
    return nightContacts;
  }

  checkContact(contact: Contact | undefined, night: Night) {
    if (contact === undefined) return;
    const res: Night | undefined = this.nights.find(
      (val: Night) => night.id == val.id,
    );
    if (res === undefined) return false;
    return res.contacts.includes(contact);
  }
}
