import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternaCuponPage } from './interna-cupon.page';

describe('InternaCuponPage', () => {
  let component: InternaCuponPage;
  let fixture: ComponentFixture<InternaCuponPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternaCuponPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternaCuponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
