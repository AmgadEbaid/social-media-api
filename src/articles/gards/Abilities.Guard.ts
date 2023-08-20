import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { DataSource } from 'typeorm';
import { Recruitment } from 'src/decorators/checkAbilites.decorator';
import { check_Abilites } from 'src/decorators/checkAbilites.decorator';
@Injectable()
export class AbiliteGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const ParamId = request.params.id;
    const checkAbilites =
      this.reflector.get<Recruitment>(check_Abilites, context.getHandler()) ||
      [];

    const SupjectRepository = this.dataSource.getRepository(
      checkAbilites['Supject'],
    );
    const supject = await SupjectRepository.findOneBy({ id: ParamId });

    const ability = this.caslAbilityFactory.createForUser(user);
    console.log(
      checkAbilites,
      supject,
      ability.can(checkAbilites['action'], supject),
    );

    return ability.can(checkAbilites['action'], supject);
  }
}
