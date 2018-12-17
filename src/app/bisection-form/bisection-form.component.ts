import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';
import {distinctUntilChanged} from 'rxjs/operators';
import {BisectionInput} from '../model/bisection-input';
import {Polynomial} from '../model/polynomial';

@Component({
  selector: 'app-bisection-form',
  templateUrl: './bisection-form.component.html',
  styleUrls: ['./bisection-form.component.css'],
})
export class BisectionFormComponent implements OnInit {
  polynomialForm = this.fb.group({
    a: [1, Validators.required],
    b: [1, Validators.required],
    c: [-1, Validators.required],
    x0: [-1, Validators.required],
    x1: [1, Validators.required]
  }, {
    validators: intervalValidator
  });

  sizes = {};

  @Output() calculate = new EventEmitter<BisectionInput>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.polynomialForm.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((v) => this.sizes = this.extractSizes(v));
    this.sizes = this.extractSizes(this.polynomialForm.getRawValue());
  }

  private extractSizes(v) {
    const sizes = {};
    Reflect.ownKeys(v).forEach((k) => {
      sizes[k] = v[k] ? v[k].toString().length * 8 + 16 : 16;
    });
    return sizes;
  }

  onSubmit() {
    const p = new Polynomial();
    p.setCoefficient(2, this.polynomialForm.get('a').value);
    p.setCoefficient(1, this.polynomialForm.get('b').value);
    p.setCoefficient(0, this.polynomialForm.get('c').value);
    this.calculate.emit({
      polynomial: p,
      x0: this.polynomialForm.get('x0').value,
      x1: this.polynomialForm.get('x1').value
    });
  }

}

export const intervalValidator: ValidatorFn = (control: AbstractControl) => {
  if (control.get('x0').value < control.get('x1').value) {
    return null;
  } else {
    return {intervalValidator: { valid: false }};
  }
}

