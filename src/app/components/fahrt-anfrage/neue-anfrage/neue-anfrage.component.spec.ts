import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeueAnfrageComponent } from './neue-anfrage.component';

describe('NeueAnfrageComponent', () => {
  let component: NeueAnfrageComponent;
  let fixture: ComponentFixture<NeueAnfrageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeueAnfrageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeueAnfrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
