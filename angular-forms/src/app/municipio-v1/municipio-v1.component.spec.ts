import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipioV1Component } from './municipio-v1.component';

describe('MunicipioV1Component', () => {
  let component: MunicipioV1Component;
  let fixture: ComponentFixture<MunicipioV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipioV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
