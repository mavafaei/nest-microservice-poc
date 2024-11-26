import { dataBaseConfig, Idempotency, Payment } from '@nestjs-microservices/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { IdempotencyService } from './services/idempotency.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig),
    TypeOrmModule.forFeature([Payment, Idempotency]),

  ],
  controllers: [AppController],
  providers: [AppService, IdempotencyService],
})
export class AppModule { }
