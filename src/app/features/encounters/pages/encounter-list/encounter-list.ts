import { Component, OnInit, signal } from '@angular/core';
import { EncounterService } from '../../services/encounter.service';
import { Encounter } from '../../models/encounter.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-encounter-list',
  imports: [RouterLink],
  templateUrl: './encounter-list.html',
  styleUrl: './encounter-list.scss',
})
export class EncounterList implements OnInit {
  encounters = signal<Encounter[]>([]);

  constructor(private readonly encounterService: EncounterService) {}

  ngOnInit() {
    this.encounterService.getEncounters().subscribe((data) => {
      console.log('Encounters:', data);
      this.encounters.set(data);
    });
  }

  startEncounter(id: number) {
    console.log('Starting encounter:', id);
    // Logic to start the encounter goes here
  }

}
