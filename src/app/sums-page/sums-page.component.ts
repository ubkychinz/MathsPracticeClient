import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { AdditionSubtractionResult, User } from '../models/user';
import { RandomGeneratorService } from '../random-generator.service';
import { SumColumnComponent } from '../sum-column/sum-column.component';

@Component({
  selector: 'app-sums-page',
  templateUrl: './sums-page.component.html',
  styleUrls: ['./sums-page.component.scss']
})
export class SumsPageComponent implements OnInit {

  operators: string[] = ['+', '-'];
  operatorArray: string[] = [];
  numSumColumns: number = 6;

  @ViewChild('sumsGrid') sumsGrid: ElementRef;
  @ViewChildren(SumColumnComponent) sumColumns: SumColumnComponent[];
  @ViewChild('checkButton') checkButton: ElementRef;

  checkButtonDisabled: boolean = false;


  totalCorrect: number = 0;
  timer;
  numSums: number = 15;
  numCols: number = 1;
  colWidth: number = 200;
  colHeight: number;
  timeDiff: number;
  startTime: Date;
  timeDiffSeconds: number = 0;
  timeDiffMinutes: number = 0;
  timeDiffHours: number = 0;

  checkButtonText: string = "Start";
  checksRemaining: number = 3;

  private _user: User;
  @Input() set user(value: User) {
    this._user = value;
    if (value != null) {
      //console.log("set: " + typeof this._user.additionSubtractionResults[0].timeSubmitted);
      this.prevResults = this._user.additionSubtractionResults;
      this.sortAdditionSubtractionResultsByDate();
    }

  }
  get user(): User { return this._user }

  prevResults: AdditionSubtractionResult[];

  constructor() { }

  ngOnInit(): void {
    this.generateOperatorArray();

    this.onWindowResize(event);
    this.colHeight = this.numSums;

  }

  onWindowResize(event) : void {
    this.numCols = (window.innerWidth) / this.colWidth;
  }

  getTimeDiff(): void {
    this.timeDiff = new Date().getTime() - this.startTime.getTime();
    this.getTimeSegments(this.timeDiff);
  }

  getTimeSegments(milliseconds): void {
    this.timeDiffMinutes = Math.floor(this.timeDiff / 1000 / 60);
    this.timeDiffSeconds = Math.floor((this.timeDiff - this.timeDiffMinutes * 1000 * 60) / 1000);

    this.timeDiffHours = this.getHours(this.timeDiff);
    this.timeDiffMinutes = this.getMinutes(this.timeDiff);
    this.timeDiffSeconds = this.getSeconds(this.timeDiff);
  }

  getHours(sec: number) : number {
    return Math.floor(sec/1000/60/60);
  }

  getMinutes(sec: number) : number {
    return Math.floor(sec/1000/60%60);
  }

  getSeconds(sec: number) : number {
    return Math.floor(sec/1000%60);
  }

  generateOperatorArray(): void {
    for(var i=0; i < this.numSumColumns; i++) {
      this.operatorArray.push(this.operators[i%this.operators.length]);
    }
  }

  sortAdditionSubtractionResultsByDate(): void {
    //var lastTime = Math.max.apply(null, this.prevResults.map(function(result) { return result.timeSubmitted}));
    // var lastTime = new Date(Math.max.apply(null, this.user.additionSubtractionResults.map(function(e) {
    //   return new Date(e.timeSubmitted);
    // })));
    // console.log("lastTime: " + lastTime);

    this.user.additionSubtractionResults.sort((a,b) => new Date(b.timeSubmitted).getTime() - new Date(a.timeSubmitted).getTime());

  }

  getBestTime(): number {
    return Math.min.apply(null, this.user.additionSubtractionResults.filter(r => r.numTotal - r.numAdditionCorrect - r.numSubtractionCorrect <= 3).map(function(r) { return r.timeTakenSec;}));
  }

  checkButtonClick(): void {
    if (this.checkButtonText == "Start") {
      this.checkButtonText = "Check";

      this.startTime = new Date();
      this.timer = interval(1000).subscribe(() => this.getTimeDiff());
    } else {
      if (this.checksRemaining > 1) {
        this.totalCorrect = 0;
        this.sumColumns.forEach(col => { this.totalCorrect += col.checkAnswers()});
        this.checksRemaining--;
      } else {
        this.sumColumns.forEach(col => col.checkAnswers());
        this.checksRemaining--;
        this.checkButtonDisabled = true;
        this.timer.unsubscribe();
      }

    }
  }

}
