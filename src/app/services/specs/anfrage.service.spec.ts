import { TestBed } from '@angular/core/testing';

import { AnfrageService } from '../anfrage.service';

describe('AnfrageService', () => {
  let service: AnfrageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnfrageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
