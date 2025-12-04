import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncounterService } from '../../services/encounter.service';
import { Encounter } from '../../models/encounter.model';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Combatant } from '../../models/combatant.model';

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
      hp: FormControl<number>,
      id: FormControl<string>
    }>>([])
  });
  encounterId = signal('');
  encounterDetails = signal<Encounter | null>(null);


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

  updateHP(index: number) {
    const fighterForm = this.combatantsFormArray.at(index) as FormGroup;
    const damageTake = fighterForm.get('damage')?.value;
    const combatantId = fighterForm.get('id')?.value;

    const updateHp = {
      hpChange: damageTake ? -damageTake : (fighterForm.get('heal')?.value),
      damageType: fighterForm.get('damageType')?.value || undefined,
    }

    console.log('New HP for fighter', combatantId, ':', damageTake);

    this.encounterService.updateCombatantHp(combatantId, updateHp).subscribe((response) => {
      console.log('HP updated successfully for combatant', combatantId);
      fighterForm.get('damage')?.setValue(0);
      fighterForm.get('heal')?.setValue(0);

      // Met à jour les détails du combat
      const details = this.encounterDetails();
      if (details?.combatants) {
        const updatedEncounter = {
          ...details,
          combatants: details.combatants.map((c, idx) =>
            idx === index ? { ...c, currentHp: response.currentHp } : c
          ),
        };

        this.encounterDetails.set(updatedEncounter);
      }
    });
  }

  private initForm() {
    console.log('Initializing form with encounter details:', this.encounterDetails());
    this.encounterDetails()?.combatants.forEach(f => {
      this.combatantsFormArray.push(
        new FormGroup({
          id: new FormControl(f.id),
          damage: new FormControl(),
          damageType: new FormControl(),
          heal: new FormControl(),
        })
      );
    });
  }

}
