import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ServiceService } from "../service.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-soporte",
  templateUrl: "./soporte.page.html",
  styleUrls: ["./soporte.page.scss"]
})
export class SoportePage implements OnInit {
  constructor(
    private router: Router,
    private storage: Storage,
    private service: ServiceService,
    public alertController: AlertController,
    private datePipe: DatePipe
  ) {}

  dataUser: any = {};
  texto;
  date: any = new Date();
  fechaHoy: string;

  ngOnInit() {
    console.log("SoportePage");
    this.getStorage();
    this.fechaHoy = this.datePipe.transform(this.date, "dd/MM/yyyy");
  }

  crearConsulta() {
    let fechayhora = Date.now();

    this.service
      .crearConsulta(this.dataUser.usuarioid, this.texto, fechayhora)
      .subscribe(x => {
        console.log(x);

        this.consultaEnviada();
      });
  }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
    });
  }

  async consultaEnviada() {
    const alert = await this.alertController.create({
      header: "¡Muchas gracias!",
      message: "Tu consulta fue enviada con éxito",
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
