import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainerModule } from './container/container.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: 'postgres', // note that this is not the intended practice, will remove asap
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    ContainerModule,
  ],
})
export class AppModule {}
