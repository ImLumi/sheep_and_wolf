import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SimulationService } from './simulation.service';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class SimulationGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly simulationService: SimulationService) {}

  @SubscribeMessage('startSimulation')
  create(
    @MessageBody() createSimulationDto: CreateSimulationDto,
    @ConnectedSocket() client: Socket,
  ) {
    const intervalId = this.simulationService.create(
      createSimulationDto,
      client,
    );
    client.once('running', ({ cmd }) => {
      if (cmd === 'stop') {
        clearInterval(intervalId);
      }
    });
    return 'started';
  }
}
