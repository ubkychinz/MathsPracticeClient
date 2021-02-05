import { Component, Input, OnInit } from '@angular/core';
import { Sum } from '../models/sum';
import { RandomGeneratorService } from '../random-generator.service';

@Component({
  selector: 'app-sum-column',
  templateUrl: './sum-column.component.html',
  styleUrls: ['./sum-column.component.scss']
})
export class SumColumnComponent implements OnInit {

  @Input() operator: string;
  sums: Sum[] = [];
  @Input() numOfSums: number;


  constructor(private randomGenerator: RandomGeneratorService) {

  }

  ngOnInit() {
    console.log(this.numOfSums);
    for (var i = 0; i < this.numOfSums; i++) {

      if (this.operator === '+') {
        const genNum1 = this.randomGenerator.getNumber(1, 9);
        const genNum2 = this.randomGenerator.getNumber(1, 9);

        const newSum = {num1: genNum1, num2: genNum2, operator: this.operator, ans: genNum1 + genNum2};

        this.sums.push( newSum );
        console.log("hello");
      }
    }
  }

}
