import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { ServiceService } from "./../service.service";
import { Storage } from "@ionic/storage";
import { DatePipe } from "@angular/common";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

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
    private datePipe: DatePipe,
    private iab: InAppBrowser
  ) {}

  puntos: string;
  dataUser: any = {};
  usuario: any = [];

  ngOnInit() {
    console.log("DetallePuntosPage");
    this.getStorage();
  }

  goToListaCanje() {
    this.router.navigate(["tabs/canjear-puntos"]);
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
      console.log("Usuario: ", this.usuario);
      
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

  goToTerminos() {
    const browser = this.iab.create(
      "https://ctrlztest.com.ar/birrah/terminos-y-condiciones/", '_system', 'location=yes'
    );
    browser.on("loadstop").subscribe(event => {});
    //window.open("https://ctrlztest.com.ar/birrah/terminos-y-condiciones/", "_system");
    //browser.close();
  }
}
