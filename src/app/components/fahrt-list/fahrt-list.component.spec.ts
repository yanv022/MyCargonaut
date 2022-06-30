import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FahrtListComponent } from './fahrt-list.component';

describe('FahrtListComponent', () => {
  let component: FahrtListComponent;
  let fixture: ComponentFixture<FahrtListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FahrtListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FahrtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
