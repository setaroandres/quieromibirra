import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../service.service";
import { Storage } from "@ionic/storage";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-interna-canje",
  templateUrl: "./interna-canje.page.html",
  styleUrls: ["./interna-canje.page.scss"]
})
export class InternaCanjePage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController
  ) {}

  canje: any = {};
  dataUser: any = {};

  ngOnInit() {
    console.log("InternaPromocionPage");
    this.getStorage();
    this.getParams();
  }

  getParams() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.canje = JSON.parse(params.canje);
        console.log("PARAMS", this.canje);
      }
    });
  }

  // retirarCompraCanje() {
  //   this.service.retirarCompraCanje(this.canje, this.dataUser).subscribe(x => {
  //     console.log("SUCCES...", JSON.parse(x["_body"]));
  //     let response = JSON.parse(x["_body"])["data"];

  //     if (response == "updated") {
  //       this.presentAlertConfirm();
  //     }
  //   });
  // }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: "¡Muchas gracias!",
      message:
        "Gracias por utilizar QMB, los puntos de este cupón ya fueron descontados de tu cuenta",
      buttons: [
        {
          text: "Ok!",
          handler: () => {
            this.router.navigate(["home"]);
          }
        }
      ]
    });

    await alert.present();
  }
}
