import { Ability } from "./ability.model";
import { Action } from "./action.model";
import { ConditionType } from "./condition-type.model";
import { DamageType } from "./damage-type.model";
import { Sense } from "./sense.model";
import { Skill } from "./skill.model";
import { Trait } from "./trait.model";

export interface Monster {
  id: number;
  name: string;
  size?: string;
  creatureType?: string;
  alignment?: string;
  armorClass: number;
  armorDesc?: string;
  hitPoints: number;
  hitDice?: string;
  speed: string;
  challengeRating?: string;
  languages?: string;
  initiativeModifier?: string;
  gear?: string;
  imageUrl?: string;
  source?: string;

  ability: Ability;
  skills?: Skill[];
  senses?: Sense[];

  traits?: Trait[];
  actions?: Action[];
  reactions?: Action[];
  legendaryActions?: Action[];

  damageResistances?: DamageType[];
  damageImmunities?: DamageType[];
  conditionImmunities?: ConditionType[];
}
