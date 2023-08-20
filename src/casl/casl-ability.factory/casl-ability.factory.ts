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

export enum Supject {
  user = 'users',
  article = 'articles',
  comment = 'Comments',
}
@Injectable()
export class CaslAbilityFactory {
  createForUser(user: users) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (user.IsAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }
    can(Action.Update, Supject.article, { userId: user.id });
    can(Action.Delete, Supject.article, { userId: user.id });

    can(Action.Update, Supject.comment, { userId: user.id });
    can(Action.Delete, Supject.comment, { userId: user.id });

    const ability = build();
    return ability;
  }
}
