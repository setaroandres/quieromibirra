import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../service.service";
import { Storage } from "@ionic/storage";
import { Router, NavigationExtras } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-canjear-puntos",
  templateUrl: "./canjear-puntos.page.html",
  styleUrls: ["./canjear-puntos.page.scss"]
})
export class CanjearPuntosPage implements OnInit {
  constructor(
    private service: ServiceService,
    private storage: Storage,
    private router: Router,
    public toastController: ToastController
  ) {}

  puntos: string;
  dataUser: any = {};
  canjes: any = [];

  ngOnInit() {
    console.log("CanjearPuntosPage");
    this.getStorage();
  }

  traerCanjesPorUsuario(usuarioid) {
    this.service.traerCanjesPorUsuario(usuarioid).subscribe(x => {
      console.log("CANJES: ", x["data"]);

      this.canjes = x["data"];
    });
  }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
      this.traerCanjesPorUsuario(this.dataUser.usuarioid);
    });
  }

  goToInternaCanje(canje) {
    this.service.crearcompracanje(canje, this.dataUser).subscribe(x => {
      let response = JSON.parse(x["_body"])["data"];

      console.log("RESPONSE; ", response);

      if (response === "inserted") {
        let data: NavigationExtras = {
          queryParams: {
            canje: JSON.stringify(canje)
          }
        };
        this.router.navigate(["interna-canje"], data);
      } else {
        this.presentToast();
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Ya disponés de esta promoción",
      position: "top",
      duration: 2000
    });
    toast.present();
  }
}
