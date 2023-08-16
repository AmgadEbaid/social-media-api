import {
  Module,
  ValidationPipe,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { authModule } from './auth/auth.module';
import { Session } from './auth/session.entity';
import { DataSource } from 'typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { ArticlesModule } from './articles/articles.module';
import { CaslModule } from './casl/casl.module';
import { CommentsModule } from './comments/comments.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.devlopment.env`,
      cache: true,
      load: [databaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    authModule,
    UsersModule,
    ArticlesModule,
    CaslModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  constructor(private datasource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
          saveUninitialized: false,
          resave: false,
          cookie: {
            maxAge: 60000,
          },
          store: new TypeormStore({
            cleanupLimit: 2,
            limitSubquery: false, // If using MariaDB.
            ttl: 86400,
          }).connect(this.datasource.getRepository(Session)),
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
