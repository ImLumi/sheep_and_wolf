import { Injectable } from '@nestjs/common';
import { CreateSimulatorDto } from './dto/create-simulator.dto';
import { UpdateSimulatorDto } from './dto/update-simulator.dto';

@Injectable()
export class SimulatorService {
  create(createSimulatorDto: CreateSimulatorDto) {
    return 'This action adds a new simulator';
  }

  update(updateSimulatorDto: UpdateSimulatorDto) {
    return `This action updates a simulator`;
  }
}
