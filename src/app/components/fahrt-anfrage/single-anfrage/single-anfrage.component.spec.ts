import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAnfrageComponent } from 'src/app/components/fahrt-anfrage/single-anfrage/single-anfrage.component';


describe('SingleAnfrageComponent', () => {
  let component: SingleAnfrageComponent;
  let fixture: ComponentFixture<SingleAnfrageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleAnfrageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAnfrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
