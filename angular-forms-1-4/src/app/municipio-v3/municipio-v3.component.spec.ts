import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioV3Component } from './municipio-v3.component';

describe('MunicipioV3Component', () => {
  let component: MunicipioV3Component;
  let fixture: ComponentFixture<MunicipioV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipioV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
