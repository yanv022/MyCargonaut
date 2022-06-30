import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnfrageSucheComponent } from './anfrage-suche.component';

describe('AnfrageSucheComponent', () => {
  let component: AnfrageSucheComponent;
  let fixture: ComponentFixture<AnfrageSucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnfrageSucheComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnfrageSucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
