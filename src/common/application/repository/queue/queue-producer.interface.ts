import { Queue } from '@/common/domain/queue/queue.domain';

export const QUEUE_PRODUCER_SERVICE = 'QUEUE_PRODUCER_SERVICE';

export interface IQueueProducerService {
  sendMessage(queue: Queue): Promise<void>;
}
