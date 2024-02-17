import { Component, Input } from "@angular/core";
import { Contact, Item, Place } from "../models";
import { StoreService } from "../store.service";

@Component({
  selector: "app-total",
  template: `
    <button (click)="placeModal.showModal()" class="btn ml-auto">
      Place Total
    </button>
    <dialog id="placeModal" #placeModal class="modal">
      <div class="modal-box flex flex-col">
        <h3 class="text-lg font-bold">Total</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let contact of this.place?.contacts">
                <td>{{ contact.name }}</td>
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
  constructor(public storeService: StoreService) {}
  calculateTotal(contact: Contact) {
    // if (!this.place) return;
    // let total = 0;
    // this.place.items.forEach((item: Item) => {
    //   item.contacts?.forEach((itemContact: Contact) => {
    //     if (contact == itemContact && item.price) {
    //       var calcPrice = this.storeService.getSplitPrice(item);
    //       if (calcPrice) total += calcPrice;
    //     }
    //   });
    // });
    // console.log(total);
    // return total;
  }
}
