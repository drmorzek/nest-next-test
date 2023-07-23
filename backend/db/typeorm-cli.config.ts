import { DataSource } from 'typeorm';
// import { envConfig as env } from '../src/config/env.config';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [File],
  logging: true,
  synchronize: true,
  migrationsRun: true,
  migrations: ['./db/migrations/*.{js,ts}'],
});
