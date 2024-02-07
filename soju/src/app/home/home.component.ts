import { Component, OnInit } from "@angular/core";
import { StoreService } from "../store.service";
import { Contact, Night, Place } from "../models";

@Component({
  selector: "app-home",
  template: `
    <div class="flex items-start gap-5">
      <!-- NIGHTS -->
      <div class="flex flex-col gap-3">
        <h1 class="mt-12 text-center text-2xl font-bold">Nights</h1>
        <div
          *ngFor="
            let night of this.nights;
            let nightIndex = index
          "
          class="flex flex-col gap-3 rounded-lg bg-slate-900 p-4"
        >
          <div class="flex gap-3 rounded-lg bg-base-100 p-12 shadow-xl">
            <h1><code class="bg-gray-700 rounded-lg p-2">{{ night.id }}</code></h1>
            <h2>{{ night.date }}</h2>
            <div
              *ngFor="let contact of night.contacts; let contactIndex = index"
              class="flex flex-row"
            >
              <div
                (click)="
                  night.contacts &&
                    this.storeService.removeContact(nightIndex, contactIndex)
                "
                class="badge badge-primary hover:cursor-pointer hover:bg-error"
              >
                {{ contact.name }}
              </div>
            </div>

            <!-- UNSURE if this is the best approach -->
            <!-- REF: https://chat.openai.com/share/21a60361-f8fd-4148-99cd-c7d19e63601a -->
            <select
              *ngIf="night.contacts"
              #contactsList
              [(ngModel)]="contact"
              (change)="night.contacts = addContact(night.contacts)"
              class="badge badge-secondary"
            >
              <option disabled selected>+</option>
              <!-- REF: https://stackoverflow.com/questions/38585720/how-to-apply-multiple-template-bindings-on-one-element-in-angular -->
              <ng-container
                *ngFor="
                  let contact of this.storeService.placeholderContacts;
                  let i = index
                "
              >
                <option
                  *ngIf="!checkContact(contact, night.contacts)"
                  [ngValue]="contact"
                >
                  {{ contact.name }}
                </option>
              </ng-container>
            </select>
          </div>
          <button
            routerLink="/night"
            (click)="this.storeService.chosenNight = night"
            class="btn btn-primary ml-3"
          >
            Edit night
          </button>
        </div>
        <button
          (click)="this.storeService.addNight()"
          class="btn btn-secondary ml-3 w-full"
        >
          New night
        </button>
      </div>
      <app-contacts />
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  contact: Contact | undefined = undefined;
  nights: Night[] = [];

  constructor(public storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getNights().subscribe((value) => {
      this.nights = value;
      console.log(value)
      return value;
    });
  }

  addContact(nightContacts: Contact[]) {
    if (!this.contact) return;
    nightContacts.push(this.contact);
    this.contact = undefined;
    return nightContacts;
  }

  // Checks contact passed in against the contacts passed in
  // RETURN: true if contact in list and false if contact not in list
  checkContact(contact: Contact, nightContacts: Contact[]) {
    var flag: boolean = false;
    nightContacts.forEach((nightContact) => {
      if (contact.name == nightContact.name) {
        flag = true;
      }
    });
    return flag;
  }
}
