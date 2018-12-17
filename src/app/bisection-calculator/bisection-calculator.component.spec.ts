import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BisectionCalculatorComponent } from './bisection-calculator.component';

describe('BisectionCalculatorComponent', () => {
  let component: BisectionCalculatorComponent;
  let fixture: ComponentFixture<BisectionCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BisectionCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BisectionCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
