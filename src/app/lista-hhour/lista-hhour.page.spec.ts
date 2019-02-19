import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHhourPage } from './lista-hhour.page';

describe('ListaHhourPage', () => {
  let component: ListaHhourPage;
  let fixture: ComponentFixture<ListaHhourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaHhourPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaHhourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
