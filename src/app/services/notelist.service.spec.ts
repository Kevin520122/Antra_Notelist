import { TestBed } from '@angular/core/testing';

import { NotelistService } from './notelist.service';

describe('NotelistService', () => {
  let service: NotelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
