import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { DataSource } from 'typeorm';
import { TypeormStore } from 'connect-typeorm';
import * as passport from 'passport';
import { Session } from './auth/session.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(DataSource).getRepository(Session);

  await app.listen(3000);
}
bootstrap();
