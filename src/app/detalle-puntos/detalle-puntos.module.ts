import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DetallePuntosPage } from "./detalle-puntos.page";
import { ComponentsModule } from "../components/components.module";

const routes: Routes = [
  {
    path: "",
    component: DetallePuntosPage
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
  declarations: [DetallePuntosPage]
})
export class DetallePuntosPageModule {}
