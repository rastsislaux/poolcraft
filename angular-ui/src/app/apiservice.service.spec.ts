import { TestBed } from '@angular/core/testing';

import { Api } from './apiservice.service';

describe('APIServiceService', () => {
  let service: Api;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
