import { Component, OnInit } from "@angular/core";
import { ServiceService } from "./../service.service";
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-mispromos",
  templateUrl: "./mispromos.page.html",
  styleUrls: ["./mispromos.page.scss"]
})
export class MispromosPage implements OnInit {
  constructor(
    private service: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private datePipe: DatePipe
  ) {}

  dataUser: any = {};
  promos: any = [];
  canjes: any = [];

  ngOnInit() {
    console.log("MispromosPage");
    this.getStorage();
  }

  goToInternaPromo(promo) {
    let dataPromo: NavigationExtras = {
      queryParams: {
        promo: JSON.stringify(promo)
      }
    };
    this.router.navigate(["interna-promocion"], dataPromo);
  }

  goToInternaCanje(canje) {
    let dataPromo: NavigationExtras = {
      queryParams: {
        canje: JSON.stringify(canje)
      }
    };
    this.router.navigate(["interna-promocion"], dataPromo);
  }

  traerComprasPromos(usuarioid) {
    //promos
    this.service.traerComprasPromos(usuarioid).subscribe(x => {
      console.log("MIS COMPRAS PROMOS: ", x["data"]);
      this.promos = x["data"];
    });
  }

  traerComprasCanjes(usuarioid) {
    //promos
    this.service.traerComprasCanjes(usuarioid).subscribe(x => {
      console.log("MIS COMPRAS CANJES: ", x["data"]);
      this.canjes = x["data"];
    });
  }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
      this.traerComprasPromos(this.dataUser.usuarioid);
      this.traerComprasCanjes(this.dataUser.usuarioid);
    });
  }

  setDate(fechayhora) {
    return this.datePipe.transform(fechayhora, "dd-MM-yyyy");
  }
}
