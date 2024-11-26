import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { dataBaseConfig } from '@nestjs-microservices/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './controllers';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PaymentService } from './services/payment-order';
import { PaymentFactoryService } from './services/payment-order/payment-factory.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig),
     ClientsModule.register([
      // {
      //   name: 'AUTH_MICROSERVICE',
      //   transport: Transport.TCP,
      //   options: {
      //     host: 'localhost',
      //     port: 3001,
      //   },
      // },
      {
        name: 'POG_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'kafka-microservices'
          }
        }
      },
    ])
  ],
  controllers: [AppController, PaymentController],
  providers: [AppService, PaymentService, PaymentFactoryService],
})
export class AppModule { }
