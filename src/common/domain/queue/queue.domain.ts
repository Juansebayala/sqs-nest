export class Queue {
  name: string;
  message: string;
  attributes?: IQueueAttributes[];

  constructor(name: string, message: string, attributes?: IQueueAttributes[]) {
    Object.assign(this, { name, message, attributes });
  }
}

interface IQueueAttributes {
  name: string;
  value: string;
  type: string;
}
