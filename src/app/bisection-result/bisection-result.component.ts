import {Component, Input, OnInit} from '@angular/core';
import {BisectionOutput} from '../model/bisection-output';

@Component({
  selector: 'app-bisection-result',
  templateUrl: './bisection-result.component.html',
  styleUrls: ['./bisection-result.component.css']
})
export class BisectionResultComponent implements OnInit {

  @Input() bisectionOutput: BisectionOutput;

  constructor() { }

  ngOnInit() {
  }

}
