import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ServiceService } from "../service.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-lista-promos",
  templateUrl: "./lista-promos.page.html",
  styleUrls: ["./lista-promos.page.scss"]
})
export class ListaPromosPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private service: ServiceService,
    public toastController: ToastController
  ) {}

  promos: any = [];
  dataUser: any = {};

  ngOnInit() {
    this.getStorage();
    this.getParams();
  }

  getParams() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.promos = JSON.parse(params.promos);
        console.log("PARAMS", this.promos);
      }
    });
  }

  goToInternaPromo(promo) {
    this.service.crearcomprapromo(promo, this.dataUser).subscribe(x => {
      let response = JSON.parse(x["_body"])["data"];

      console.log("RESPONSE; ", response);

      if (response === "inserted") {
        let dataPromo: NavigationExtras = {
          queryParams: {
            promo: JSON.stringify(promo)
          }
        };
        this.router.navigate(["interna-promocion"], dataPromo);
      } else {
        this.presentToast();
      }
    });
  }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
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
