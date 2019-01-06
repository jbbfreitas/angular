import { TestBed } from '@angular/core/testing';

import { MunicipioV5Service } from './municipio-v5.service';

describe('MunicipioV5Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MunicipioV5Service = TestBed.get(MunicipioV5Service);
    expect(service).toBeTruthy();
  });
});
