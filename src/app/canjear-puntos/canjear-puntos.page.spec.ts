import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanjearPuntosPage } from './canjear-puntos.page';

describe('CanjearPuntosPage', () => {
  let component: CanjearPuntosPage;
  let fixture: ComponentFixture<CanjearPuntosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanjearPuntosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanjearPuntosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
