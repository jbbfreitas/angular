import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioV7Component } from './municipio-v7.component';

describe('MunicipioV7Component', () => {
  let component: MunicipioV7Component;
  let fixture: ComponentFixture<MunicipioV7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipioV7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioV7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
