export class Polynomial {
  private coefficients = [];

  setCoefficient(degree: number, value: number): void {
    this.coefficients[degree] = value || 0;
  }

  getCoefficient(degree: number): number {
    return this.coefficients[degree];
  }

  eval(x: number): number {
    return this.coefficients
      .map(((coef, index) => coef * Math.pow(x, index)))
      .reduce((p, c) => p + c);
  }
}
