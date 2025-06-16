import { TestBed } from '@angular/core/testing';

import { ProductosApi } from './productos-api';

describe('ProductosApi', () => {
  let service: ProductosApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
