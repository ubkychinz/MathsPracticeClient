import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumColumnComponent } from './sum-column.component';

describe('SumColumnComponent', () => {
  let component: SumColumnComponent;
  let fixture: ComponentFixture<SumColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
