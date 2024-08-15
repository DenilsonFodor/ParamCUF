import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NaturezaComponent } from './natureza/natureza.component';
import { AddComponent } from './natureza/add/add.component';
import { UpdComponent } from './natureza/upd/upd.component';

const routes: Routes = [
  { path: '' , pathMatch: 'full' , redirectTo:'natureza'},
  { path: '', component: HomeComponent, children: [
      {path: 'natureza', component: NaturezaComponent},
      {path: 'natureza/add', component: AddComponent},
      {path: 'natureza/upd', component: UpdComponent},
    ], 
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
