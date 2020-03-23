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
  api_url_super: string;

  ngOnInit() {}

  ionViewWillEnter() {
    console.log("HomePage");
    this.api_url_super = this.service.api_url_super;

    this.getStorage();
    this.traerCervecerias();
  }

  getStorage() {
    this.storage.get("dataUser").then(storageData => {
      this.dataUser = storageData;
      console.log("0 - STORAGE HOME: ", storageData);
      this.traerPromosPorUsuario(storageData.usuarioid);
    });
  }

  traerPromosPorUsuario(usuarioid) {
    this.service.traerPromosPorUsuario(usuarioid).subscribe(x => {
      console.log("2 - Promos", x["data"]);
      this.promos = x["data"];
    });
  }

  traerCervecerias() {
    this.service.traerCervecerias().subscribe(x => {
      console.log("1 - Cervecerias", x["data"]);
      this.cervecerias = x["data"];
      this.cervecerias = this.cervecerias.filter(x => {return x.activo == "1"});
    });
  }

  goToListaPromos() {
    let dataPromo: NavigationExtras = {
      queryParams: {
        promos: JSON.stringify(this.promos)
      }
    };
    this.router.navigate(["tabs/lista-promos"], dataPromo);
  }

  goToBirreria(cerve) {
    let data: NavigationExtras = {
      queryParams: {
        cerveceria: JSON.stringify(cerve)
      }
    };
    this.router.navigate(["tabs/interna-birreria"], data);
  }
}
