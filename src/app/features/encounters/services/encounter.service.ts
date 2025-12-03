import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Encounter } from '../models/encounter.model';
import { Observable } from 'rxjs';
import { CreateCombatantDto } from '../dto/create-combatant.dto';

@Injectable({
  providedIn: 'root',
})
export class EncounterService {
  constructor(private http: HttpClient) {}

  getEncounters(): Observable<Encounter[]> {
    return this.http.get<Encounter[]>('/encounter');
  }

  create(dto: { name: string }) {
    return this.http.post('/encounter', dto);
  }

  addCombatant(encounterId: number, combatant: CreateCombatantDto) {
    return this.http.post(`/encounter/${encounterId}/combatant`, combatant);
  }
}
