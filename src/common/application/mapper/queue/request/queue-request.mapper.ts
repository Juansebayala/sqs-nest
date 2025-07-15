import { SendMessageRequest } from '@aws-sdk/client-sqs';
import { v4 as uuidv4 } from 'uuid';

import { Queue } from '@/common/domain/queue/queue.domain';
import { ConfigService } from '@nestjs/config';

export class QueueRequestMapper {
  constructor(private configService: ConfigService) {}

  fromQueueToSendMessageRequest(queue: Queue): SendMessageRequest {
    const { name, message, attributes } = queue;

    let messageAttributes = {};

    if (attributes) {
      messageAttributes = attributes.reduce(
        (acc, property) => ({
          ...acc,
          [property.name]: {
            DataType: property.type,
            StringValue: property.value,
          },
        }),
        {
          ['name']: {
            DataType: 'String',
            StringValue: name,
          },
        },
      );
    }

    return {
      QueueUrl: this.configService.get('queue.endpoint'),
      MessageBody: message,
      MessageAttributes: messageAttributes,
      MessageGroupId: name,
      MessageDeduplicationId: uuidv4(),
    };
  }
}
