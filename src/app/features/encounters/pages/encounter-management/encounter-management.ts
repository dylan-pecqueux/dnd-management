import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncounterService } from '../../services/encounter.service';
import { Encounter } from '../../models/encounter.model';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Combatant } from '../../models/combatant.model';
import { Monster } from '../../../monsters/models/monster.model';

@Component({
  selector: 'app-encounter-management',
  imports: [ReactiveFormsModule],
  templateUrl: './encounter-management.html',
  styleUrl: './encounter-management.scss',
})
export class EncounterManagement implements OnInit {
  private fb = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private encounterService = inject(EncounterService);

  form = new FormGroup({
    combatants: new FormArray<FormGroup<{
      initiative: FormControl<number>,
      id: FormControl<string>
    }>>([])
  });
  damageForm = new FormGroup({
    damage: new FormControl<number>(0),
    heal: new FormControl<number>(0),
    damageType: new FormControl<string>(''),
  });
  encounterId = signal('');
  encounterDetails = signal<Encounter | null>(null);
  combatantDetails = signal<Combatant | null>(null);


  constructor() {
    this.encounterId.set(this.activatedRoute.snapshot.paramMap.get('id') || '');
  }

  ngOnInit(): void {
    console.log('Managing encounter with ID:', this.encounterId());
    this.encounterService.getEncounterById(this.encounterId()).subscribe(encounter => {
      console.log('Encounter details:', encounter);
      this.encounterDetails.set(encounter);
      this.initForm();
    });
  }

  get combatantsFormArray() {
    return this.form.get('combatants') as FormArray<FormGroup>;
  }

  getCombatant(index: number): Combatant | undefined {
    return this.encounterDetails()?.combatants[index];
  }

  getCombatantDetails(combatant: Combatant | undefined): void {
    if (combatant && combatant.monster) this.combatantDetails.set(combatant);
    console.log('Selected combatant details:', combatant);
  }

  getEncounter(): void {
    this.encounterService.getEncounterById(this.encounterId()).subscribe(encounter => {
      this.encounterDetails.set(encounter);
      this.initForm();
    });
  }

  updateEncounter(): void {
    this.encounterService.getEncounterById(this.encounterId()).subscribe(encounter => {
      this.encounterDetails.set(encounter);
      this.combatantsFormArray.clear();
      this.encounterDetails()?.combatants.forEach(f => {
        this.combatantsFormArray.push(
          new FormGroup({
            id: new FormControl(f.id),
            initiative: new FormControl(f.initiative),
          })
        );
      });
    });
  }

  updateInitiative(index: number) {
    const combatantForm = this.combatantsFormArray.at(index) as FormGroup;
    const newInitiative = combatantForm.get('initiative')?.value;
    const combatantId = combatantForm.get('id')?.value;

    this.encounterService.updateCombatantInitiative(combatantId, newInitiative).subscribe((response) => {
      this.updateEncounter();
      console.log('Initiative updated successfully for combatant', combatantId);
    });
  }

  updateTurn() {
    this.encounterService.updateEncounterTurn(this.encounterId()).subscribe(() => {
      this.encounterDetails.update(encounter => {
        if (encounter) {
          return { ...encounter, turn: encounter.turn + 1 };
        }
        return encounter;
      });
    })
  }

  updateHP(combatantId: number | undefined) {
    if (combatantId) {
      const damageTake = this.damageForm.get('damage')?.value;
      const healValue = this.damageForm.get('heal')?.value;

      const updateHp = {
        hpChange: damageTake ? -damageTake : (healValue ?? 0),
        damageType: this.damageForm.get('damageType')?.value || undefined,
      }

      console.log('New HP for fighter', combatantId, ':', damageTake);

      this.encounterService.updateCombatantHp(combatantId, updateHp).subscribe((response) => {
        console.log('HP updated successfully for combatant', combatantId);
        this.damageForm.get('damage')?.setValue(0);
        this.damageForm.get('heal')?.setValue(0);

        this.updateEncounter();
      });
    }
  }

  

  private initForm() {
    console.log('Initializing form with encounter details:', this.encounterDetails());
    this.encounterDetails()?.combatants.forEach(f => {
      this.combatantsFormArray.push(
        new FormGroup({
          id: new FormControl(f.id),
          initiative: new FormControl(f.initiative),
        })
      );
    });
  }

}
