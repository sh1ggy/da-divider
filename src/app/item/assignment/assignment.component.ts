import { Component, Input } from '@angular/core';
import { Item, Contact, Place } from 'src/app/models';

@Component({
  selector: 'app-assignment',
  template: `
    <div class="form-control">
    <label class="flex gap-3 label cursor-pointer">
      <span class="label-text">{{item?.name}}</span> 
      <span class="label-text">{{item?.price}}</span> 
      <input type="checkbox" className="checkbox" />
    </label>
    </div>
  `,
  styles: [
  ]
})
export class AssignmentComponent {
  @Input() item: Item | undefined;
  @Input() contacts: Contact[] | undefined;
  @Input() place: Place | undefined;
  @Input() index: number = 0;
}
