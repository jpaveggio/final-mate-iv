import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BisectionResultComponent } from './bisection-result.component';

describe('BisectionResultComponent', () => {
  let component: BisectionResultComponent;
  let fixture: ComponentFixture<BisectionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BisectionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BisectionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
