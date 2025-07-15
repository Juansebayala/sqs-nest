import { IQueueClientService } from '@/common/application/repository/queue/queue-client.interface';
import { SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QueueClientService implements IQueueClientService {
  private client: SQSClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new SQSClient({
      endpoint: this.configService.get<string>('queue.endpoint')!,
      region: this.configService.get<string>('queue.region')!,
      credentials: {
        accessKeyId: this.configService.get<string>('queue.accessKey')!,
        secretAccessKey: this.configService.get<string>('queue.secretKey')!,
      },
    });
  }

  getClient() {
    return this.client;
  }
}
