import { TestBed } from '@angular/core/testing';

import { RandomGeneratorServiceService } from './random-generator-service.service';

describe('RandomGeneratorServiceService', () => {
  let service: RandomGeneratorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomGeneratorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
