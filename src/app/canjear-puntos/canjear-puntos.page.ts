import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../service.service";
import { Storage } from "@ionic/storage";
import { Router, NavigationExtras } from "@angular/router";
import { ToastController, AlertController } from "@ionic/angular";

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
    public toastController: ToastController,
    public alertController: AlertController
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
      this.traerPuntos(this.dataUser.usuarioid);
      this.traerCanjesPorUsuario(this.dataUser.usuarioid);
    });
  }

  async goToInternaCanje(canje) {
    if (+this.puntos >= +canje.puntos_canje) {
      const alert = await this.alertController.create({
        // header: '',
        message: "¿Estás seguro que deseás solicitar este canje?",
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
    let fechayhora = Date.now();

    this.service
      .crearcompracanje(canje, fechayhora, this.dataUser)
      .subscribe(x => {
        let response = JSON.parse(x["_body"])["data"];

        console.log("RESPONSE; ", response[0]);

        if (response[0].retirado === "0") {
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Ya disponés de esta promoción",
      position: "top",
      duration: 2000
    });
    toast.present();
  }

  async faltanPuntos() {
    const toast = await this.toastController.create({
      message: "Tus puntos no son suficientes",
      position: "top",
      duration: 2000
    });
    toast.present();
  }

  traerPuntos(usuarioid) {
    this.service.traerPuntos(usuarioid).subscribe(x => {
      console.log("PUNTOS: ", x["data"]);
      let result = x["data"];

      this.puntos = result[0].puntos_usuario;
    });
  }
}
