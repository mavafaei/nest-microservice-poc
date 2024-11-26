import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseConfig } from './database';
import { Idempotency } from './entities';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class SharedModule { }
