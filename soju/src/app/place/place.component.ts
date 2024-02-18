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
            (ngModelChange)="handleAssignContactToPlace(contact, $event)"
            [checked]="checkPlaceContact(contact)"
            class="checkbox"
          />
        </label>
      </div>
      <button [routerLink]="['/place', place?.id, 'assignment']" class="btn">ASSIGNMENT</button>
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
          }
        });
      this.place.contacts = placeContacts;
    }
  }

  setPricing() {
    this.pricing = true;
    this.contacts = false;
  }

  setContacts() {
    this.contacts = true;
    this.pricing = false;
  }

  handleAssignContactToPlace(contact: Contact, event: boolean) {
    this.storeService.assignContactToPlace(this.place, contact, !event);
  }

  handleAssignContactToItem(item: Item, event: boolean) {
    if (this.chosenContact === undefined) return;
    this.storeService.assignContactToItem(this.chosenContact, item, !event);
  }

  checkPlaceContact(contact: Contact) {
    if (this.place === undefined) return;
    if (this.place.contacts.some((c) => c.id === contact.id)) {
      return true;
    }
    return false;
  }
}
