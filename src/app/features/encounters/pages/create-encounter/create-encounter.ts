import { Component, OnInit, signal } from '@angular/core';
import { EncounterService } from '../../services/encounter.service';
import { CreateEncounterDto } from '../../dto/create-encounter.dto';
import { MonsterService } from '../../../monsters/services/monster.service';
import { AdventurerService } from '../../../adventurers/services/adventurer.service';
import { Monster } from '../../../monsters/models/monster.model';
import { Adventurer } from '../../../adventurers/models/adventurer.model';
import { CreateCombatantDto } from '../../dto/create-combatant.dto';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, forkJoin, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-create-encounter',
  templateUrl: './create-encounter.html',
  styleUrl: './create-encounter.scss',
  imports: [ReactiveFormsModule],
})
export class CreateEncounter implements OnInit {
  encounterForm: FormGroup;
  monsters = signal<Monster[]>([]);
  adventurers = signal<Adventurer[]>([]);

  constructor(
    private readonly encounterService: EncounterService, 
    private readonly monsterService: MonsterService,
    private readonly adventurerService: AdventurerService,
    private fb: FormBuilder,
  ) {
      this.encounterForm = this.fb.group({
        name: ['', Validators.required],
        combatants: this.fb.array([]),
    });
  }
  
  ngOnInit() {
    this.getMonsters();
    this.getAdventurers();
  }

  getMonsters() {
    this.monsterService.getMonsters().subscribe(monsters => {
      console.log('Monsters:', monsters);
      this.monsters.set(monsters);
    });
  }

  getAdventurers() {
    this.adventurerService.getAdventurers().subscribe(adventurers => {
      console.log('Adventurers:', adventurers);
      this.adventurers.set(adventurers);
    });
  }

  get combatants(): FormArray {
    return this.encounterForm.get('combatants') as FormArray;
  }

  addToEncounterList(entity: Monster | Adventurer) {
    const isMonster = (entity as Monster).hitPoints !== undefined;

    const group = this.createCombatantGroup({
      name: entity.name,
      maxHp: isMonster ? (entity as Monster).hitPoints : (entity as any).maxHp ?? 0,
      currentHp: isMonster ? (entity as Monster).hitPoints : (entity as any).maxHp ?? 0,
      isMonster,
      monster: isMonster ? (entity as Monster) : null,
      adventurer: !isMonster ? (entity as Adventurer) : null
    });

    this.combatants.push(group);
  }

  removeCombatant(i: number) {
    console.log('Removing combatant at index:', i);
    const combatants = this.combatants;
    const newControls = combatants.controls.filter((_, index) => index !== i);
    const newFormArray = new FormArray(newControls, combatants.validator, combatants.asyncValidator);
    this.encounterForm.setControl('combatants', newFormArray);
  }

  submitEncounter() {
    console.log(this.encounterForm.value);

    if (this.encounterForm.invalid) {
      console.log('Form is invalid');
      this.encounterForm.markAllAsTouched();
      return;
    }

    const dto = {
      name: this.encounterForm.value.name
    };

    this.encounterService.create(dto).pipe(
      switchMap((created: any) => {
        const encounterId = created.id;

        const calls = this.combatants.controls.map((ctrl) =>
          this.encounterService.addCombatant(encounterId, (ctrl as FormGroup).value)
            .pipe(catchError(err => {
              console.error('Error posting combatant', err);
              return of(null);
            }))
        );

        return forkJoin(calls);
      })
    ).subscribe(() => {
      console.log('Encounter created !');
      this.encounterForm.reset();
      this.combatants.clear();
    });
  }

  private createCombatantGroup(data: Partial<CreateCombatantDto>): FormGroup {
    return this.fb.group({
      name: [data.name ?? '', Validators.required],
      initiative: [0, Validators.required],
      maxHp: [data.maxHp ?? 0, Validators.required],
      currentHp: [data.currentHp ?? 0, Validators.required],
      tempHp: [0],
      isMonster: [data.isMonster ?? false],
      monster: [data.monster ?? null],
      adventurer: [data.adventurer ?? null],
    });
  }

}
