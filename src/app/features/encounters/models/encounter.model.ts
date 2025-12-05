import { Combatant } from "./combatant.model";

export interface Encounter {
  id: number;
  name: string;
  turn: number;
  damageDealToMonsters: number;
  damageDealToAdventurers: number;
  combatants: Combatant[];
}
