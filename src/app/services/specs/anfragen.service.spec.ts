import { TestBed } from '@angular/core/testing';

import { AnfragenService } from 'src/app/services/anfragen.service';

describe('AnfragenService', () => {
  let service: AnfragenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnfragenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
