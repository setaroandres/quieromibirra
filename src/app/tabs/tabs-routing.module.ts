import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "home",
        loadChildren: "../home/home.module#HomePageModule"
      },
      {
        path: "lista-hhour",
        loadChildren: "../lista-hhour/lista-hhour.module#ListaHhourPageModule"
      },
      {
        path: "detalle-puntos",
        loadChildren:
          "../detalle-puntos/detalle-puntos.module#DetallePuntosPageModule"
      },
      {
        path: "canjear-puntos",
        loadChildren:
          "../canjear-puntos/canjear-puntos.module#CanjearPuntosPageModule"
      },
      {
        path: "interna-birreria",
        loadChildren:
          "../interna-birreria/interna-birreria.module#InternaBirreriaPageModule"
      },
      {
        path: "lista-promos",
        loadChildren:
          "../lista-promos/lista-promos.module#ListaPromosPageModule"
      },
      {
        path: "lista-birreria",
        loadChildren:
          "../lista-birreria/lista-birreria.module#ListaBirreriaPageModule"
      },
      {
        path: "mispromos",
        loadChildren: "../mispromos/mispromos.module#MispromosPageModule"
      }
    ]
  },
  {
    path: "tabs",
    redirectTo: "/tabs/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
