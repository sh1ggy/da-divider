import { Component } from '@angular/core';

@Component({
  selector: 'app-place',
  template: `
    <div class="flex flex-col items-center gap-4">
      <app-item/>
      <div class="flex flex-row">
        <button class="btn">Add</button>
        <button class="btn">Submit</button>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class PlaceComponent {

}
