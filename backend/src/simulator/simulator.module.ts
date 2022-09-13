import { Module } from '@nestjs/common';
import { SimulatorService } from './simulator.service';
import { SimulatorGateway } from './simulator.gateway';

@Module({
  providers: [SimulatorGateway, SimulatorService],
})
export class SimulatorModule {}
