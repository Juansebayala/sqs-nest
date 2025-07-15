import * as Joi from 'joi';

export const configurationSchema = Joi.object({
  PORT: Joi.number().required(),
  QUEUE_ENDPOINT: Joi.string().required(),
  QUEUE_REGION: Joi.string().required(),
  QUEUE_ACCESS_KEY: Joi.string().required(),
  QUEUE_SECRET_KEY: Joi.string().required(),
});
