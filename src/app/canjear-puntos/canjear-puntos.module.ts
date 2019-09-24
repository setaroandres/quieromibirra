import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CanjearPuntosPage } from './canjear-puntos.page';

const routes: Routes = [
  {
    path: '',
    component: CanjearPuntosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CanjearPuntosPage]
})
export class CanjearPuntosPageModule {}
