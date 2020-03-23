import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { ServiceService } from "../service.service";

@Component({
  selector: "app-lista-hhour",
  templateUrl: "./lista-hhour.page.html",
  styleUrls: ["./lista-hhour.page.scss"]
})
export class ListaHhourPage implements OnInit {
  private selectedItem: any;
  private icons = ["beer"];
  public hhours: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private router: Router, private service: ServiceService) {
    // for (let i = 1; i < 11; i++) {
    //   this.hhours.push({
    //     title: "Happy Hour " + i,
    //     note: "2x1 hasta la 1am" + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  cervecerias: any = [];
  api_url_super: string;

  ngOnInit() {}

  ionViewWillEnter() {
    console.log("ListaHhourPage");
    this.api_url_super = this.service.api_url_super;
    this.traerCervecerias();
  }

  goToBirreria(cerveceria) {
    let data: NavigationExtras = {
      queryParams: {
        cerveceria: JSON.stringify(cerveceria)
      }
    };
    this.router.navigate(["tabs/interna-birreria"], data);
  }

  traerCervecerias() {
    this.service.traerCervecerias().subscribe(x => {
      console.log("Cervecerias", x["data"]);
      this.cervecerias = x["data"];
      this.cervecerias = this.cervecerias.filter(x => {return x.activo == "1"});
    });
  }
}
