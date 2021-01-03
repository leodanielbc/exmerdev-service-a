import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthProviders } from './drivers/auth.provider';
import { DatabaseConectionModule } from '../../drivers/database-conection/database-conection.module';
import { RabbitmqService } from './services/rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseConectionModule,
    ClientsModule.register([
      {
        name: 'rabbit-mq-module',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://localhost:5672`],
          queue: 'exmer-dev',
          /* queueOptions: {
            durable: true
          }, */
        },
      },
    ]),
  ],
  providers: [AuthService, ...AuthProviders, RabbitmqService],
  controllers: [AuthController]
})
export class AuthModule {}
