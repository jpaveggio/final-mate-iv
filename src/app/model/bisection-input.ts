import {Polynomial} from './polynomial';

export interface BisectionInput {
  polynomial: Polynomial;
  x0: number;
  x1: number;
}
