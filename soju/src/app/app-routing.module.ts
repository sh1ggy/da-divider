import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NightComponent } from './night/night.component';
import { PlaceComponent } from './place/place.component';
import { HomeComponent } from './home/home.component';
import { AssignmentComponent } from './place/assignment.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'night/:id', component: NightComponent },
  { path: 'place/:id', component: PlaceComponent },
  { path: 'place/:id/assignment', component: AssignmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
