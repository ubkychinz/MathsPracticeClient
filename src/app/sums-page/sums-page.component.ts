import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sums-page',
  templateUrl: './sums-page.component.html',
  styleUrls: ['./sums-page.component.scss']
})
export class SumsPageComponent implements OnInit {

  numSums: number = 15;
  numCols: number = 1;
  colWidth: number = 200;
  colHeight: number;

  constructor() { }

  ngOnInit(): void {
    this.onWindowResize(event);
    this.colHeight = this.numSums;
  }

  onWindowResize(event) : void {
    this.numCols = (window.innerWidth) / this.colWidth;
  }

}
