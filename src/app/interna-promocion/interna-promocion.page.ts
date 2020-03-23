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
  qrCode: string = "";

  ngOnInit() {
    console.log("InternaPromocionPage");
    this.getStorage();
  }

  getParams() {
   
    
    this.route.queryParams.subscribe(params => {
      console.log("params",params);
      if (params.promo) {
        this.promo = JSON.parse(params.promo);
        this.titulo = "promoción";

        // 0: promo/canje
        // 1: usuarioid
        // 2: promocionid
        // 3: compra_promoid
        // 4: puntos_promo

        this.qrCode =
          "promo" +
          "." +
          this.dataUser.usuarioid +
          "." +
          this.promo.promocionid +
          "." +
          this.promo.compra_promoid +
          "." +
          this.promo.puntos_promo;

        console.log("PARAMS int-prom", this.promo);
        console.log("qrCode", this.qrCode);
      } else if (params.canje) {
        this.canje = JSON.parse(params.canje);
        this.titulo = "canje";

        this.qrCode =
          "canje" +
          "." +
          this.dataUser.usuarioid +
          "." +
          this.canje.canjeid +
          "." +
          this.canje.compra_canjeid +
          "." +
          this.canje.puntos_canje;

        console.log("CANJE", this.canje);
      }
    });
  }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
      this.getParams();
    });
  }
}
