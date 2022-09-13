import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SimulatorService } from './simulator.service';
import { CreateSimulatorDto } from './dto/create-simulator.dto';
import { UpdateSimulatorDto } from './dto/update-simulator.dto';
import { Server, Socket } from 'socket.io';
import { clearInterval } from 'timers';

@WebSocketGateway({ cors: { origin: '*' } })
export class SimulatorGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly simulatorService: SimulatorService) {}

  @SubscribeMessage('createSimulator')
  create(
    @MessageBody() createSimulatorDto: CreateSimulatorDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(client.id);
    let counter = createSimulatorDto.counter || 0;
    const intervalId = setInterval(() => {
      console.log('Counter: ', counter);
      client.emit('running', ++counter);
      console.log(client.rooms);
    }, 1000);
    client.on('running', ({ cmd }) => {
      if (cmd === 'stop') {
        console.log('disconnected user!: ' + client.id);
        clearInterval(intervalId);
      }
    });
    return 'started';
  }

  @SubscribeMessage('updateSimulator')
  update(@MessageBody() updateSimulatorDto: UpdateSimulatorDto) {
    return this.simulatorService.update(updateSimulatorDto);
  }
}
