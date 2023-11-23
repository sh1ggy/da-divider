import { Component, Input } from '@angular/core';
import { Item, Contact, Place } from 'src/app/models';

@Component({
  selector: 'app-assignment',
  template: `
    <div class="form-control gap-3">
      <label class="flex gap-3 label cursor-pointer hover:bg-slate-800 rounded-lg p-3">
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
