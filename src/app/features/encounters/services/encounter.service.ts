import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncounterService {
  constructor(private http: HttpClient) {}

  getEncounters() {
    return this.http.get('/encounter');
  }
}
