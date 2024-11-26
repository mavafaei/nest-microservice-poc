/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { RpcReqResExceptionFilter } from '@nestjs-microservices/shared';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `consumer-${uuidv4()}`,
          brokers: ['localhost:29092'],
        },
        consumer: {
          groupId: 'consumer',
        },
      }
    }
  );
  app.useGlobalFilters(new RpcReqResExceptionFilter());
  await app.listen();

  Logger.log('🚀 POG microservice is listening');
}

bootstrap();
