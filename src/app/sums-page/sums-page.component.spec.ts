import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumsPageComponent } from './sums-page.component';

describe('SumsPageComponent', () => {
  let component: SumsPageComponent;
  let fixture: ComponentFixture<SumsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
