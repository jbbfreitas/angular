import { TestBed } from '@angular/core/testing';

import { MunicipioV7Service } from './municipio-v7.service';

describe('MunicipioV7Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MunicipioV7Service = TestBed.get(MunicipioV7Service);
    expect(service).toBeTruthy();
  });
});
