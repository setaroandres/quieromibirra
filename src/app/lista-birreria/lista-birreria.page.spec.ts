import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBirreriaPage } from './lista-birreria.page';

describe('ListaBirreriaPage', () => {
  let component: ListaBirreriaPage;
  let fixture: ComponentFixture<ListaBirreriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaBirreriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBirreriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
