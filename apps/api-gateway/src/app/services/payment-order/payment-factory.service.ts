import { CreatePaymentDto, Payment } from '@nestjs-microservices/shared';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PaymentFactoryService {

  constructor() { }



  createNewClientToCoreNewSingleTransactionRequest(createPaymentDto: CreatePaymentDto): CreatePaymentDto {
    const newClientToCoreNewSingleTransactionRequest = new Payment();

    newClientToCoreNewSingleTransactionRequest.amount = createPaymentDto.amount;
    newClientToCoreNewSingleTransactionRequest.currency = createPaymentDto.currency;
    newClientToCoreNewSingleTransactionRequest['client-id'] = createPaymentDto['client-id'];

    if (createPaymentDto['x-idempotency-key']) {
      newClientToCoreNewSingleTransactionRequest['x-idempotency-key'] = createPaymentDto['x-idempotency-key'];
    }

 
    return newClientToCoreNewSingleTransactionRequest;
  }

  createPostPaymentOrderApiResponse(response: Payment): Payment {
    const postPaymentOrderApiResponse = new Payment();
    postPaymentOrderApiResponse.id = response.id;
    postPaymentOrderApiResponse.amount = response.amount;
    postPaymentOrderApiResponse.currency = response.currency;
    postPaymentOrderApiResponse.status = response.status;

    return postPaymentOrderApiResponse;
  }
}
