import { Get, Controller } from '@nestjs/common';
import { ContainerService } from 'src/container/container.service';

@Controller('container')
export class ContainerController {
  constructor(private containerService: ContainerService) {}

  @Get()
  async getContainerInfo() {
    await this.containerService.createContainer_Metadata();

    return {
      pod: process.env.MY_POD_NAME,
      node: process.env.MY_NODE_NAME,
      namespace: process.env.MY_POD_NAMESPACE,
      ip_addr: process.env.MY_POD_IP,
      svc_account: process.env.MY_POD_SERVICE_ACCOUNT,
    };
  }
}
