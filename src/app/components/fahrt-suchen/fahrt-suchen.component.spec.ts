import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FahrtSuchenComponent } from './fahrt-suchen.component';

describe('FahrtSuchenComponent', () => {
  let component: FahrtSuchenComponent;
  let fixture: ComponentFixture<FahrtSuchenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FahrtSuchenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FahrtSuchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
