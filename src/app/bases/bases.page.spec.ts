import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasesPage } from './bases.page';

describe('BasesPage', () => {
  let component: BasesPage;
  let fixture: ComponentFixture<BasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
