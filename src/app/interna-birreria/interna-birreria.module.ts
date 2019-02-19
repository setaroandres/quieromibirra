import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InternaBirreriaPage } from './interna-birreria.page';

const routes: Routes = [
  {
    path: '',
    component: InternaBirreriaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InternaBirreriaPage]
})
export class InternaBirreriaPageModule {}
