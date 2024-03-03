import { Test, TestingModule } from '@nestjs/testing';
import { ContainerService } from './container.service';
import { Repository } from 'typeorm';
import { Container_Metadata } from './container_metadata.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

// you can have multiple describe blocks to separate and organize
// different tests
describe('ContainerService Successful Tests', () => {
  let service: ContainerService;
  let repository: Repository<Container_Metadata>;

  // a fake Container_Metadata object intended to mimic a real object's properties
  // for the purpose of testing correctness of behavior
  const mock_CM = {
    pod_id: 'Unit Test Pod',
    node: 'Unit Test Node',
    namespace: 'Unit Test Namespace',
    ip_address: '0.0.0.0',
    service_account: 'Unit Test Account',
    timestamp: null,
  };

  const mock_CM_list = [
    {
      pod_id: '1',
      node: 'Node 1',
      namespace: '1',
      ip_address: '0.0.0.0',
      service_account: 'Account 1',
    },
    {
      pod_id: '2',
      node: 'Node 2',
      namespace: '2',
      ip_address: '1.2.3.4',
      service_account: 'Account 2',
    },
  ];

  // in this unit test context, the mockContainerRepository
  // replaces the actual Repository that object that would be
  // used in the application

  // as you can see it overwrites some of the existing methods
  // available on the Repository object such as find, save, delete
  const mockContainerRepository = () => ({
    // fake the behavior of find to return mock_CM_list which is validated by the unit test
    find: jest.fn().mockResolvedValue(mock_CM_list),
    // fake the behavior of save to return mock_CM which is validated by the unit test
    save: jest.fn().mockResolvedValue(mock_CM),
    delete: jest.fn(),
  });

  // unit tests in jest are represented by the it(...) blocks
  // a beforeEach(...) block runs before each unit test, its
  // primary purpose is to reduce redundancy among shared code
  // needed to set up each unit test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContainerService,
        {
          provide: getRepositoryToken(Container_Metadata),
          useValue: mockContainerRepository(),
        },
      ],
    }).compile();

    service = module.get<ContainerService>(ContainerService);
    repository = module.get<Repository<Container_Metadata>>(
      getRepositoryToken(Container_Metadata),
    );
  });

  /* 
    You may also specify an afterEach(...) block where appropriate, 
    the most common use case for afterEach is cleaning up or resetting 
    certain variables in specific situations
  */

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully create container metadata and save it to the database', () => {
    process.env.MY_POD_NAME = 'Unit Test Pod';
    process.env.MY_NODE_NAME = 'Unit Test Node';
    process.env.MY_POD_NAMESPACE = 'Unit Test Namespace';
    process.env.MY_POD_IP = '0.0.0.0';
    process.env.MY_POD_SERVICE_ACCOUNT = 'Unit Test Account';

    // spyOnSave is able to monitor the save method through the unit test
    const spyOnSave = jest.spyOn(repository, 'save');

    // fake the behavior of the Date constructor to return a mockDate created in this unit test instead
    const mockDate = new Date();
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    mock_CM.timestamp = new Date();

    expect(service.createContainer_Metadata()).resolves.toEqual(mock_CM);
    expect(spyOnSave).toHaveBeenCalledWith(mock_CM);
  });

  it('should successfully retrieve a list of Container Metadata Objects', async () => {
    const resp = await service.get_all_CMData();
    expect(resp).toEqual(mock_CM_list);
    expect(resp.length).toEqual(2);
  });
});

// handle tests where exceptions are thrown
describe('Container Service Failure Tests', () => {
  let service: ContainerService;
  let repository: Repository<Container_Metadata>;

  // notice that the behavior of the repository methods are modified to throw exceptions in this section
  const mockContainerRepository = () => ({
    find: jest.fn().mockImplementation(() => {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }),
    save: jest.fn().mockImplementation(() => {
      throw new HttpException('Bad Gateway', HttpStatus.BAD_GATEWAY);
    }),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContainerService,
        {
          provide: getRepositoryToken(Container_Metadata),
          useValue: mockContainerRepository(),
        },
      ],
    }).compile();

    service = module.get<ContainerService>(ContainerService);
    repository = module.get<Repository<Container_Metadata>>(
      getRepositoryToken(Container_Metadata),
    );
  });

  it('should fail and throw an exception when creating container metadata', () => {
    try {
      service.createContainer_Metadata();
    } catch (e) {
      // the validation occurs here
      expect(e.message.toEqual('An error occurred: Bad Gateway'));
      expect(e.status.toEqual(HttpStatus.BAD_GATEWAY));
    }
  });

  it('should fail and throw an exception when getting a list of container metadata', async () => {
    try {
      service.get_all_CMData();
    } catch (e) {
      // the validation occurs here
      expect(e.message.toEqual('An error occurred: Forbidden'));
      expect(e.status.toEqual(HttpStatus.FORBIDDEN));
    }
  });
});
