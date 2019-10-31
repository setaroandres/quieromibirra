import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServiceService } from "../service.service";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-interna-birreria",
  templateUrl: "./interna-birreria.page.html",
  styleUrls: ["./interna-birreria.page.scss"]
})
export class InternaBirreriaPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService
  ) {}

  cerveceria: any = {};

  ngOnInit() {
    console.log("InternaBirreriaPage");
    this.getParams();
  }

  getParams() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.cerveceria = JSON.parse(params.cerveceria);
        console.log("PARAMS", this.cerveceria);
      }
    });
  }

  goToListaPromosBirreria() {
    let data: NavigationExtras = {
      queryParams: {
        cerveceria: JSON.stringify(this.cerveceria)
      }
    };
    this.router.navigate(["lista-birreria"], data);
  }
}
