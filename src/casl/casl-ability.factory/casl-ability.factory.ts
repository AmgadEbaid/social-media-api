import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Action } from '../actions';
import { articles } from 'src/articles/models/articles.entity';
import { users } from 'src/users/user.entity';

type Subjects = InferSubjects<typeof articles | typeof users> | 'all';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: users) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (user.IsAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }
    can(Action.Update, 'articles', { userId: user.id });
    can(Action.Delete, 'articles', { userId: user.id });

    can(Action.Update, 'Comments', { userId: user.id });
    can(Action.Delete, 'Comments', { userId: user.id });

    const ability = build();
    return ability;
  }
}
