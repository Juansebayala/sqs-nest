export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  queue: {
    endpoint: process.env.QUEUE_ENDPOINT,
    region: process.env.QUEUE_REGION,
    accessKey: process.env.QUEUE_ACCESS_KEY,
    secretKey: process.env.QUEUE_SECRET_KEY,
  },
});
