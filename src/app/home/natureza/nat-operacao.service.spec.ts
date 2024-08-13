import { TestBed } from '@angular/core/testing';

import { NatOperacaoService } from './nat-operacao.service';

describe('NatOperacaoService', () => {
  let service: NatOperacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatOperacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
