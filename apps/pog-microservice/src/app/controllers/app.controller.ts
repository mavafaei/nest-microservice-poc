import { Payment } from '@nestjs-microservices/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern('createPaymentTopic')
  handleCreatePayment(createPaymentMessage: Payment): Promise<Payment> {
    console.log(createPaymentMessage)
    return this.appService.createPayment(createPaymentMessage);
  }
}
