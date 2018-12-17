import { Injectable } from '@angular/core';
import {BisectionInput} from './model/bisection-input';
import {BisectionOutput} from './model/bisection-output';
import {Observable, of, throwError} from 'rxjs';
import {Polynomial} from './model/polynomial';

@Injectable({
  providedIn: 'root'
})
export class BisectionService {

  precision = 0.00001;

  constructor() { }

  findRoot(bi: BisectionInput): Observable<BisectionOutput> {
    if ((bi.polynomial.eval(bi.x0) * bi.polynomial.eval(bi.x1)) >= 0) {
      return throwError(new Error('No se puede garantizar la existencia de un cero de la función proporcionada en e intervalo ingresado.'));
    } else {
      const result = this.bisection(bi.polynomial, bi.x0, bi.x1);
      return of({ root: result[result.length - 1], trace: result, iterations: result.length});
    }
  }

  bisection(p: Polynomial, x0: number, x1: number): Array<number> {
    const x = (x0 + x1) / 2;
    const y = p.eval(x);
    if (y === 0 || Math.abs(x0 - x1) < this.precision) {
      return [x];
    } else if (p.eval(x0) * y < 0) {
        return [x].concat(this.bisection(p, x0, x));
    } else {
        return [x].concat(this.bisection(p, x, x1));
    }
  }
}
