import { Component, OnInit } from "@angular/core";
import { ServiceService } from "./../service.service";
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";

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
    private storage: Storage
  ) {}

  dataUser: any = {};
  promos: any = [];

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

  traerCompras(usuarioid) {
    this.service.traerCompras(usuarioid).subscribe(x => {
      console.log("MIS COMPRAS PROMOS: ", x["data"]);
      this.promos = x["data"];
    });
  }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
      this.traerCompras(this.dataUser.usuarioid);
    });
  }
}
