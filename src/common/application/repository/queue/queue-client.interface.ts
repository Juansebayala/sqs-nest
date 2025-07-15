import { SQSClient } from '@aws-sdk/client-sqs';

export const QUEUE_CLIENT_SERVICE = 'QUEUE_CLIENT_SERVICE';

export interface IQueueClientService {
  getClient(): SQSClient;
}
