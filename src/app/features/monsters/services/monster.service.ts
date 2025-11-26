import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Monster } from '../models/monster.model';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
    constructor(private http: HttpClient) {}

  getMonsters(): Observable<Monster> {
    return this.http.get<Monster>('/monster');
  }
}
