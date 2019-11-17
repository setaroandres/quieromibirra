import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServiceService } from "../service.service";
import { Storage } from "@ionic/storage";
import { Router, NavigationExtras } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-interna-promocion",
  templateUrl: "./interna-promocion.page.html",
  styleUrls: ["./interna-promocion.page.scss"]
})
export class InternaPromocionPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController
  ) {}

  promo: any = {};
  canje: any = {};
  dataUser: any = {};
  titulo: string;

  ngOnInit() {
    console.log("InternaPromocionPage");
    this.getStorage();
    this.getParams();
  }

  getParams() {
    this.route.queryParams.subscribe(params => {
      if (params.promo) {
        this.promo = JSON.parse(params.promo);
        this.titulo = "promoción";
        console.log("PARAMS int-prom", this.promo);
      } else if (params.canje) {
        this.canje = JSON.parse(params.canje);
        this.titulo = "canje";
        console.log("CANJE", this.canje);
      }
    });
  }

  retirarCompraPromo() {
    this.service.retirarCompraPromo(this.promo, this.dataUser).subscribe(x => {
      console.log("SUCCES...", JSON.parse(x["_body"]));

      let response = JSON.parse(x["_body"])["data"];

      if (response == "updated") {
        this.presentAlertConfirm("promo");
      }
    });
  }

  retirarCompraCanje() {
    this.service.retirarCompraCanje(this.canje, this.dataUser).subscribe(x => {
      console.log("SUCCES...", JSON.parse(x["_body"]));

      let response = JSON.parse(x["_body"])["data"];

      if (response == "updated") {
        this.presentAlertConfirm("canje");
      }
    });
  }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
    });
  }

  async presentAlertConfirm(value) {
    let msj;

    if (value == "promo") {
      msj =
        "Tu código fue escaneado correctamente y tus puntos ya se encuentran sumados a tu cuenta";
    } else {
      msj =
        "Tu código fue escaneado correctamente y ya se descontaron los puntos de tu cuenta";
    }

    const alert = await this.alertController.create({
      header: "¡Muchas gracias!",
      message: msj,
      buttons: [
        {
          text: "Ok!",
          handler: () => {
            this.router.navigate(["tabs/home"]);
          }
        }
      ]
    });

    await alert.present();
  }
}
