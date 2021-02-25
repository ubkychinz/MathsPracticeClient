import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, Input, OnInit } from '@angular/core';
import { _getOptionScrollPosition } from '@angular/material/core';
import { Sum } from '../models/sum';
import { RandomGeneratorService } from '../random-generator.service';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-sum-column',
  templateUrl: './sum-column.component.html',
  styleUrls: ['./sum-column.component.scss']
})
export class SumColumnComponent implements OnInit {

  sums: Sum[] = [];
  @Input() operator: string;
  @Input() numOfSums: number;
  displayedColumns: string[] = ['sum', 'input'];
  numOptions: number = 5;
  correctCount: number = 0;


  constructor(private randomGenerator: RandomGeneratorService) {

  }

  ngOnInit() {


    for (var i = 0; i < this.numOfSums; i++) {

      if (this.operator === '+') {
        var genNum1 : number;
        this.randomGenerator.getNumber(1, 9).subscribe(num => genNum1 = num);
        var genNum2 : number;
        this.randomGenerator.getNumber(1, 9).subscribe(num => genNum2 = num);

        var ans = genNum1 + genNum2;

        var newSum : Sum = { index: i, num1: genNum1, num2: genNum2, operator: this.operator, ans: ans, answered: null, correct: false, options: this.createOptions(this.numOptions, ans), attempted: false };

        this.sums.push( newSum );
      }

      if (this.operator === '-') {
        var genNum1 : number = -1;
        this.randomGenerator.getNumber(1, 9).subscribe(num => genNum1 = num);
        var genNum2 : number = 1000;

        while (genNum2 > genNum1) {
          //console.log(genNum2);
          this.randomGenerator.getNumber(1, 9).subscribe(num => genNum2 = num);
        }

        var ans = genNum1 - genNum2;


        const newSum = { index: i, num1: genNum1, num2: genNum2, operator: this.operator, ans: ans, answered: null, correct: null, options: this.createOptions(this.numOptions, ans), attempted: false };

        this.sums.push( newSum );
      }
    }


  }

  createOptions(numOptions, answer): number[] {
    var options: number[] = [];

    for (var i = 0; i < numOptions - 1; i++) {
      do {
        var offset: number;
        this.randomGenerator.getNumber(-5, 5).subscribe(num => offset = num);
      } while ((answer + offset) < 0 || options.indexOf(answer + offset) > -1 || offset == 0);

      options.push(answer + offset);
    }

    var index: number;
    this.randomGenerator.getNumber(0, 5).subscribe(num => index = num);
    options.splice(index, 0, answer);

    return options;
  }

  checkAnswers(): number {
    console.log(this.sums);

    var correctCount = 0;

    this.sums.forEach(function (sum) {
      if (sum.answered != null) {
        sum.attempted = true;
        if (sum.ans == sum.answered) {
          correctCount++;
          sum.correct = true;
        } else {
          sum.correct = false;
        }
      }
    });

    console.log(this.sums);

    this.correctCount = correctCount;
    return this.correctCount;
  }

}
