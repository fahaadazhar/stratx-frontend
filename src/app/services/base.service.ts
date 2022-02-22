import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class BaseAPIService {
  baseUrl = './assets/employees.json';
  constructor(public http: HttpClient) {}

  get<T>(): Observable<T> {
    return this.http.get<T>(this.baseUrl);
  }
}
