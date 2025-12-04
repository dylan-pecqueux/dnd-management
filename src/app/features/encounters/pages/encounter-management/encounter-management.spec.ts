import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterManagement } from './encounter-management';

describe('EncounterManagement', () => {
  let component: EncounterManagement;
  let fixture: ComponentFixture<EncounterManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncounterManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncounterManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
