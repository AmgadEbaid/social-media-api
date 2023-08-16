import { Module } from '@nestjs/common';
import { CaslModule } from 'src/casl/casl.module';
import { ArticlesService } from './articles.service';
import { articles } from './models/articles.entity';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
@Module({
  imports: [TypeOrmModule.forFeature([articles]), CaslModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, CaslAbilityFactory],
})
export class ArticlesModule {}
