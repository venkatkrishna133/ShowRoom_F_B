import { TestBed } from '@angular/core/testing';

import { AuthRlService } from './auth-rl.service';

describe('AuthRlService', () => {
  let service: AuthRlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
