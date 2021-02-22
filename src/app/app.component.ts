import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { switchMap } from 'rxjs/operators';
import { AdditionSubtractionResult, User } from './models/user';
import { HttpService } from './services/http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MathsPracticeClient';

  daysOfTheWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months: string[]  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  date: Date;
  day: number;
  month: number;
  year: number;

  @ViewChild('usernameInput') usernameInput: ElementRef;
  userattr: any[] = [];
  user: User;

  constructor(private httpService: HttpService) {
    this.date = new Date();
  }

  ngOnInit() {
    //this.getUserDetails();
  }

  getUserDetails(): void {
    var Ob_User = this.httpService.getUser(this.usernameInput.nativeElement.value);
    Ob_User.subscribe(u => this.user = u);

    var additionSubtractionResults: AdditionSubtractionResult[] = [];

    if (this.user != null) {
      this.user.additionSubtractionResults.forEach((result) => {
        additionSubtractionResults.push(<AdditionSubtractionResult>({ timeSubmitted: new Date(result.timeSubmitted), timeTakenSec: result.timeTakenSec, numAdditionCorrect: result.numAdditionCorrect, numSubtractionCorrect: result.numSubtractionCorrect, numTotal: result.numTotal}))
      });
      this.user.additionSubtractionResults = additionSubtractionResults;
      console.log(this.user.additionSubtractionResults[0].timeSubmitted.getDate());
    }

  }
}
