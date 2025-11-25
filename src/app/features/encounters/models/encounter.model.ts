import { Combatant } from "./combatant.model";

export interface Encounter {
  id: number;
  name: string;
  description?: string;
  combatants: Combatant[];
}
