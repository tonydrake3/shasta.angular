import { TestBed, inject } from '@angular/core/testing';

import { EntityDisplayFormatterService } from './entity-display-formatter.service';

describe('EntityDisplayFormatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityDisplayFormatterService]
    });
  });

  it('should be created', inject([EntityDisplayFormatterService], (service: EntityDisplayFormatterService) => {
    expect(service).toBeTruthy();
  }));
});
