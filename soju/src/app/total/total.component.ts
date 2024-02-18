import { Component, Input, OnInit } from "@angular/core";
import { Contact, Item, Place } from "../models";
import { StoreService } from "../store.service";

@Component({
  selector: "app-total",
  template: `
    <button (click)="placeModal.showModal()" class="btn btn-wide">
      Place Total 💯
    </button>
    <dialog id="placeModal" #placeModal class="modal">
      <div class="modal-box flex flex-col bg-slate-800 p-3 rounded-lg w-full">
        <h3 class="text-lg font-bold">Total</h3>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let contact of this.place?.contacts">
                <td>{{ contact.name }}</td>
                <td>{{ getContactItems(contact) }}</td>
                <td>{{ calculateTotal(contact) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button
              class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  `,
  styles: [],
})
export class TotalComponent {
  @Input() place: Place | undefined;
  @Input() items: Item[] = [];

  constructor(public storeService: StoreService) {}

  getContactItems(contact: Contact) {
    if (!this.place) return;
    let items = ""
    this.items.forEach((item: Item) => {
      item.contacts?.forEach((itemContact: Contact) => {
        if (contact.id == itemContact.id) {
          var calcPrice = this.storeService.getSplitPrice(item);
          items += `${items === "" ? "" : " + "}${item.name} ($${item.quantity === null ? calcPrice : item.price}${item.quantity === null ? ") " : ` x${item.quantity}) `}`
        }
      });
    })
    return items;
  }

  calculateTotal(contact: Contact) {
    if (!this.place) return;
    let total = 0;
    this.items.forEach((item: Item) => {
      item.contacts?.forEach((itemContact: Contact) => {
        if (contact.id == itemContact.id && item.price) {
          var calcPrice = this.storeService.getSplitPrice(item);
          if (calcPrice) total += calcPrice;
        }
      });
    });
    return total;
  }
}
