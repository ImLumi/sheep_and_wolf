import { Test, TestingModule } from '@nestjs/testing';
import { SimulationGateway } from './simulation.gateway';
import { SimulationService } from './simulation.service';

describe('SimulatorGateway', () => {
  let gateway: SimulationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulationGateway, SimulationService],
    }).compile();

    gateway = module.get<SimulationGateway>(SimulationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
