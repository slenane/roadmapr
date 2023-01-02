import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
import { GET_ROADMAP } from '../constants/http.constants';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(
    // private http: HttpClient,
  ) {}

  public generate(endpoint: string, data: {}): string {
    return `http://localhost:5000${GET_ROADMAP}`;
  }
}