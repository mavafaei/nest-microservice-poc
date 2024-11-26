import { CreatePaymentDto, Payment } from '@nestjs-microservices/shared';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PaymentFactoryService } from './payment-factory.service';
@Injectable()
export class PaymentService {

  constructor(
    private readonly paymentFactoryService: PaymentFactoryService,
    @Inject('POG_MICROSERVICE') private readonly pogClient: ClientKafka
  ) { }




  createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const requestFactory = this.paymentFactoryService.createNewClientToCoreNewSingleTransactionRequest(createPaymentDto);
    const kafkaKey = `${requestFactory['client-id']}${requestFactory['x-idempotency-key']?? ''}`.trim();

    const call = this.pogClient.send<Payment, Object>('createPaymentTopic',
      {
        key: kafkaKey,
        value: JSON.stringify(requestFactory)
      });
    return lastValueFrom(call).then(response =>
      this.paymentFactoryService.createPostPaymentOrderApiResponse(response)
    ).catch(error => {
      throw new HttpException(error.message, error.status);
    });
  }
}
