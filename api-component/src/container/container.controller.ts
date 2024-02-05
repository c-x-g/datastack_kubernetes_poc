import { Get, Controller } from '@nestjs/common';

@Controller('container')
export class ContainerController {
  @Get()
  async getContainerInfo() {
    return {
      pod: process.env.MY_POD_NAME,
      node: process.env.MY_NODE_NAME,
      namespace: process.env.MY_POD_NAMESPACE,
      ip_addr: process.env.MY_POD_IP,
      svc_account: process.env.MY_POD_SERVICE_ACCOUNT,
    };
  }
}
