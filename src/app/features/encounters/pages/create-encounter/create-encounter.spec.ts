import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEncounter } from './create-encounter';

describe('CreateEncounter', () => {
  let component: CreateEncounter;
  let fixture: ComponentFixture<CreateEncounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEncounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEncounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
