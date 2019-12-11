import { Component, OnInit } from "@angular/core";
import { NavController, ToastController } from "@ionic/angular";
import { ServiceService } from "./../service.service";
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-lista-birreria",
  templateUrl: "./lista-birreria.page.html",
  styleUrls: ["./lista-birreria.page.scss"]
})
export class ListaBirreriaPage implements OnInit {
  private selectedItem: any;
  private icons = ["beer"];
  public birrerias: Array<{ nombre: string; direccion: string }> = [];

  constructor(
    private navCtrl: NavController,
    private service: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    private storage: Storage
  ) {}

  promos: any = [];
  cerveceria: any = {};
  dataUser: any = {};
  api_url_super: string;

  ngOnInit() {
    console.log("ListaBirreriaPage");
    this.api_url_super = this.service.api_url_super;
    this.getStorage();
    this.getParams();
    this.traerPromosPorCerveceria();
  }

  getParams() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.cerveceria = JSON.parse(params.cerveceria);
        console.log("PARAMS", this.cerveceria);
      }
    });
  }

  traerPromosPorCerveceria() {
    this.service
      .traerPromosPorCerveceria(this.cerveceria.cerveceriaid)
      .subscribe(x => {
        console.log("PROMOS", x["data"]);
        this.promos = x["data"];
      });
  }

  goToQr(promo) {
    let dataPromo: NavigationExtras = {
      queryParams: {
        promo: JSON.stringify(promo)
      }
    };
    this.router.navigate(["interna-promocion"], dataPromo);
  }

  goToInternaPromo(promo) {
    let fechayhora = Date.now();

    this.service
      .crearcomprapromo(promo, fechayhora, this.dataUser)
      .subscribe(x => {
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Ya disponés de esta promoción",
      position: "top",
      duration: 2000
    });
    toast.present();
  }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
    });
  }
}
