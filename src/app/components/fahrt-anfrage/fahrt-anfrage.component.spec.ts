import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FahrtAnfrageComponent } from './fahrt-anfrage.component';

describe('FahrtAnfrageComponent', () => {
  let component: FahrtAnfrageComponent;
  let fixture: ComponentFixture<FahrtAnfrageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FahrtAnfrageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FahrtAnfrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
