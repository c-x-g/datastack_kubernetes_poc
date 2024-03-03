import { Test, TestingModule } from '@nestjs/testing';
import { ContainerController } from './container.controller';
import { ContainerService } from './container.service';

describe('ContainerController', () => {
  let controller: ContainerController;
  let service: ContainerService;

  const mockDate = new Date();
  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContainerController],
      providers: [
        ContainerService,
        {
          provide: ContainerService,
          useValue: {
            createContainer_Metadata: jest.fn().mockResolvedValue({
              pod_id: '1',
              node: '1',
              namespace: '1',
              ip_address: '1',
              service_account: '1',
              timestamp: new Date(),
            }),
            get_all_CMData: jest.fn().mockResolvedValue([{
              pod_id: '1',
              node: '1',
              namespace: '1',
              ip_address: '1',
              service_account: '1',
              timestamp: new Date(),
            }]),
          },
        },
      ],
    }).compile();

    controller = module.get<ContainerController>(ContainerController);
    service = module.get<ContainerService>(ContainerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should successfully create and return a container metadata object', () => {
    expect(controller.createContainerInfo()).resolves.toEqual({
      pod_id: '1',
      node: '1',
      namespace: '1',
      ip_address: '1',
      service_account: '1',
      timestamp: new Date(),
    });
  });


  it('should successfully get and return a list of container metadata objects', () => {
    expect(controller.getAllContainerInfo()).resolves.toEqual(

[{
              pod_id: '1',
              node: '1',
              namespace: '1',
              ip_address: '1',
              service_account: '1',
              timestamp: new Date(),
            }]
);

  });
  });

