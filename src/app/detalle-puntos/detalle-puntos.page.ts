import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { ServiceService } from "./../service.service";
import { Storage } from "@ionic/storage";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-detalle-puntos",
  templateUrl: "./detalle-puntos.page.html",
  styleUrls: ["./detalle-puntos.page.scss"]
})
export class DetallePuntosPage implements OnInit {
  constructor(
    private router: Router,
    private service: ServiceService,
    private storage: Storage,
    private datePipe: DatePipe
  ) {}

  puntos: string;
  dataUser: any = {};
  usuario: any = [];

  ngOnInit() {
    console.log("DetallePuntosPage");
    this.getStorage();
  }

  goToListaCanje() {
    this.router.navigate(["canjear-puntos"]);
  }

  // traerPuntos(usuarioid) {
  //   this.service.traerPuntos(usuarioid).subscribe(x => {
  //     console.log("PUNTOS: ", x["data"]);
  //     let result = x["data"];

  //     this.puntos = result[0].puntos_usuario;
  //   });
  // }

  traerDataUsuario(usuarioid) {
    this.service.traerDataUsuario(usuarioid).subscribe(x => {
      console.log("Data User: ", x["data"]);
      let result = x["data"];

      this.usuario = result;
    });
  }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
      // this.traerPuntos(this.dataUser.usuarioid);
      this.traerDataUsuario(this.dataUser.usuarioid);
    });
  }

  setDate(date) {
    let newDate = new Date(date);
    let newDateOk = this.datePipe.transform(newDate, "dd/MM/yyyy");
    return newDateOk;
  }
}
