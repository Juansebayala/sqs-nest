import { Queue } from '@/common/domain/queue/queue.domain';

export const QUEUE_CONSUMER_SERVICE = 'QUEUE_CONSUMER_SERVICE';

export interface IQueueConsumerService {
  consume(callbackMessage: (queue: Queue) => Promise<void>): Promise<void>;
}
