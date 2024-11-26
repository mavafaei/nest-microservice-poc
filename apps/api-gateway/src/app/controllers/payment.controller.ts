import { Body, Controller, Inject, Post, UseInterceptors } from '@nestjs/common';

import { CreatePaymentDto, Payment } from '@nestjs-microservices/shared';
import { ClientKafka } from '@nestjs/microservices';
import { Admin, Kafka } from 'kafkajs';
import { TenantAwareInterceptor } from '../interceptors';
import { PaymentService } from '../services/payment-order';

@Controller('payment-orders')
export class PaymentController {
  private admin: Admin;
  constructor(
    @Inject('POG_MICROSERVICE') private client: ClientKafka,
    private readonly paymentService: PaymentService) {

  }


  async onModuleInit() {
    this.client.subscribeToResponseOf('createPaymentTopic');
     const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:29092'],
    });
    this.admin = kafka.admin();
    const topics = await this.admin.listTopics();

    const topicList = [];
    if (!topics.includes('createPaymentTopic')) {
      topicList.push({
        topic: 'createPaymentTopic',
        numPartitions: 10,
        replicationFactor: 1,
      });
    }

    if (!topics.includes('createPaymentTopic.reply')) {
      topicList.push({
        topic: 'createPaymentTopic.reply',
        numPartitions: 10,
        replicationFactor: 1,
      });
    }

    if (topicList.length) {
      await this.admin.createTopics({
        topics: topicList,
      });
    }
  }


  @Post()
  @UseInterceptors(TenantAwareInterceptor)
  async createPayment(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.createPayment(createPaymentDto);
  }

}