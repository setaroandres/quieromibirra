import { ServiceService } from './../service.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOptsTwo = {
    slidesPerView: 1.5,
  };
  promos:any;
  constructor(
    private router: Router,
    private service: ServiceService
  ) {
    this.getUser();
  }

  getUser(){
    this.service.getPromos().subscribe(data=>{
      console.log('users', data);
      this.promos = data;
    })
  }

  goToBirreria(bar){
    let dataPromo: NavigationExtras = {
      queryParams:{
        promo: JSON.stringify(bar)
      }
    };
    this.router.navigate(['interna-birreria'], dataPromo);
  }

}
