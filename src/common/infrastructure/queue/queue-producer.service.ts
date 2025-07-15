import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { Inject, Injectable } from '@nestjs/common';

import { QueueRequestMapper } from '@/common/application/mapper/queue/request/queue-request.mapper';
import { Queue } from '@/common/domain/queue/queue.domain';
import {
  IQueueClientService,
  QUEUE_CLIENT_SERVICE,
} from '@/common/application/repository/queue/queue-client.interface';
import { IQueueProducerService } from '@/common/application/repository/queue/queue-producer.interface';

@Injectable()
export class QueueProducerService implements IQueueProducerService {
  constructor(
    @Inject(QUEUE_CLIENT_SERVICE)
    private readonly queueClientService: IQueueClientService,
    private readonly queueRequestMapper: QueueRequestMapper,
  ) {}

  async sendMessage(queue: Queue): Promise<void> {
    const client = this.queueClientService.getClient();

    const messageData =
      this.queueRequestMapper.fromQueueToSendMessageRequest(queue);

    const command = new SendMessageCommand(messageData);

    await client.send(command);
  }
}
