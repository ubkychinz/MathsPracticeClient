import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, Input, OnInit } from '@angular/core';
import { Sum } from '../models/sum';
import { RandomGeneratorService } from '../random-generator.service';

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


  constructor(private randomGenerator: RandomGeneratorService) {

  }

  ngOnInit() {


    for (var i = 0; i < this.numOfSums; i++) {

      if (this.operator === '+') {
        var genNum1 : number;
        this.randomGenerator.getNumber(1, 9).subscribe(num => genNum1 = num);
        var genNum2 : number;
        this.randomGenerator.getNumber(1, 9).subscribe(num => genNum2 = num);

        const newSum = {index: i, num1: genNum1, num2: genNum2, operator: this.operator, ans: genNum1 + genNum2, answered: null, correct: false};

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



        const newSum = {index: i, num1: genNum1, num2: genNum2, operator: this.operator, ans: genNum1 - genNum2, answered: null, correct: false};

        this.sums.push( newSum );
      }
    }


  }

  checkAnswers(event): void {
    console.log(this.sums);

    var correctCount = 0;

    this.sums.forEach(function (sum) {
      if (sum.ans == sum.answered) {
        correctCount++;
        sum.correct = true;
      } else {
        sum.correct = false;
      }
    });

    console.log(correctCount);
  }

}
