import { TestBed } from '@angular/core/testing';

import { PokeinfosService } from './pokeinfos.service';

describe('PokeinfosService', () => {
  let service: PokeinfosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeinfosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
