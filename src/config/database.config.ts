import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'sqlite',
  database: 'dev.sqlite',
  synchronize: true,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
}));
