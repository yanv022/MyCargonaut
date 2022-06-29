import { TestBed } from '@angular/core/testing';

import { FahrtenService } from 'src/app/services/fahrten.service';

describe('FahrtenService', () => {
  let service: FahrtenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FahrtenService);
  });


});
