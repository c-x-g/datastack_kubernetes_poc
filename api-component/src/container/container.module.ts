import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainerController } from '../container/container.controller';
import { ContainerService } from './container.service';
import { Container_Metadata } from '../container/container_metadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Container_Metadata])],
  controllers: [ContainerController],
  providers: [ContainerService],
})
export class ContainerModule {}
