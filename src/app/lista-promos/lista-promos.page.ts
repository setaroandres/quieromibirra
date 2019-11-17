import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ServiceService } from "../service.service";
import { ToastController, AlertController } from "@ionic/angular";

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
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  promos: any = [];
  dataUser: any = {};

  ngOnInit() {
    console.log("ListaPromosPage");

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

  async goToInternaPromo(promo) {
    const alert = await this.alertController.create({
      // header: '',
      message: "¿Estás seguro que deseás solicitar esta promoción?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Solicitar",
          handler: () => {
            console.log("Confirm Okay");
            this.solicitar(promo);
          }
        }
      ]
    });

    await alert.present();
  }

  solicitar(promo) {
    console.log(promo);

    let fechayhora = Date.now();

    this.service
      .crearcomprapromo(promo, fechayhora, this.dataUser)
      .subscribe(x => {
        let response = JSON.parse(x["_body"])["data"];

        console.log("RESPONSE; ");

        if (response[0].retirado === "0") {
          let dataPromo: NavigationExtras = {
            queryParams: {
              promo: JSON.stringify(response[0])
            }
          };
          this.router.navigate(["interna-promocion"], dataPromo);
        } else {
          this.presentToast();
        }
      });
  }
}
