import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { CanjearPuntosPage } from "./canjear-puntos.page";
import { ComponentsModule } from "../components/components.module";

const routes: Routes = [
  {
    path: "",
    component: CanjearPuntosPage
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
  declarations: [CanjearPuntosPage]
})
export class CanjearPuntosPageModule {}
