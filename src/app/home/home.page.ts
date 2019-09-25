import { ServiceService } from './../service.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOptsTwo = {
    slidesPerView: 1.5,
  };
  constructor(
    private router: Router,
    private service: ServiceService
  ) {
    this.getUser();
  }

  getUser(){
    this.service.getUser().then(data=>{
      console.log('users', data);
    })
  }

  goToBirreria(bar){
    this.router.navigateByUrl('/interna-birreria');
  }

}
