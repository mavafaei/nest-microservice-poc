import { CreatePaymentDto, Idempotency } from '@nestjs-microservices/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IdempotencyService {
  constructor(
    @InjectRepository(Idempotency)
    private idempotencyRepository: Repository<Idempotency>,
  ) { }

  validate(message: CreatePaymentDto): boolean {
    return true;
  }
}
