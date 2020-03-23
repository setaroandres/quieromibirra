import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ServiceService } from "../service.service";
import { ToastController, AlertController } from "@ionic/angular";
import { DatePipe } from "@angular/common";

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
    public alertController: AlertController,
    private datePipe: DatePipe
  ) {}

  promos: any = [];
  dataUser: any = {};
  api_url_super: string;

  ngOnInit() {}

  ionViewWillEnter() {
    console.log("ListaPromosPage");
    this.api_url_super = this.service.api_url_super;

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
    var fechayhora = new Date();

    var fecha = this.datePipe.transform(fechayhora, "yyyy/MM/dd");
    var hora = this.datePipe.transform(fechayhora, "hh:mm");

    console.log(fecha);
    console.log(hora);

    this.service
      .crearcomprapromo(promo, fecha, hora, this.dataUser)
      .subscribe(x => {
        let response = JSON.parse(x["_body"])["data"];

        console.log("RESPONSE; ", response);

        //if (response[0].retirado === "0") {
          if (response != "ya compro") {
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
