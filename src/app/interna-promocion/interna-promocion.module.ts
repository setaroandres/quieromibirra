import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InternaPromocionPage } from './interna-promocion.page';

const routes: Routes = [
  {
    path: '',
    component: InternaPromocionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InternaPromocionPage]
})
export class InternaPromocionPageModule {}
