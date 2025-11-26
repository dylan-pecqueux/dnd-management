import { Component, OnInit, signal } from '@angular/core';
import { EncounterService } from '../../services/encounter.service';
import { Field, form } from '@angular/forms/signals';
import { CreateEncounterDto } from '../../dto/create-encounter.dto';
import { MonsterService } from '../../../monsters/services/monster.service';
import { AdventurerService } from '../../../adventurers/services/adventurer.service';

@Component({
  selector: 'app-create-encounter',
  templateUrl: './create-encounter.html',
  styleUrl: './create-encounter.scss',
  imports: [Field],
})
export class CreateEncounter implements OnInit {
  constructor(
    private readonly encounterService: EncounterService, 
    private readonly monsterService: MonsterService,
    private readonly adventurerService: AdventurerService
  ) {}

  encounterModel = signal<CreateEncounterDto>({
    name: '',
  });

  encounterForm = form(this.encounterModel);
  
  ngOnInit() {
    this.monsterService.getMonsters().subscribe(monsters => {
      console.log('Monsters:', monsters);
    });
    this.adventurerService.getAdventurers().subscribe(adventurers => {
      console.log('Adventurers:', adventurers);
    });

    // this.encounterService.getEncounters().subscribe(encounters => {
    //   console.log('Encounters:', encounters);
    // });
  }

  createEncounter(event: Event) {
    event.preventDefault();

    console.log("ici")
    console.log('Creating encounter with data:', this.encounterForm.name().value());
    console.log('Creating encounter with data (model):', this.encounterModel());
  }

}
