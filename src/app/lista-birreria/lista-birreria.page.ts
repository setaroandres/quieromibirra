import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-birreria',
  templateUrl: './lista-birreria.page.html',
  styleUrls: ['./lista-birreria.page.scss'],
})
export class ListaBirreriaPage implements OnInit {

  private selectedItem: any;
  private icons = [
    'beer',
  ];
  public birrerias: Array<{ nombre: string; direccion: string; }> = [];
  constructor(private navCtrl:NavController) {
    for (let i = 1; i < 11; i++) {
      this.birrerias.push({
        nombre: 'Nombre Cervecería',
        direccion: 'Calle Falsa 123' + i,
      });
    }
  }

  ngOnInit() {
    
  }

}
