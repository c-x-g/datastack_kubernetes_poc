import { Get, Post, Controller } from '@nestjs/common';
import { ContainerService } from './container.service';
import { Container_Metadata } from './container_metadata.entity';

@Controller('container')
export class ContainerController {
  constructor(private containerService: ContainerService) {}

  @Post()
  async createContainerInfo(): Promise<Container_Metadata> {
    let cm = await this.containerService.createContainer_Metadata();
    return cm;
  }

  @Get()
  async getAllContainerInfo(): Promise<Container_Metadata[]> {
    let all_CMData = await this.containerService.get_all_CMData();
    return all_CMData;
  }
}
