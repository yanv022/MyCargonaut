import { TestBed } from '@angular/core/testing';

import { CarsService } from 'src/app/services/cars.service';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarsService);
  });


});
