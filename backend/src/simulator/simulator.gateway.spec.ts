import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorGateway } from './simulator.gateway';
import { SimulatorService } from './simulator.service';

describe('SimulatorGateway', () => {
  let gateway: SimulatorGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulatorGateway, SimulatorService],
    }).compile();

    gateway = module.get<SimulatorGateway>(SimulatorGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
