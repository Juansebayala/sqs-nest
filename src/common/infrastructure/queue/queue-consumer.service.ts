import {
  DeleteMessageBatchCommand,
  DeleteMessageCommand,
  Message,
  ReceiveMessageCommand,
  ReceiveMessageResult,
} from '@aws-sdk/client-sqs';
import { Inject, Logger } from '@nestjs/common';

import { IQueueConsumerService } from '@/common/application/repository/queue/queue-consumer.interface';
import {
  IQueueClientService,
  QUEUE_CLIENT_SERVICE,
} from '@/common/application/repository/queue/queue-client.interface';
import { QueueResponseMapper } from '@/common/application/mapper/queue/response/queue-response.mapper';
import { Queue } from '@/common/domain/queue/queue.domain';
import { ConfigService } from '@nestjs/config';

export class QueueConsumerService implements IQueueConsumerService {
  private readonly logger = new Logger(QueueConsumerService.name);

  constructor(
    private readonly configService: ConfigService,
    @Inject(QUEUE_CLIENT_SERVICE)
    private readonly queueClientService: IQueueClientService,
    private readonly queueResponseMapper: QueueResponseMapper,
  ) {}

  private async receiveMessages(): Promise<ReceiveMessageResult> {
    const client = this.queueClientService.getClient();

    try {
      return await client.send(
        new ReceiveMessageCommand({
          QueueUrl: this.configService.get<string>('queue.endpoint'),
          MessageAttributeNames: ['All'],
          MaxNumberOfMessages: 10,
        }),
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async deleteMessages(messages: Message[]): Promise<void> {
    const client = this.queueClientService.getClient();

    try {
      if (messages.length === 1) {
        await client.send(
          new DeleteMessageCommand({
            QueueUrl: this.configService.get<string>('queue.endpoint'),
            ReceiptHandle: messages[0].ReceiptHandle,
          }),
        );
      } else {
        await client.send(
          new DeleteMessageBatchCommand({
            QueueUrl: this.configService.get<string>('queue.endpoint'),
            Entries: messages.map((message) => ({
              Id: message.MessageId,
              ReceiptHandle: message.ReceiptHandle,
            })),
          }),
        );
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async consume(
    callbackMessage: (queue: Queue) => Promise<void>,
  ): Promise<void> {
    const { Messages } = await this.receiveMessages();

    if (!Messages) {
      return;
    }

    const messages = Messages.map(this.queueResponseMapper.fromMessageToQueue);

    for (const message of messages) {
      await callbackMessage(message);
    }

    await this.deleteMessages(Messages);

    if (Messages.length === 10) {
      await this.consume(callbackMessage);
    }
  }
}
