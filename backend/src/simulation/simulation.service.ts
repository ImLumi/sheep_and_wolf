import { Injectable } from '@nestjs/common';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { Socket } from 'socket.io';
import Sheep from './utils/Sheep/Sheep';
import Wolf from './utils/wolf/Wolf';

@Injectable()
export class SimulationService {
  create(createSimulatorDto: CreateSimulationDto, client: Socket) {
    const { sheepCount, speed, width, height } = createSimulatorDto;
    const sheepList = Array.from({ length: sheepCount }).map(
      () => new Sheep(width, height),
    );
    const wolf = new Wolf(width, height);
    const intervalId = setInterval(() => {
      if (sheepList.length === 0) {
        clearInterval(intervalId);
        client.emit('running', { isFinish: true });
      }

      client.emit('running', {
        screen: { width, height },
        sheep: sheepList,
        wolf,
      });

      sheepList.forEach((sp) => {
        sp.run(wolf);
      });
      wolf.catchSheep(sheepList);
    }, 300 / speed);

    return intervalId;
  }
}
