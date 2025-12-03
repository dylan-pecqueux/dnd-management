import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterList } from './encounter-list';

describe('EncounterList', () => {
  let component: EncounterList;
  let fixture: ComponentFixture<EncounterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncounterList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncounterList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
