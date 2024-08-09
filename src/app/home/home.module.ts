import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PoContainerModule, PoDialogModule, PoDividerModule, PoModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { NaturezaComponent } from './natureza/natureza.component';
import { AddComponent } from './natureza/add/add.component';
import { FormsModule } from '@angular/forms';
import { UpdComponent } from './natureza/upd/upd.component';
import { StorageService } from '../storage.service';


@NgModule({
  declarations: [
    NaturezaComponent,
    AddComponent,
    UpdComponent
  ],  
  imports: [
    CommonModule,
    HomeRoutingModule,
    PoContainerModule,
    PoPageModule,
    PoDividerModule,
    PoTableModule,
    PoModule,
    FormsModule,
    PoDialogModule
  ]
})
export class HomeModule { }
