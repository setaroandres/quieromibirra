import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-hhour',
  templateUrl: './lista-hhour.page.html',
  styleUrls: ['./lista-hhour.page.scss'],
})
export class ListaHhourPage implements OnInit {

  private selectedItem: any;
  private icons = [
    'beer',
  ];
  public hhours: Array<{ title: string; note: string; icon: string }> = [];
  constructor() {
    for (let i = 1; i < 11; i++) {
      this.hhours.push({
        title: 'Happy Hour ' + i,
        note: '2x1 hasta la 1am' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
  }

}
