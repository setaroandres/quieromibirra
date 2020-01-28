import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ServiceService } from "src/app/service.service";

@Component({
  selector: "mis-puntos",
  templateUrl: "./mis-puntos.component.html",
  styleUrls: ["./mis-puntos.component.scss"]
})
export class MisPuntosComponent implements OnInit {
  constructor(private service: ServiceService, private storage: Storage) {}

  puntos: string;
  dataUser: any = {};

  ngOnInit() {
    console.log("MisPuntosComponent");
  }

  ionViewWillEnter() {
    this.getStorage();
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
