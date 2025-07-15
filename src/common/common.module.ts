import { Module } from '@nestjs/common';
import { QueueRequestMapper } from './application/mapper/queue/request/queue-request.mapper';
import { QueueResponseMapper } from './application/mapper/queue/response/queue-response.mapper';
import { QUEUE_CLIENT_SERVICE } from './application/repository/queue/queue-client.interface';
import { QueueClientService } from './infrastructure/queue/queue-client.service';
import { QUEUE_PRODUCER_SERVICE } from './application/repository/queue/queue-producer.interface';
import { QueueProducerService } from './infrastructure/queue/queue-producer.service';
import { QUEUE_CONSUMER_SERVICE } from './application/repository/queue/queue-consumer.interface';
import { QueueConsumerService } from './infrastructure/queue/queue-consumer.service';

@Module({
  providers: [
    QueueRequestMapper,
    QueueResponseMapper,
    {
      provide: QUEUE_CLIENT_SERVICE,
      useClass: QueueClientService,
    },
    {
      provide: QUEUE_PRODUCER_SERVICE,
      useClass: QueueProducerService,
    },
    {
      provide: QUEUE_CONSUMER_SERVICE,
      useClass: QueueConsumerService,
    },
  ],
  exports: [
    QueueRequestMapper,
    QueueResponseMapper,
    {
      provide: QUEUE_CLIENT_SERVICE,
      useClass: QueueClientService,
    },
    {
      provide: QUEUE_PRODUCER_SERVICE,
      useClass: QueueProducerService,
    },
    {
      provide: QUEUE_CONSUMER_SERVICE,
      useClass: QueueConsumerService,
    },
  ],
})
export class CommonModule {}
