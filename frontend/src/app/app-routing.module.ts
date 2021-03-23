import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RequirementsComponent} from './requirements/requirements.component';
import {IngredientsComponent} from './ingredients/ingredients.component';

const routes: Routes = [
  {path: 'ingredients', component : IngredientsComponent},
  {path: 'requirements', component: RequirementsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
