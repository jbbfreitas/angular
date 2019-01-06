import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioV4Component } from './municipio-v4.component';

describe('MunicipioV4Component', () => {
  let component: MunicipioV4Component;
  let fixture: ComponentFixture<MunicipioV4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipioV4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioV4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
