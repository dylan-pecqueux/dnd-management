import { Component, OnInit } from '@angular/core';
import { EncounterService } from '../../services/encounter.service';

@Component({
  selector: 'app-create-encounter',
  imports: [],
  templateUrl: './create-encounter.html',
  styleUrl: './create-encounter.scss',
})
export class CreateEncounter implements OnInit {
  constructor(private encounterService: EncounterService) {}
  
  ngOnInit() {
    this.encounterService.getEncounters().subscribe(encounters => {
      console.log('Encounters:', encounters);
    });
  }

}
