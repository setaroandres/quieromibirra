import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-interna-birreria',
  templateUrl: './interna-birreria.page.html',
  styleUrls: ['./interna-birreria.page.scss'],
})
export class InternaBirreriaPage implements OnInit {

  promos: any;
  data: any;
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private service: ServiceService
  ) {
    this.getUser();
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

  getUser(){
    this.service.getPromos().subscribe(data=>{
      console.log('users', data);
      this.promos = data;
    })
  }

}
