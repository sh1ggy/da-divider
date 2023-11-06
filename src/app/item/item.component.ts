import { Component } from '@angular/core';

@Component({
  selector: 'app-item',
  template: `
    <div class="flex join">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Item #1</span>
        </label>
        <label class="input-group">
          <input type="text" placeholder="Enter item..." class="input input-bordered" />
          <input type="number" placeholder="$0.0" class="input input-bordered" />
          <select class="select select-bordered">
            <option disabled selected>Pick user</option>
            <option>Tyrone</option>
            <option>Doug</option>
          </select>
        </label>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ItemComponent {

}
