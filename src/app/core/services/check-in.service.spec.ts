import { TestBed } from '@angular/core/testing';

import { CheckInService } from './check-in.service';
import { HttpClientModule } from '@angular/common/http';

describe('CheckInService', () => {
  let service: CheckInService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CheckInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
