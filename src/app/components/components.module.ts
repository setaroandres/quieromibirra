import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MisPuntosComponent } from "./mis-puntos/mis-puntos.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [MisPuntosComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [MisPuntosComponent]
})
export class ComponentsModule {}
