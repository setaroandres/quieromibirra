import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MispromosPage } from './mispromos.page';

describe('MispromosPage', () => {
  let component: MispromosPage;
  let fixture: ComponentFixture<MispromosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MispromosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MispromosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
