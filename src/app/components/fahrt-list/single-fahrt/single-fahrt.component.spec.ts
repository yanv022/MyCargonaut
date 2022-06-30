import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFahrtComponent } from './single-fahrt.component';

describe('SingleFahrtComponent', () => {
  let component: SingleFahrtComponent;
  let fixture: ComponentFixture<SingleFahrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleFahrtComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFahrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
