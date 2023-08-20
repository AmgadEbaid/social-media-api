import { SetMetadata } from '@nestjs/common';
import { Action } from 'src/casl/actions';
import { Supject } from 'src/casl/casl-ability.factory/casl-ability.factory';

export interface Recruitment {
  action: Action;
  Supject: Supject;
}
export const check_Abilites = 'check_Abilites';

export const checkAbilites = (Recruitment: Recruitment) =>
  SetMetadata(check_Abilites, Recruitment);
