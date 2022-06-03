import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FahrtErstellenComponent } from './fahrt-erstellen.component';

describe('FahrtErstellenComponent', () => {
  let component: FahrtErstellenComponent;
  let fixture: ComponentFixture<FahrtErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FahrtErstellenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FahrtErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
