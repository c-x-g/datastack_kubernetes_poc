import { Test, TestingModule } from '@nestjs/testing';
import { ContainerService } from './container.service';
import { Repository } from 'typeorm';
import { Container_Metadata } from './container_metadata.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mock_CM = {
  pod_id: 'Unit Test Pod',
  node: 'Unit Test Node',
  namespace: 'Unit Test Namespace',
  ip_address: '0.0.0.0',
  service_account: 'Unit Test Account',
};

const mockContainerRepository = () => ({
  find: jest.fn(),
  findOneBy: jest,
  save: jest.fn().mockResolvedValue(mock_CM),
  remove: jest.fn(),
  delete: jest.fn(),
});
describe('ContainerService', () => {
  let service: ContainerService;
  let repository: Repository<Container_Metadata>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContainerService,
        {
          provide: getRepositoryToken(Container_Metadata),
          useValue: mockContainerRepository,
        },
      ],
    }).compile();

    service = module.get<ContainerService>(ContainerService);
    repository = module.get<Repository<Container_Metadata>>(
      getRepositoryToken(Container_Metadata),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully create container metadata and save it to the database', () => {
    process.env.MY_POD_NAME = 'Unit Test Pod';
    process.env.MY_NODE_NAME = 'Unit Test Node';
    process.env.MY_POD_NAMESPACE = 'Unit Test Namespace';
    process.env.MY_POD_IP = '0.0.0.0';
    process.env.MY_POD_SERVICE_ACCOUNT = 'Unit Test Account';

    // const spyOnSave = jest.spyOn(repository, 'save');

    expect(service.createContainer_Metadata()).resolves.toEqual(mock_CM);

    // expect(spyOnSave).toHaveBeenCalledWith(mock_CM);
  });
});
