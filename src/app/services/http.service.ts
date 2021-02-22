import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdditionSubtractionResult, User } from '../models/user';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private userUrl = "https://localhost:5001/Users/GetUser/";

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<User> {
    var url = this.userUrl + username;
    return this.http.get<User>(url);

  }
}
