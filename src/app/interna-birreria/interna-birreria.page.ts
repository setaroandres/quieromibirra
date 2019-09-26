import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-interna-birreria',
  templateUrl: './interna-birreria.page.html',
  styleUrls: ['./interna-birreria.page.scss'],
})
export class InternaBirreriaPage implements OnInit {

  data: any;
  constructor(
    private route: ActivatedRoute, 
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      console.log('prams',params);
      if (params && params.promo) {
        this.data = JSON.parse(params.promo);
        console.log('paramsGET',this.data);
      }
    });
   }

  ngOnInit() {
  }

}
