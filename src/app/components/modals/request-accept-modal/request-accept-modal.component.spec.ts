import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAcceptModalComponent } from './request-accept-modal.component';

describe('RequestAcceptModalComponent', () => {
  let component: RequestAcceptModalComponent;
  let fixture: ComponentFixture<RequestAcceptModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAcceptModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAcceptModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
