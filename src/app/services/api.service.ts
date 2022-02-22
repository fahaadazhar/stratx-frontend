import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseAPIService {
  constructor(http: HttpClient) {
    super(http)
  }

  // You can pass url for generic api's instead of defining again
  getEmployees() {
    return this.get();
  }

}
