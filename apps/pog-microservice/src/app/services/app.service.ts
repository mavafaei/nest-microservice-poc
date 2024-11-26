import { Payment } from '@nestjs-microservices/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdempotencyService } from './idempotency.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,

    private idempotencyService: IdempotencyService,
  ) { }

  createPayment(clientToCoreNewSingleTransactionRequest: Payment): Promise<Payment> {

    this.idempotencyService.validate(clientToCoreNewSingleTransactionRequest);
    // throw new RpcException('Error FROM POG');

    clientToCoreNewSingleTransactionRequest.status = 'CREATED';
    return this.paymentRepository.save(clientToCoreNewSingleTransactionRequest);
  }
}
