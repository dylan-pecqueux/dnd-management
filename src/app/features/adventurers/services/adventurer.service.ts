import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adventurer } from '../models/adventurer.model';

@Injectable({
  providedIn: 'root',
})
export class AdventurerService {
    constructor(private readonly http: HttpClient) {}

  getAdventurers(): Observable<Adventurer[]> {
    return this.http.get<Adventurer[]>('/adventurer');
  }
  
}
