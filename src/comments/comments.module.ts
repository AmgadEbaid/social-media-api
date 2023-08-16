import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { articles } from 'src/articles/models/articles.entity';
import { CaslModule } from 'src/casl/casl.module';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, articles]), CaslModule],
  controllers: [CommentsController],
  providers: [CommentsService, CaslAbilityFactory],
})
export class CommentsModule {}
