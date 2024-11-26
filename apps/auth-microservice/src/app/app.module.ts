import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {  dataBaseConfig, User } from '@nestjs-microservices/shared'
import { TypeOrmModule } from '@nestjs/typeorm';

 @Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
