import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomGeneratorService {

  constructor() { }

  getNumber(min, max) : Observable<number> {
    return of(Math.floor(Math.random() * (max - min + 1) + min));
  }
}
