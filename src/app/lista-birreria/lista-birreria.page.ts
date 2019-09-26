import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServiceService } from './../service.service';
@Component({
  selector: 'app-lista-birreria',
  templateUrl: './lista-birreria.page.html',
  styleUrls: ['./lista-birreria.page.scss'],
})
export class ListaBirreriaPage implements OnInit {

  promos: any;
  private selectedItem: any;
  private icons = [
    'beer',
  ];
  public birrerias: Array<{ nombre: string; direccion: string; }> = [];
  constructor(
    private navCtrl:NavController,
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

  ngOnInit() {
    
  }

}
