import { TestBed } from '@angular/core/testing';

import { PipeableOperatorsService } from './pipeable-operators.service';

describe('PipeableOperatorsService', () => {
  let service: PipeableOperatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipeableOperatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
