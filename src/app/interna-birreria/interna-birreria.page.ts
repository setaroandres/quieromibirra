import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServiceService } from "../service.service";
import { Router, NavigationExtras } from "@angular/router";
import { GoogleMapsService } from "../google-maps.service";

@Component({
  selector: "app-interna-birreria",
  templateUrl: "./interna-birreria.page.html",
  styleUrls: ["./interna-birreria.page.scss"]
})
export class InternaBirreriaPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService,
    public maps: GoogleMapsService
  ) {}

  // @ViewChild(Nav) nav: Nav;
  @ViewChild("map") mapElement: ElementRef;

  cerveceria: any = {};
  api_url_super: string;

  ngOnInit() {
    this.api_url_super = this.service.api_url_super;
    console.log("InternaBirreriaPage");
    this.getParams();
    this.initMap();
  }

  initMap() {
    this.maps.parseLocation(this.cerveceria).then(coordenadas => {
      this.maps.initMap(coordenadas, this.mapElement.nativeElement).then(x => {
        this.maps.addMarker(coordenadas);
      });
    });
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
    this.router.navigate(["tabs/lista-birreria"], data);
  }
}
