import { ServiceService } from "./../service.service";
import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(
    private router: Router,
    private service: ServiceService,
    private storage: Storage
  ) {}

  slideOptsTwo = {
    slidesPerView: 1.5
  };
  promos: any = [];
  cervecerias: any = [];
  dataUser: any = {};

  ngOnInit() {
    console.log("HomePage");

    this.getStorage();
    this.traerCervecerias();
  }

  traerPromosPorUsuario(usuarioid) {
    this.service.traerPromosPorUsuario(usuarioid).subscribe(x => {
      console.log("Promos", x["data"]);
      this.promos = x["data"];
    });
  }

  traerCervecerias() {
    this.service.traerCervecerias().subscribe(x => {
      console.log("Cervecerias", x["data"]);
      this.cervecerias = x["data"];
    });
  }

  goToListaPromos() {
    let dataPromo: NavigationExtras = {
      queryParams: {
        promos: JSON.stringify(this.promos)
      }
    };
    this.router.navigate(["lista-promos"], dataPromo);
  }

  goToBirreria(cerve) {
    let data: NavigationExtras = {
      queryParams: {
        cerveceria: JSON.stringify(cerve)
      }
    };
    this.router.navigate(["interna-birreria"], data);
  }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
      this.traerPromosPorUsuario(this.dataUser.usuarioid);
    });
  }
}
