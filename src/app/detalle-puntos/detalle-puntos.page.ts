import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { ServiceService } from "./../service.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-detalle-puntos",
  templateUrl: "./detalle-puntos.page.html",
  styleUrls: ["./detalle-puntos.page.scss"]
})
export class DetallePuntosPage implements OnInit {
  constructor(
    private router: Router,
    private service: ServiceService,
    private storage: Storage
  ) {}

  puntos: string;
  dataUser: any = {};

  ngOnInit() {
    console.log("DetallePuntosPage");
    this.getStorage();
  }

  goToListaCanje() {
    this.router.navigate(["canjear-puntos"]);
  }

  traerPuntos(usuarioid) {
    this.service.traerPuntos(usuarioid).subscribe(x => {
      console.log("PUNTOS: ", x["data"]);
      let result = x["data"];

      this.puntos = result[0].puntos_usuario;
    });
  }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
      this.traerPuntos(this.dataUser.usuarioid);
    });
  }
}