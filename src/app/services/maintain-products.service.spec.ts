import { TestBed } from '@angular/core/testing';

import { MaintainProductsService } from './maintain-products.service';

describe('MaintainProductsService', () => {
  let service: MaintainProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintainProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
