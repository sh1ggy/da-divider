import { Component, Input } from '@angular/core';
import { Contact, Item } from '../models';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-item',
  template: `
    <div class="flex join">
      <div class="form-control">
        <label class="label">
          <span class="label-text">{{item?.name}}</span>
        </label>
        <label class="input-group">
          <input type="text" [placeholder]="item?.name" class="input input-bordered" />
          <input type="number" [placeholder]="item?.price" class="input input-bordered" />
          <select class="select select-bordered">
            <option *ngIf="!(item?.contact)" disabled selected>Pick contact</option>
            <option *ngFor="let contact of placeholderContacts" [selected]="item?.contact?.name == contact?.name">{{contact.name}}</option>
          </select>
        </label>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ItemComponent {
  @Input() item: Item | undefined;

  constructor(
    private storeService: StoreService,
  ) {}

  get placeholderContacts() {
    return this.storeService.placeholderContacts;
  }
}
