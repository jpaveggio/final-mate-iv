import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators, FormArray } from '@angular/forms';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { BisectionInput } from '../model/bisection-input';
import { Polynomial } from '../model/polynomial';

@Component({
  selector: 'app-bisection-form',
  templateUrl: './bisection-form.component.html',
  styleUrls: ['./bisection-form.component.css'],
})
export class BisectionFormComponent implements OnInit {
  polynomialForm = this.fb.group({
    degree: [2, Validators.required],
    coefficients: this.fb.array([
      this.fb.control(2, Validators.required),
      this.fb.control(-3, Validators.required),
      this.fb.control(-2, Validators.required)
    ]),
    a: [1, Validators.required],
    b: [1, Validators.required],
    c: [-1, Validators.required],
    x0: [0, Validators.required],
    x1: [3, Validators.required]
  }, {
      validators: intervalValidator
    });

  sizes: any = {};

  @Output() calculate = new EventEmitter<BisectionInput>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.polynomialForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        map(this.extractSizes),
        tap(console.log),
      )
      .subscribe((sizes) => this.sizes = sizes);
    this.sizes = this.extractSizes(this.polynomialForm.getRawValue());
    this.polynomialForm.get('degree').valueChanges
      .subscribe((degree) => {
        const a = this.fb.array([]);
        for (let d = 0; d <= degree; d++) {
          a.push(this.fb.control(1, Validators.required));
        }
        this.coefficientsFormArray = a;
      });
  }

  get coefficientsFormArray(): FormArray {
    return this.polynomialForm.get('coefficients') as FormArray;
  }

  set coefficientsFormArray(fa: FormArray) {
    this.polynomialForm.setControl('coefficients', fa);
  }

  private extractSizes(v) {
    const sizes = {};
    Reflect.ownKeys(v).forEach((k) => {
      if (k === 'coefficients') {
        sizes[k] = [];
        v[k].forEach((c, i) => {
          sizes[k][i] = v[k][i] ? v[k][i].toString().length * 8 + 16 : 16;
        });
      } else {
        sizes[k] = v[k] ? v[k].toString().length * 8 + 16 : 16;
      }
    });
    return sizes;
  }

  onSubmit() {
    const p = new Polynomial();
    this.coefficientsFormArray.value.reverse().forEach((c, d) => {
      p.setCoefficient(d, c);
    });
    /*
    p.setCoefficient(2, this.polynomialForm.get('a').value);
    p.setCoefficient(1, this.polynomialForm.get('b').value);
    p.setCoefficient(0, this.polynomialForm.get('c').value);
    */
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
    return { intervalValidator: { valid: false } };
  }
}
