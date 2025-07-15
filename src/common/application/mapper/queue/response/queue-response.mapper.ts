import { Message } from '@aws-sdk/client-sqs';

import { Queue } from '@/common/domain/queue/queue.domain';

export class QueueResponseMapper {
  fromMessageToQueue(message: Message): Queue {
    const { Body, MessageAttributes } = message;

    return {
      message: Body || '',
      name: MessageAttributes?.['name'].StringValue || '',
      attributes: MessageAttributes
        ? Object.keys(MessageAttributes).reduce((acc, key) => {
            if (key === 'name') {
              return acc;
            }

            return [
              ...acc,
              {
                name: key,
                type: MessageAttributes[key].DataType || '',
                value: MessageAttributes[key].StringValue || '',
              },
            ];
          }, [])
        : [],
    };
  }
}
