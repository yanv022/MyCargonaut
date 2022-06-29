import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewertungComponent } from './bewertung.component';

describe('BewertungComponent', () => {
  let component: BewertungComponent;
  let fixture: ComponentFixture<BewertungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BewertungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BewertungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
