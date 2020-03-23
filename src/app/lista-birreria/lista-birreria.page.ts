import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ToastController,
  AlertController
} from "@ionic/angular";
import { ServiceService } from "./../service.service";
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";
import { DatePipe } from "@angular/common";

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
    private storage: Storage,
    private datePipe: DatePipe,
    public alertController: AlertController
  ) {}
  puntos: string;

  promos: any = [];
  canjes: any = [];
  cerveceria: any = {};
  dataUser: any = {};
  api_url_super: string;

  ngOnInit() {}

  ionViewWillEnter() {
    console.log("ListaBirreriaPage");
    this.api_url_super = this.service.api_url_super;
    this.getStorage();
    this.getParams();
    this.traerPromosPorCerveceria();
    this.traerCanjesPorCerveceria();
  }

  getParams() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.cerveceria = JSON.parse(params.cerveceria);
        console.log("PARAMS", this.cerveceria);
      }
    });
  }

  traerPuntos(usuarioid) {
    this.service.traerPuntos(usuarioid).subscribe(x => {
      console.log("PUNTOS: ", x["data"]);
      let result = x["data"];

      this.puntos = result[0].puntos_usuario;
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

  traerCanjesPorCerveceria() {
    this.service
      .traerCanjesPorCerveceria(this.cerveceria.cerveceriaid)
      .subscribe(x => {
        console.log("CANJES", x["data"]);
        this.canjes = x["data"];
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
   
    var fechayhora = new Date();
    console.log("fecha nueva", fechayhora);
    
    var fecha = this.datePipe.transform(fechayhora, "yyyy/MM/dd");
    var hora = this.datePipe.transform(fechayhora, "hh:mm");
    console.log("hora nueva", hora);

    this.service
      .crearcomprapromo(promo, fecha, hora, this.dataUser)
      .subscribe(x => {
        let response = JSON.parse(x["_body"])["data"];

        console.log("RESPONSE; ", response);

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
      this.traerPuntos(this.dataUser.usuarioid);
    });
  }

  // Canjear puntos funciones

  async goToInternaCanje(canje) {
    if (+this.puntos >= +canje.puntos_canje) {
      const alert = await this.alertController.create({
        // header: '',
        message: "¿Estás seguro que deseás solicitar este voucher?",
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
              this.solicitar(canje);
            }
          }
        ]
      });

      await alert.present();
    } else {
      this.faltanPuntos();
    }
  }

  solicitar(canje) {
    var fechayhora = new Date();

    var fecha = this.datePipe.transform(fechayhora, "yyyy/MM/dd");
    var hora = this.datePipe.transform(fechayhora, "hh:mm");

    this.service
      .crearcompracanje(canje, fecha,hora, this.dataUser)
      .subscribe(x => {
        let response = JSON.parse(x["_body"])["data"];

        console.log("RESPONSE; ", response[0]);

        //if (response[0].retirado === "0") {
          if (response != "ya compro") {
          let data: NavigationExtras = {
            queryParams: {
              canje: JSON.stringify(response[0])
            }
          };
          this.router.navigate(["interna-promocion"], data);
        } else {
          this.presentToast();
        }
      });
  }

  async faltanPuntos() {
    const toast = await this.toastController.create({
      message: "Tus puntos no son suficientes",
      position: "top",
      duration: 2000
    });
    toast.present();
  }
}
