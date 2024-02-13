import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Container_Metadata } from './container_metadata.entity';

@Injectable()
export class ContainerService {
  constructor(
    @InjectRepository(Container_Metadata)
    private readonly container_MetadataRepository: Repository<Container_Metadata>,
  ) {}
  async createContainer_Metadata(): Promise<Container_Metadata> {
    const cm = new Container_Metadata();

    cm.pod_id = process.env.MY_POD_NAME;
    cm.node = process.env.MY_NODE_NAME;
    cm.namespace = process.env.MY_POD_NAMESPACE;
    cm.ip_address = process.env.MY_POD_IP;
    cm.service_account = process.env.MY_POD_SERVICE_ACCOUNT;
    cm.timestamp = new Date();


    await this.container_MetadataRepository.save(cm);



    // should include error handling but not priority

    return cm
  }
}
