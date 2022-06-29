import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FahrtSucheComponent } from './fahrt-suche.component';

describe('FahrtSucheComponent', () => {
  let component: FahrtSucheComponent;
  let fixture: ComponentFixture<FahrtSucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FahrtSucheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FahrtSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
