import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRecordDetailModalComponent } from './time-record-detail-modal.component';

describe('TimeRecordDetailModalComponent', () => {
  let component: TimeRecordDetailModalComponent;
  let fixture: ComponentFixture<TimeRecordDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeRecordDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRecordDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
