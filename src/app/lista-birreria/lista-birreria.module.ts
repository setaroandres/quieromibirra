import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ListaBirreriaPage } from "./lista-birreria.page";
import { ComponentsModule } from "../components/components.module";

const routes: Routes = [
  {
    path: "",
    component: ListaBirreriaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaBirreriaPage]
})
export class ListaBirreriaPageModule {}
