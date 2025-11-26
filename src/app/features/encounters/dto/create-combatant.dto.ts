import { Adventurer } from "../../adventurers/models/adventurer.model";
import { Monster } from "../../monsters/models/monster.model";

export interface CreateCombatantDto {
  name: string;
  initiative: number;
  maxHp: number;
  currentHp: number;
  tempHp: number;
  isMonster: boolean;
  isDead?: boolean;
  encounterId: number;
  monster?: Monster | null;
  adventurer?: Adventurer | null;
}
