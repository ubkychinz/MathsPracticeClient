import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumDisplayComponent } from './sum-display.component';

describe('SumDisplayComponent', () => {
  let component: SumDisplayComponent;
  let fixture: ComponentFixture<SumDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
