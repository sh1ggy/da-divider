import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Item, Place } from '../models';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-items',
  template: `
    <button (click)="this.location.back()" class="btn w-full">← Back to {{this.place?.name}}</button>
    <div class="rounded-lg bg-slate-900 p-3">
      <app-pricing
        *ngFor="let item of this.items; let i = index"
        [item]="item"
        [place]="this.place"
        [contacts]="this.place?.contacts"
        [index]="i"
      />
      <button (click)="this.storeService.addItem(place?.id)" class="btn w-full">
        + Add Item
      </button>
    </div>
  `,
  styles: [
  ]
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  place: Place | undefined;
  constructor(
    public storeService: StoreService, 
    public route: ActivatedRoute, 
    public location: Location,
  ) {}
    
  ngOnInit(): void {
    const placeId: string | null = this.route.snapshot.paramMap.get("id");
    if (!placeId) return;
    this.storeService.getPlace(placeId).subscribe((res: Place) => {
      this.place = res;
      this.items = res.items;
    });
    this.storeService.getItems(parseInt(placeId))?.subscribe((items: Item[]) => {
      this.items = items;
    });
    
  }
;
}
