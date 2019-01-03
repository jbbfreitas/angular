import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioV2Component } from './municipio-v2.component';

describe('MunicipioV2Component', () => {
  let component: MunicipioV2Component;
  let fixture: ComponentFixture<MunicipioV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipioV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
