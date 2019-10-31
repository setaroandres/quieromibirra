import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPromosPage } from './lista-promos.page';

describe('ListaPromosPage', () => {
  let component: ListaPromosPage;
  let fixture: ComponentFixture<ListaPromosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPromosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPromosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
