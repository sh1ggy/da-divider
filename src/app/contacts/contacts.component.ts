import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { StoreService } from "../store.service";

@Component({
  selector: "app-contacts",
  template: `
    <div class="flex flex-col">
      <h1 class="mt-12 text-center text-2xl font-bold">Contacts</h1>
      <div
        *ngFor="
          let contact of this.storeService.placeholderContacts;
          let i = index
        "
        class="flex items-center"
      >
        <p class="w-1/2">{{ contact.name }}</p>
        <button
          (click)="contactModal.showModal()"
          (click)="
            setEditContact(contact.name, contact.email, contact.mobile, i)
          "
          class="btn w-1/2"
        >
          Edit
        </button>
      </div>
      <!-- Open the modal using ID.showModal() method -->
      <button class="btn" onclick="contactModal.showModal()">
        Add Contact
      </button>
      <dialog id="contactModal" #contactModal class="modal">
        <div class="modal-box flex flex-col">
          <h3 class="text-lg font-bold">Contact Form</h3>
          <span class="label-text">Contact Name</span>
          <input
            type="text"
            [formControl]="contactName"
            class="input input-bordered"
          />
          <span class="label-text">Contact Email</span>
          <input
            type="text"
            [formControl]="contactEmail"
            class="input input-bordered"
          />
          <span class="label-text">Contact Phone</span>
          <input
            type="text"
            [formControl]="contactPhone"
            class="input input-bordered"
          />
          <div class="modal-action">
            <form method="dialog">
              <button
                class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
              >
                ✕
              </button>
              <div class="flex items-center justify-center">
                <button
                  (click)="this.storeService.removeGroupContact(this.index)"
                  class="btn btn-error w-1/2"
                >
                  Delete
                </button>
                <button (click)="addContact()" class="btn w-1/2">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  `,
  styles: [],
})
export class ContactsComponent {
  contactName = new FormControl("");
  contactEmail = new FormControl("");
  contactPhone = new FormControl("");
  editContact: boolean = false;
  index: number = 0;

  constructor(public storeService: StoreService) {}

  // TODO REFAC this editing logic cos it's kinda garbage and works with the index and editing flag
  // -- which is not ideal
  setEditContact(name: string, email: string, mobile: string, index: number) {
    if (!name || !email || !mobile) return;
    this.contactName.setValue(name);
    this.contactEmail.setValue(email);
    this.contactPhone.setValue(mobile);
    this.editContact = true;
    this.index = index;
    return;
  }

  addContact() {
    if (
      !this.contactName.value ||
      !this.contactEmail.value ||
      !this.contactPhone.value
    )
      return;
    if (this.editContact) {
      this.storeService.editContact(
        this.contactName.value,
        this.contactEmail.value,
        this.contactPhone.value,
        this.index,
      );
      this.editContact = false;
      return;
    }
    this.storeService.addContact(
      this.contactName.value,
      this.contactEmail.value,
      this.contactPhone.value,
    );
    this.contactName.setValue(null);
    this.contactEmail.setValue(null);
    this.contactPhone.setValue(null);
    return;
  }
}
