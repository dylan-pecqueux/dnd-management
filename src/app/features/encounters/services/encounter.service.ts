import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Encounter } from '../models/encounter.model';
import { Observable } from 'rxjs';
import { CreateCombatantDto } from '../dto/create-combatant.dto';
import { UpdateHpDto } from '../dto/update-hp.dto';
import { Combatant } from '../models/combatant.model';

@Injectable({
  providedIn: 'root',
})
export class EncounterService {
  constructor(private http: HttpClient) {}

  getEncounters(): Observable<Encounter[]> {
    return this.http.get<Encounter[]>('/encounter');
  }

  getEncounterById(id: string): Observable<Encounter> {
    return this.http.get<Encounter>(`/encounter/${id}`);
  }

  create(dto: { name: string }) {
    return this.http.post('/encounter', dto);
  }

  addCombatant(encounterId: number, combatant: CreateCombatantDto) {
    return this.http.post(`/encounter/${encounterId}/combatant`, combatant);
  }

  updateCombatantHp(combatantId: number, updateHpDto: UpdateHpDto): Observable<Combatant> {
    return this.http.patch<Combatant>(`/encounter/combatant/${combatantId}/hp`, updateHpDto);
  }

  updateCombatantInitiative(combatantId: string, newInitiative: number): Observable<Combatant> {
    return this.http.patch<Combatant>(`/encounter/combatant/${combatantId}/initiative`, { initiative: newInitiative });
  }
}
