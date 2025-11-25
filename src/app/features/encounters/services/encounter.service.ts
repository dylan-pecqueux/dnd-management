import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Encounter } from '../models/encounter.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncounterService {
  constructor(private http: HttpClient) {}

  getEncounters(): Observable<Encounter> {
    return this.http.get<Encounter>('/encounter');
  }
}
