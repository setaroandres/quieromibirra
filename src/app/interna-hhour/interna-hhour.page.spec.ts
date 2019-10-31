import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternaHhourPage } from './interna-hhour.page';

describe('InternaHhourPage', () => {
  let component: InternaHhourPage;
  let fixture: ComponentFixture<InternaHhourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternaHhourPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternaHhourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
