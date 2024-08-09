import { TestBed } from '@angular/core/testing';

import { NaturezaService } from './natureza.service';

describe('NaturezaService', () => {
  let service: NaturezaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaturezaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
