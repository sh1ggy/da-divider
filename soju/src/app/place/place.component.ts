import { Component, Input, OnInit } from "@angular/core";
import { Contact, Item, Night, Place } from "../models";
import { StoreService } from "../store.service";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-place",
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center">
        <h1>
          <code class="mr-3 rounded-lg bg-slate-800 p-2">{{
            this.place?.id
          }}</code>
        </h1>
        <h1
          class="text-center text-xl font-bold text-green-700 hover:cursor-pointer"
        >
          {{ this.place?.name }}
        </h1>
        <button
          (click)="placeModal.showModal()"
          class="btn btn-accent btn-outline btn-sm ml-auto"
        >
          ✏
        </button>
        <button
          (click)="this.storeService.deletePlace(place?.id)"
          class="btn btn-error btn-outline btn-sm"
        >
          🗑️
        </button>
      </div>
      <dialog id="placeModal" #placeModal class="modal">
        <div class="modal-box flex flex-col">
          <h3 class="text-lg font-bold">Place Form</h3>
          <span class="label-text">Place Name</span>
          <input
            type="text"
            [formControl]="placeName"
            [placeholder]="this.place?.name"
            class="input input-bordered"
          />
          <div class="modal-action">
            <form method="dialog">
              <button
                class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
              >
                ✕
              </button>
              <button
                (click)="
                  this.storeService.editPlace(
                    this.place,
                    this.placeName.value,
                    this?.chosenNight
                  )
                "
                class="btn btn-success btn-outline"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <!-- TABS -->
      <div role="tablist" class="tabs-boxed tabs flex justify-center">
        <button
          (click)="setContacts()"
          role="tab"
          ngClass="tab {{ this.contacts && 'tab-active' }}"
        >
          Contacts
        </button>
        <button
          (click)="setPricing()"
          role="tab"
          ngClass="tab {{ this.pricing && 'tab-active' }}"
        >
          Pricing
        </button>
        <button
          (click)="setAssignment()"
          role="tab"
          ngClass="tab {{ this.assignment && 'tab-active' }}"
        >
          Assignment
        </button>
      </div>
      <!-- Pricing Tab -->
      <div *ngIf="pricing">
        <app-pricing
          *ngFor="let item of this.items; let i = index"
          [item]="item"
          [place]="this.place"
          [contacts]="this.place?.contacts"
          [index]="i"
        />
        <div class="flex flex-row">
          <button (click)="this.storeService.addItem(place?.id)" class="btn">
            Add Item
          </button>
        </div>
      </div>
      <!-- Contact Assignment Tab, maybe move this to placeEditModal -->
      <div *ngIf="contacts" class="form-control flex flex-col gap-3">
        <!-- Change this from this.place.contacts to this.storeService.night -->
        <label
          *ngFor="let contact of this.chosenNight?.contacts"
          class="transition-color label w-full cursor-pointer rounded-lg duration-500 hover:bg-secondary"
        >
          <span class="label-text w-1/2">{{ contact.name }}</span>
          <input
            type="checkbox"
            ngModel
            (ngModelChange)="handleAssignContacToPlace(contact, $event)"
            [defaultChecked]="checkPlaceContact(contact)"
            class="checkbox"
          />
        </label>
      </div>
      <!-- Assignment Tab -->
      <div *ngIf="assignment" class="justify-content flex flex-col gap-3">
        <select (change)="setContact($event)" class="select select-bordered">
          <option disabled selected>Pick contact</option>
          <option *ngFor="let contact of this.place?.contacts">
            {{ contact.name }}
          </option>
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
              <tr *ngFor="let item of this.items; let i = index">
                <td>{{ item?.name }}</td>
                <td>{{ item?.quantity ? item?.quantity : 1 }}</td>
                <td>
                  {{
                    (item?.quantity
                      ? this.storeService.calcQuantPrice(item)
                      : item.price
                    ) | number: "1.2-2"
                  }}
                </td>
                <td>
                  {{ this.storeService.getSplitPrice(item) | number: "1.2-2" }}
                </td>
                <td>
                  <div
                    *ngFor="let contact of item.contacts"
                    className="badge badge-primary"
                  >
                    {{ contact.name }}
                  </div>
                </td>
                <td>
                  <input
                    ngModel
                    (ngModelChange)="handleAssignContactToItem(item, $event)"
                    (change)="setTotal(item, $event)"
                    [disabled]="!chosenContact"
                    [checked]="
                      chosenContact && item.contacts?.includes(chosenContact)
                    "
                    type="checkbox"
                    className="checkbox"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p *ngIf="chosenContact" class="text-center text-sm font-bold">
          Total: {{ this.total | number: "1.2-2" }}
        </p>
        <app-total [place]="this.place" />
      </div>
    </div>
  `,
  styles: [],
})
export class PlaceComponent implements OnInit {
  @Input() place: Place | undefined;
  @Input() index: number = 0;

  items: Item[] = [];

  placeName = new FormControl("");

  chosenContact: Contact | undefined = undefined;
  chosenNight: Night | undefined = undefined;
  chosenNightContacts: Contact[] | undefined = undefined;
  total: number = 0;

  pricing: boolean = false;
  assignment: boolean = false;
  contacts: boolean = true;

  constructor(
    public storeService: StoreService,
    public route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.storeService.getItems(this.place?.id)?.subscribe((items: Item[]) => {
      this.items = items;
    });
    const nightId: string | null = this.route.snapshot.paramMap.get("id");
    if (!nightId) return;
    this.storeService.getNight(nightId).subscribe((res: Night) => {
      this.chosenNight = res;
    });
    this.storeService
      .getContactsByNight(nightId)
      ?.subscribe((res: Contact[]) => {
        if (this.chosenNight) this.chosenNight.contacts = res;
      });
    if (this.place !== undefined) {
      let placeContacts: Contact[] = [];
      this.storeService
        .getContactsByPlace(this.place.id.toString())
        .subscribe((res: Contact[]) => {
          if (this.place) {
            this.place.contacts = res;
            // console.log(this.place.contacts)
          }
        });
      this.place.contacts = placeContacts;
    }
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

  handleAssignContacToPlace(contact: Contact, event: boolean) {
    console.log(event);
    this.storeService.assignContactToPlace(this.place, contact, !event);
  }

  handleAssignContactToItem(item: Item, event: boolean) {
    console.log(this.chosenContact);
    console.log(event);
  }

  checkPlaceContact(contact: Contact) {
    if (this.place === undefined) return;
    // console.log(this.place.contacts);
    return this.place.contacts.includes(contact);
  }

  setContact(event: Event) {
    if (!this.place?.contacts) return;

    this.total = 0;
    const target = event.target as HTMLSelectElement;
    console.log("CHOSEN: ", target.value);
    this.chosenContact = this.place.contacts.find((pContact) => {
      // Find the contact based on the selected contact
      return target.value == pContact.name;
    });
    if (this.chosenContact)
      this.total = this.storeService.calcTotal(
        this.chosenContact,
        this.place.items,
      );
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
        this.total += item.quantity ? item.price * item.quantity : item.price; // item price isn't split because only one contact
      }
      // Add in the selected contact into the item's contacts
      if (item.contacts?.includes(this.chosenContact)) {
        console.log("CONTACT EXISTS");
        return;
      }
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
      contactIndex = item.contacts?.findIndex(
        (pContact) => pContact == this.chosenContact,
      );

      if (contactIndex == undefined || !item.contacts) return;

      console.log(
        `REMOVED CONTACT: ${item.contacts[contactIndex].name} from ${item.name}`,
      );
      item.contacts?.splice(contactIndex, 1);
    }
  }

  addContact(contact: Contact) {
    if (!this.place || !contact) return;
    this.place?.contacts?.push(contact);
    console.log(this.place.contacts);
  }
}
