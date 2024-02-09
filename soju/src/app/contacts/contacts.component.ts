import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { StoreService } from "../store.service";
import { Contact } from "../models";

@Component({
  selector: "app-contacts",
  template: `
    <h1 class="text-center text-2xl font-bold">Contacts</h1>
    <div
      *ngFor="let contact of this.contacts; let i = index"
      class="my-1 flex items-center"
    >
      <div class="flex w-full rounded-lg bg-slate-800 p-2">
        <p class="w-1/2">
          <strong>{{ contact.name }}</strong
          >: {{ contact.mobile }} {{ contact.email }}
        </p>
        <div class="ml-auto flex">
          <button
            (click)="contactModal.showModal()"
            (click)="
              setEditContact(contact.name, contact.email, contact.mobile, i)
            "
            class="btn btn-accent btn-outline btn-sm"
          >
            ✏
          </button>
          <button
            (click)="this.storeService.removeGroupContact(contact.id)"
            class="btn btn-error btn-outline btn-sm"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
    <button
      class="btn btn-ghost bg-black"
      (click)="clearContact()"
      onclick="contactModal.showModal()"
    >
      Add Contact
    </button>
    <dialog
      #contactModal
      id="contactModal"
      (cancel)="clearContact()"
      class="modal"
    >
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
              (click)="clearContact()"
              class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            >
              ✕
            </button>
            <button (click)="onSubmit()" class="btn">Submit</button>
          </form>
        </div>
      </div>
    </dialog>
  `,
  styles: [],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] | undefined;
  contactName = new FormControl("");
  contactEmail = new FormControl("");
  contactPhone = new FormControl("");
  editContact: boolean = false;
  index: number = 0;

  constructor(public storeService: StoreService) {}
  ngOnInit(): void {
    this.storeService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      return contacts;
    });
  }

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

  onSubmit() {
    if (
      !this.contactName.value ||
      !this.contactEmail.value ||
      !this.contactPhone.value
    ) {
      this.clearContact();
      return;
    }
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
    this.clearContact();
    return;
  }

  clearContact() {
    this.contactName.setValue(null);
    this.contactEmail.setValue(null);
    this.contactPhone.setValue(null);
    return;
  }
}
