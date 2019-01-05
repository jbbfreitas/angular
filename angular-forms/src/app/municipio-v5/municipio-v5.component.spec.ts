import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioV5Component } from './municipio-v5.component';

describe('MunicipioV5Component', () => {
  let component: MunicipioV5Component;
  let fixture: ComponentFixture<MunicipioV5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipioV5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioV5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
