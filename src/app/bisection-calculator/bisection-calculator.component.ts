import { Component, OnInit } from '@angular/core';
import {BisectionInput} from '../model/bisection-input';
import {BisectionService} from '../bisection.service';
import {BisectionOutput} from '../model/bisection-output';

@Component({
  selector: 'app-bisection-calculator',
  templateUrl: './bisection-calculator.component.html',
  styleUrls: ['./bisection-calculator.component.css']
})
export class BisectionCalculatorComponent implements OnInit {

  result: BisectionOutput;

  constructor(private service: BisectionService) { }

  ngOnInit() {
  }

  onCalculate(bi: BisectionInput) {
    this.service.findRoot(bi).subscribe((r) => {
      console.log(r);
      this.result = r;
    }, error => alert(error.message));
  }

}
